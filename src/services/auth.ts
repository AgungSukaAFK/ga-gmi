import { auth, googleAuthProvider, UserCollection } from "@/lib/firebase";
import { generateAvatarUrl } from "@/lib/utils";
import type { UserComplete, UserDb } from "@/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  addDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "sonner";

interface Register {
  email: string;
  nama: string;
  password: string;
}

interface SignIn {
  email: string;
  password: string;
}

export async function signIn(dto: SignIn): Promise<boolean> {
  const { email, password } = dto;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const q = query(UserCollection, where("email", "==", user.email));
    const userDoc = await getDocs(q);
    if (userDoc.empty) {
      throw new Error("User not found");
    }
    return true;
  } catch (error: any) {
    let errorMessage = "Gagal melakukan sign in.";
    if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/invalid-credential"
    ) {
      errorMessage = "Email atau password salah.";
    } else if (error.code === "auth/user-not-found") {
      errorMessage = "Email belum terdaftar.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Format email tidak valid.";
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Terlalu banyak percobaan login. Coba lagi nanti.";
    }

    throw new Error(errorMessage || error.message);
  }
}

export async function signInWithGoogle(): Promise<boolean> {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;

    if (!user.email) {
      throw new Error("Email pengguna tidak ditemukan dari Google Sign-in.");
    }

    const q = query(UserCollection, where("email", "==", user.email));
    const userDocSnap = await getDocs(q);

    if (!userDocSnap.empty) {
      return true;
    }

    const userData: Omit<UserDb, "id"> = {
      email: user.email,
      nama: user.displayName || "Anonymous",
      role: "unassigned",
      lokasi: "unassigned",
      email_verified: user.emailVerified || false,
      auth_provider: "google",
      image_url:
        user.photoURL || generateAvatarUrl(user.displayName || user.email),
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      department: "unassigned",
    };

    await addDoc(UserCollection, userData);

    return true;
  } catch (error: any) {
    let errorMessage = "Gagal melakukan sign in dengan Google.";
    if (error.code === "auth/popup-closed-by-user") {
      errorMessage = "Proses sign in dibatalkan oleh pengguna.";
    } else if (error.code === "auth/cancelled-popup-request") {
      errorMessage =
        "Permintaan popup dibatalkan (mungkin sudah ada popup lain terbuka).";
    } else if (error.code === "auth/operation-not-allowed") {
      errorMessage =
        "Login dengan Google belum diaktifkan di Firebase Console Anda.";
    }
    console.error("Error signing in with Google:", error);
    throw new Error(errorMessage || error.message);
  }
}

export async function registerUser(dto: Register) {
  const { email, nama, password } = dto;
  if (!email || !nama || !password) {
    throw new Error("All fields are required");
  }

  const q = query(UserCollection, where("email", "==", email));
  const userDoc = await getDocs(q);
  if (!userDoc.empty) {
    throw new Error("Email sudah terdaftar");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userData: Omit<UserDb, "id"> = {
      email,
      nama,
      role: "unassigned",
      lokasi: "unassigned",
      email_verified: user.emailVerified,
      auth_provider: "credential",
      image_url: user.photoURL || generateAvatarUrl(nama),
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      department: "unassigned",
    };

    await addDoc(UserCollection, userData);

    await sendEmailVerification(user);
    toast.info(
      `Email verifikasi telah dikirim ke ${email}. Silakan periksa inbox Anda.`
    );
  } catch (error: any) {
    let errorMessage = "Terjadi kesalahan saat pendaftaran.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Email ini sudah digunakan oleh akun lain.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Format email tidak valid.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password terlalu lemah (minimal 6 karakter).";
    }
    console.error("Error registering user:", error);
    throw new Error(errorMessage);
  }
}

export async function getCurrentUser(): Promise<UserComplete | null> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        resolve(null);
        return;
      }

      if (!user.emailVerified) {
        window.location.href = "/verify-email";
        resolve(null);
        return;
      }

      try {
        const q = query(UserCollection, where("email", "==", user.email));
        const userDoc = await getDocs(q);

        if (userDoc.empty) {
          resolve(null);
          return;
        }

        const completedUser = userDoc.docs[0].data() as UserDb;

        if (user.emailVerified && completedUser.email_verified === false) {
          const userDocRef = userDoc.docs[0].ref;
          await updateDoc(userDocRef, {
            email_verified: true,
            updated_at: serverTimestamp(),
          });
          completedUser.email_verified = true;
        }

        if (
          completedUser.role === "unassigned" ||
          completedUser.lokasi === "unassigned"
        ) {
          if (window.location.pathname !== "/unassigned") {
            window.location.href = "/unassigned";
          }
        }

        resolve({
          ...completedUser,
          ...user,
        });
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
        resolve(null);
      }
    });
  });
}

export async function logout() {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Logout failed");
  }
}

export async function resendVerificationEmail() {
  const user = auth.currentUser;
  if (user) {
    await sendEmailVerification(user);
    return true;
  }
  throw new Error("Tidak ada pengguna yang login.");
}

export async function checkEmailVerificationStatus() {
  const user = auth.currentUser;
  if (user) {
    await reload(user);
    return user.emailVerified;
  }
  return false;
}

export async function resetPasswordByEmail(email: string) {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error: any) {
    let errorMessage = "Gagal mengirim email reset password.";
    if (error.code === "auth/user-not-found") {
      errorMessage = "Email tidak terdaftar.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Format email tidak valid.";
    }
    console.error("Error sending reset password email:", error);
    throw new Error(errorMessage || error.message);
  }
}
