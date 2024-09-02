import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Portfolio, PieData, PnlData, BarChartData } from '@/types/interface';
import { processPieData, processBarChartData, calculatePnl } from '@/utils/portfolioUtils';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

interface PortfolioPieChartProps {
  portfolioData: Portfolio[];
}

export function PortfolioPieChart({ portfolioData }: PortfolioPieChartProps) {
  const { pieData, totalValue } = processPieData(portfolioData, 'month');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry: PieData, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  );
}

interface PortfolioBarChartProps {
  portfolioData: Portfolio[];
}

export function PortfolioBarChart({ portfolioData }: PortfolioBarChartProps) {
  const barChartData = processBarChartData(portfolioData, 'month');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Transaction Volume by Cryptocurrency</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart width={600} height={300} data={barChartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(barChartData[0] || {}).filter(key => key !== 'month').map((cryptoName, index) => (
            <Bar key={cryptoName} dataKey={`${cryptoName}.amount`} fill={COLORS[index % COLORS.length]} />
          ))}
        </BarChart>
      </CardContent>
    </Card>
  );
}

interface PnlBarChartProps {
  portfolioData: Portfolio[];
  prices: Record<string, number>; // e.g., { bitcoin: 50000, ethereum: 3000 }
}

export function PnlBarChart({ portfolioData, prices }: PnlBarChartProps) {
  const pnlData = calculatePnl(portfolioData, 'month');

  return (
    <Card>
      <CardHeader>
        <CardTitle>PnL by Month</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart width={600} height={300} data={pnlData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pnl" fill="#82ca9d">
            {pnlData.map((item: PnlData, index: number) => (
              <Cell key={`cell-${index}`} fill={item.pnl > 0 ? "green" : "red"} />
            ))}
          </Bar>
        </BarChart>
      </CardContent>
    </Card>
  );
}
