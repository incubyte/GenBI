
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share2, Save, PanelLeft, Wand2, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { QuerySearch } from "@/components/search/QuerySearch";
import { ChartPreview } from "@/components/visualizations/ChartPreview";
import { InsightSummary } from "@/components/insights/InsightSummary";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sampleInsights: {
  title: string;
  description: string;
  type?: "positive" | "negative" | "neutral" | "info";
}[] = [
  {
    title: "Highest Revenue Month",
    description: "March had the highest revenue at $4,000, which is 30% higher than the average.",
    type: "positive"
  },
  {
    title: "Declining Trend in Q1",
    description: "Revenue showed a consistent decline from January to March, decreasing 25% overall.",
    type: "negative"
  },
  {
    title: "Product Category Comparison",
    description: "Electronics consistently outperforms other categories, representing 45% of total revenue.",
    type: "neutral"
  },
  {
    title: "Seasonal Pattern Detected",
    description: "There's a clear seasonal pattern with peaks in March and September.",
    type: "info"
  }
];

export default function QueryResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setQuery(queryParam);
      // In a real app, this would trigger the API call to process the query
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [location.search]);
  
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    navigate(`/query-results?q=${encodeURIComponent(newQuery)}`);
    
    // Simulate loading state
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleSave = () => {
    navigate("/dashboard-builder");
  };

  return (
    <DashboardLayout>
      <div className="container py-6 max-w-7xl animate-fade-in">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleGoBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Query Results</h1>
        </div>
        
        <div className="mt-6">
          <QuerySearch 
            onSearch={handleSearch} 
            placeholder="Refine your query..." 
            className="max-w-4xl mx-auto"
          />
        </div>
        
        {isLoading ? (
          <div className="mt-12 flex flex-col items-center justify-center">
            <div className="relative w-16 h-16">
              <Sparkles className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <p className="mt-4 text-muted-foreground">Analyzing your data...</p>
          </div>
        ) : (
          <>
            <div className="mt-8 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  Results for: <span className="text-primary">{query}</span>
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Generated 4 visualizations and insights based on your query
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                <Button size="sm" className="flex items-center gap-2" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                  <span>Save to Dashboard</span>
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <Tabs defaultValue="visualization">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="visualization">Visualization</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="sql">SQL</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <PanelLeft className="h-4 w-4" />
                      <span>Show Filters</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4" />
                      <span>Customize</span>
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="visualization" className="mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <ChartPreview 
                        type="bar" 
                        title="Monthly Revenue by Product Category" 
                        height={400}
                      />
                    </div>
                    
                    <div className="lg:col-span-1">
                      <InsightSummary 
                        query={query}
                        insights={sampleInsights}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="data" className="mt-4">
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="text-start p-3">Month</th>
                          <th className="text-start p-3">Electronics</th>
                          <th className="text-start p-3">Apparel</th>
                          <th className="text-start p-3">Home Goods</th>
                          <th className="text-start p-3">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-3">Jan</td>
                          <td className="p-3">$2,500</td>
                          <td className="p-3">$800</td>
                          <td className="p-3">$700</td>
                          <td className="p-3 font-medium">$4,000</td>
                        </tr>
                        <tr className="border-t bg-muted/50">
                          <td className="p-3">Feb</td>
                          <td className="p-3">$1,800</td>
                          <td className="p-3">$600</td>
                          <td className="p-3">$600</td>
                          <td className="p-3 font-medium">$3,000</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">Mar</td>
                          <td className="p-3">$1,200</td>
                          <td className="p-3">$400</td>
                          <td className="p-3">$400</td>
                          <td className="p-3 font-medium">$2,000</td>
                        </tr>
                        <tr className="border-t bg-muted/50">
                          <td className="p-3">Apr</td>
                          <td className="p-3">$1,680</td>
                          <td className="p-3">$540</td>
                          <td className="p-3">$560</td>
                          <td className="p-3 font-medium">$2,780</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">May</td>
                          <td className="p-3">$1,000</td>
                          <td className="p-3">$500</td>
                          <td className="p-3">$390</td>
                          <td className="p-3 font-medium">$1,890</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="sql" className="mt-4">
                  <div className="rounded-lg border p-4 bg-muted font-mono text-sm overflow-x-auto">
                    <pre>{`SELECT
  DATE_TRUNC('month', order_date) AS month,
  SUM(CASE WHEN category = 'Electronics' THEN revenue ELSE 0 END) AS electronics_revenue,
  SUM(CASE WHEN category = 'Apparel' THEN revenue ELSE 0 END) AS apparel_revenue,
  SUM(CASE WHEN category = 'Home Goods' THEN revenue ELSE 0 END) AS home_goods_revenue,
  SUM(revenue) AS total_revenue
FROM
  orders
WHERE
  order_date BETWEEN '2023-01-01' AND '2023-05-31'
GROUP BY
  DATE_TRUNC('month', order_date)
ORDER BY
  month ASC
`}</pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
