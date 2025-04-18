
import { useState } from "react";
import { Plus, Database, Table, FileSpreadsheet, Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataSourceCard } from "@/components/datasources/DataSourceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data sources
const sampleDataSources = [
  {
    id: "1",
    name: "Marketing Data",
    type: "PostgreSQL Database",
    status: "connected" as const,
    lastSync: new Date(2023, 3, 15),
    recordCount: 1250000,
  },
  {
    id: "2",
    name: "Sales Analytics",
    type: "MySQL Database",
    status: "connected" as const,
    lastSync: new Date(2023, 3, 10),
    recordCount: 850000,
  },
  {
    id: "3",
    name: "Customer Data",
    type: "CSV Import",
    status: "error" as const,
    lastSync: new Date(2023, 3, 5),
    recordCount: 45000,
  },
  {
    id: "4",
    name: "Product Inventory",
    type: "Excel Spreadsheet",
    status: "disconnected" as const,
    lastSync: new Date(2023, 2, 20),
    recordCount: 25000,
  },
  {
    id: "5",
    name: "Google Analytics",
    type: "API Connection",
    status: "connected" as const,
    lastSync: new Date(2023, 3, 15),
    recordCount: 2345000,
  },
];

export default function DataSources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const filteredSources = sampleDataSources.filter(source => 
    source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleConnectSource = () => {
    setIsAddDialogOpen(false);
    // In a real app, this would connect to the data source
  };

  return (
    <DashboardLayout>
      <div className="container py-6 max-w-7xl animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Data Sources</h1>
            <p className="text-muted-foreground mt-1">
              Connect, manage, and explore your data sources
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Data Source</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Connect a New Data Source</DialogTitle>
                <DialogDescription>
                  Select the type of data source you want to connect.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="database">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="database">Database</TabsTrigger>
                  <TabsTrigger value="file">File Upload</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                </TabsList>
                
                <TabsContent value="database" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 gap-4">
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 aspect-square">
                        <Database className="h-8 w-8 text-primary" />
                        <span className="text-xs">PostgreSQL</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 aspect-square">
                        <Database className="h-8 w-8 text-blue-500" />
                        <span className="text-xs">MySQL</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 aspect-square">
                        <Database className="h-8 w-8 text-orange-500" />
                        <span className="text-xs">MongoDB</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 aspect-square">
                        <Database className="h-8 w-8 text-red-500" />
                        <span className="text-xs">Redis</span>
                      </Button>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="connection" className="text-sm font-medium">
                        Connection String
                      </label>
                      <Input 
                        id="connection" 
                        placeholder="postgres://username:password@localhost:5432/database" 
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="file" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 gap-4">
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 aspect-square">
                        <Table className="h-8 w-8 text-green-500" />
                        <span className="text-xs">CSV</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 aspect-square">
                        <FileSpreadsheet className="h-8 w-8 text-green-700" />
                        <span className="text-xs">Excel</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 aspect-square">
                        <Table className="h-8 w-8 text-blue-700" />
                        <span className="text-xs">JSON</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 aspect-square">
                        <Table className="h-8 w-8 text-purple-600" />
                        <span className="text-xs">XML</span>
                      </Button>
                    </div>
                    
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">
                        Upload File
                      </label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Plus className="h-6 w-6 text-primary" />
                          </div>
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground">
                            CSV, Excel, JSON files (max. 100MB)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="api" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="api-url" className="text-sm font-medium">
                          API Endpoint URL
                        </label>
                        <Input 
                          id="api-url" 
                          placeholder="https://api.example.com/v1/data" 
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="auth-type" className="text-sm font-medium">
                          Authentication Type
                        </label>
                        <select 
                          id="auth-type" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option>API Key</option>
                          <option>OAuth 2.0</option>
                          <option>Bearer Token</option>
                          <option>Basic Auth</option>
                          <option>No Auth</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="api-key" className="text-sm font-medium">
                        API Key / Token
                      </label>
                      <Input 
                        id="api-key" 
                        placeholder="Enter your API key or token" 
                        type="password"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="headers" className="text-sm font-medium">
                        Request Headers (Optional)
                      </label>
                      <Input 
                        id="headers" 
                        placeholder='{"Content-Type": "application/json"}' 
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConnectSource}>
                  Connect
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mt-6 flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search data sources..."
              className="pl-9"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSources.map((source) => (
            <DataSourceCard
              key={source.id}
              name={source.name}
              type={source.type}
              status={source.status}
              lastSync={source.lastSync}
              recordCount={source.recordCount}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
