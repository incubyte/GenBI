
import { useState } from "react";
import { Sparkles, BarChart3, LineChart, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  BarChart,
  LineChart as RechartLine,
  PieChart as RechartPie,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";

// Sample data
const sampleData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const pieData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
];

const COLORS = ['#2D7FF9', '#33C3F0', '#85B8FF', '#A5E9FF', '#1D5BB1'];

export type ChartType = 'bar' | 'line' | 'pie';

interface ChartPreviewProps {
  type?: ChartType;
  data?: any[];
  title?: string;
  className?: string;
  height?: number;
}

export function ChartPreview({
  type = 'bar',
  data = sampleData,
  title,
  className,
  height = 300,
}: ChartPreviewProps) {
  const [chartType, setChartType] = useState<ChartType>(type);
  
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #eaeaea',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }} 
              />
              <Legend />
              <Bar dataKey="value" fill="#2D7FF9" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RechartLine data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #eaeaea',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#2D7FF9" strokeWidth={2} dot={{ strokeWidth: 2 }} />
            </RechartLine>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RechartPie data={pieData}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #eaeaea',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
            </RechartPie>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex mb-4 gap-2">
          <Button 
            size="sm" 
            variant={chartType === 'bar' ? 'default' : 'outline'} 
            onClick={() => setChartType('bar')}
            className="flex items-center gap-1.5"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Bar</span>
          </Button>
          <Button 
            size="sm" 
            variant={chartType === 'line' ? 'default' : 'outline'} 
            onClick={() => setChartType('line')}
            className="flex items-center gap-1.5"
          >
            <LineChart className="h-4 w-4" />
            <span>Line</span>
          </Button>
          <Button 
            size="sm" 
            variant={chartType === 'pie' ? 'default' : 'outline'} 
            onClick={() => setChartType('pie')}
            className="flex items-center gap-1.5"
          >
            <PieChart className="h-4 w-4" />
            <span>Pie</span>
          </Button>
          
          <div className="ml-auto">
            <Button size="sm" variant="ghost" className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>Optimize</span>
            </Button>
          </div>
        </div>
        
        {renderChart()}
      </div>
    </div>
  );
}
