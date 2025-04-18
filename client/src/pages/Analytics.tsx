
import { useNavigate } from "react-router-dom";
import { BarChart3, PieChart, LineChart } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ChartPreview } from "@/components/visualizations/ChartPreview";
import { Button } from "@/components/ui/button";

export default function Analytics() {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout>
      <div className="container py-6 max-w-7xl animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              View and analyze your key business metrics
            </p>
          </div>
          
          <Button 
            onClick={() => navigate("/query-results")}
            className="flex items-center gap-2"
          >
            <span>New Analysis</span>
          </Button>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard 
            title="Revenue by Month" 
            chartType="bar"
            isInteractive
            onClick={() => navigate("/query-results?q=revenue+by+month")}
          >
            <ChartPreview type="bar" height={200} />
          </DashboardCard>
          
          <DashboardCard 
            title="Customer Segments" 
            chartType="pie"
            isInteractive
            onClick={() => navigate("/query-results?q=customer+segments")}
          >
            <ChartPreview type="pie" height={200} />
          </DashboardCard>
          
          <DashboardCard 
            title="Marketing ROI" 
            chartType="line"
            isInteractive
            onClick={() => navigate("/query-results?q=marketing+roi")}
          >
            <ChartPreview type="line" height={200} />
          </DashboardCard>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Trending Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
                  <p className="text-2xl font-bold mt-1">$124,500</p>
                </div>
                <div className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded flex items-center">
                  +12.5%
                </div>
              </div>
              <div className="mt-4 h-12">
                <LineChart className="h-full w-full text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">New Customers</h3>
                  <p className="text-2xl font-bold mt-1">1,245</p>
                </div>
                <div className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded flex items-center">
                  +8.3%
                </div>
              </div>
              <div className="mt-4 h-12">
                <LineChart className="h-full w-full text-brand-blue" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Avg Order Value</h3>
                  <p className="text-2xl font-bold mt-1">$89.50</p>
                </div>
                <div className="bg-red-50 text-red-700 text-xs font-medium px-2 py-1 rounded flex items-center">
                  -2.1%
                </div>
              </div>
              <div className="mt-4 h-12">
                <LineChart className="h-full w-full text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
