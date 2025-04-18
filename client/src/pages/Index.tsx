
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Upload, History, ClipboardList, Gauge } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { QuerySearch } from "@/components/search/QuerySearch";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { RecentDashboard } from "@/components/dashboard/RecentDashboard";
import { QuickAction, QuickActions } from "@/components/dashboard/QuickActions";

// Sample data
const recentDashboards = [
  {
    id: "1",
    title: "Revenue Overview",
    description: "Monthly revenue trends by product category and region",
    lastViewed: new Date(2023, 3, 15),
  },
  {
    id: "2",
    title: "Customer Insights",
    description: "Customer retention, acquisition, and behavior analysis",
    lastViewed: new Date(2023, 3, 10),
  },
  {
    id: "3",
    title: "Product Performance",
    description: "Sales, margins, and inventory metrics by product",
    lastViewed: new Date(2023, 3, 5),
  },
  {
    id: "4",
    title: "Marketing ROI",
    description: "Campaign performance and marketing spend analysis",
    lastViewed: new Date(2023, 2, 28),
  },
  {
    id: "5",
    title: "Sales Pipeline",
    description: "Opportunity tracking and sales forecast",
    lastViewed: new Date(2023, 2, 20),
  },
  {
    id: "6",
    title: "Operational Metrics",
    description: "Efficiency, costs, and process performance indicators",
    lastViewed: new Date(2023, 2, 15),
  }
];

const recentQueries = [
  "Show me monthly revenue trends for Q1",
  "Compare customer acquisition costs across marketing channels",
  "What are our top performing products by region?",
  "Show me customer retention rates by segment"
];

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/query-results?q=${encodeURIComponent(query)}`);
  };
  
  const handleCreateDashboard = () => {
    navigate("/dashboard-builder");
  };
  
  const handleImportData = () => {
    navigate("/data-sources");
  };
  
  const handleRecentQueries = () => {
    // Show a modal or dropdown with recent queries
    console.log("Show recent queries");
  };

  return (
    <DashboardLayout>
      <div className="container py-6 max-w-7xl">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-start">Dashboard</h1>
          <span className="w-3 h-3 rounded-full bg-green-500 ml-2 animate-pulse" title="Connected"></span>
        </div>
        
        <p className="mt-2 text-muted-foreground">
          Get insights from your data with natural language.
        </p>
        
        <div className="mt-8 max-w-4xl mx-auto">
          <QuerySearch onSearch={handleSearch} />
        </div>
        
        <div className="mt-8">
          <QuickActions>
            <QuickAction
              icon={<PlusCircle className="h-4 w-4" />}
              label="Create Dashboard"
              onClick={handleCreateDashboard}
              variant="default"
            />
            <QuickAction
              icon={<Upload className="h-4 w-4" />}
              label="Import Data"
              onClick={handleImportData}
            />
            <QuickAction
              icon={<History className="h-4 w-4" />}
              label="Recent Queries"
              onClick={handleRecentQueries}
            />
          </QuickActions>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-start">Recent Dashboards</h2>
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              <span>All Dashboards</span>
            </button>
          </div>
          
          <DashboardGrid className="mt-4">
            {recentDashboards.map((dashboard) => (
              <RecentDashboard
                key={dashboard.id}
                id={dashboard.id}
                title={dashboard.title}
                description={dashboard.description}
                lastViewed={dashboard.lastViewed}
              />
            ))}
          </DashboardGrid>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-start">Recent Queries</h2>
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              <ClipboardList className="h-4 w-4" />
              <span>View All</span>
            </button>
          </div>
          
          <div className="mt-4 grid gap-2">
            {recentQueries.map((query, index) => (
              <button
                key={index}
                className="flex items-center gap-2 p-3 rounded-lg border bg-background hover:bg-muted/50 text-start transition-colors"
                onClick={() => handleSearch(query)}
              >
                <History className="h-4 w-4 text-muted-foreground" />
                <span>{query}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
