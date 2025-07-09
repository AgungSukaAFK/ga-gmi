import { DatePicker } from "@/components/date-picker";
import { Content } from "@/components/layout/Content";
import WithSidebar from "@/components/layout/WithSidebar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function Dashboard() {
  return (
    <WithSidebar>
      {/* Chart MR & PO */}
      <Content
        size="md"
        cardAction={
          <div className="flex items-center gap-4">
            <DatePicker placeholder="Dari tanggal" />
            <DatePicker placeholder="Sampai tanggal" />
          </div>
        }
        cardFooter={
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Statistik pembuatan MR dan PO tahun ini{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                Periode Januari - Juni 2025
              </div>
            </div>
          </div>
        }
      >
        <Chart />
      </Content>

      {/* Chart Department terbanyak yang membuat MR */}
      <Content
        size="md"
        cardAction={
          <div className="flex items-center gap-4">
            <DatePicker placeholder="Dari tanggal" />
            <DatePicker placeholder="Sampai tanggal" />
          </div>
        }
        cardFooter={
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Statistik pembuatan MR berdarkan departemen tahun ini{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                Periode Januari - Juni 2025
              </div>
            </div>
          </div>
        }
      >
        <Chart2 />
      </Content>

      {/* MR Open */}
      <Content
        size="xs"
        title="MR Open"
        description="Jumlah MR open"
        className="bg-gradient-to-t from-black/5 via-black/0 to-black/0 stop"
      >
        <p className="font-bold text-2xl">14</p>
        <CardDescription>Diambil dari tanggal 1 Juni 2025</CardDescription>
      </Content>

      {/* MR Close */}
      <Content
        size="xs"
        title="MR Close"
        description="Jumlah MR closed"
        className="bg-gradient-to-t from-black/5 via-black/0 to-black/0 stop"
      >
        <p className="font-bold text-2xl">16</p>
        <CardDescription>Diambil dari tanggal 1 Juni 2025</CardDescription>
      </Content>

      {/* Po Pending */}
      <Content
        size="xs"
        title="PO Pending"
        description="Jumlah MR closed"
        className="bg-gradient-to-t from-black/5 via-black/0 to-black/0 stop"
      >
        <p className="font-bold text-2xl">16</p>
        <CardDescription>Diambil dari tanggal 1 Juni 2025</CardDescription>
      </Content>

      {/* Po Paid */}
      <Content
        size="xs"
        title="PO Paid"
        description="Jumlah MR closed"
        className="bg-gradient-to-t from-black/5 via-black/0 to-black/0 stop"
      >
        <p className="font-bold text-2xl">16</p>
        <CardDescription>Diambil dari tanggal 1 Juni 2025</CardDescription>
      </Content>

      {/* Total PO */}
      <Content
        size="xs"
        title="Total PO"
        description="Jumlah MR closed"
        className="bg-gradient-to-t from-black/5 via-black/0 to-black/0 stop"
      >
        <p className="font-bold text-2xl">30</p>
        <CardDescription>Diambil dari tanggal 1 Juni 2025</CardDescription>
      </Content>

      {/* Total MR */}
      <Content
        size="xs"
        title="Total MR"
        description="Jumlah MR closed"
        className="bg-gradient-to-t from-black/5 via-black/0 to-black/0 stop"
      >
        <p className="font-bold text-2xl">30</p>
        <CardDescription>Diambil dari tanggal 1 Juni 2025</CardDescription>
      </Content>

      {/* Rata-rata waktu MR sampai terbuat PO dan rata-rata waktu MR open sampai close */}
      <Content
        size="md"
        title="Rata-rata waktu MR sampai PO"
        description="2 Hari, 6 Jam"
        className="bg-gradient-to-t from-black/5 via-black/0 to-black/0 stop"
      >
        <CardTitle>Rata-rata waktu MR Open sampai MR Close</CardTitle>
        <CardDescription>6 Hari, 12 Jam</CardDescription>

        <p className="text-xs text-muted-foreground text-end">
          Nilai diambil berdasarkan 100 data terakhir
        </p>
      </Content>

      {/* Tabel 50 Material Request terbaru */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Kode MR</TableHead>
            <TableHead>PIC</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal dibuat</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </WithSidebar>
  );
}

const Chart = () => {
  const chartData = [
    { bulan: "Januari", "Material Request": 186, "Purchase Order": 80 },
    { bulan: "Februari", "Material Request": 305, "Purchase Order": 200 },
    { bulan: "Maret", "Material Request": 237, "Purchase Order": 120 },
    { bulan: "April", "Material Request": 73, "Purchase Order": 190 },
    { bulan: "Mei", "Material Request": 209, "Purchase Order": 130 },
    { bulan: "Juni", "Material Request": 214, "Purchase Order": 140 },
    { bulan: "Juli", "Material Request": 214, "Purchase Order": 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Material Request",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Purchase Order",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="bulan"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent className="w-40" />}
        />
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="Material Request"
          type="natural"
          fill="url(#fillMobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="Purchase Order"
          type="natural"
          fill="url(#fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

const Chart2 = () => {
  const chartData = [
    { departemen: "HR", "Material Request": 186 },
    { departemen: "GA", "Material Request": 305 },
    { departemen: "IT", "Material Request": 237 },
    { departemen: "Service", "Material Request": 73 },
    { departemen: "Warehouse", "Material Request": 209 },
    { departemen: "Manufaktur", "Material Request": 214 },
    { departemen: "Finance", "Material Request": 214 },
    { departemen: "Marketing", "Material Request": 214 },
    { departemen: "Purchasing", "Material Request": 214 },
    { departemen: "K3", "Material Request": 214 },
  ].sort();

  const chartConfig = {
    "Material Request": {
      label: "Material Request",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="departemen"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent className="w-40" />}
        />
        <Bar dataKey="Material Request" fill="var(--chart-3)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
};
