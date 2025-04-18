
import { useState } from "react";
import { Plus, Database, Table, FileSpreadsheet, Search, Loader2 } from "lucide-react";
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
import { useDataSources, useCreateDataSource } from "@/hooks/useDataSources";
import { DataSourceType } from "@/services/dataSourcesService";
import { toast } from "@/components/ui/sonner";

// We'll use the API instead of sample data

export default function DataSources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // Step 1: Fetch data sources using our hook
  const { data, isLoading, isError } = useDataSources(searchQuery, page, pageSize);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  // Step 2: Set up form state for adding a new data source
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    type: DataSourceType.POSTGRESQL,
    connectionDetails: {},
    selectedTab: "database"
  });

  // Step 3: Set up mutations for creating a data source and testing connection
  const createDataSource = useCreateDataSource();
  // We'll use this later for testing connections
  // const testConnection = useTestConnection();

  const handleConnectSource = () => {
    // Validate form
    if (!formState.name.trim()) {
      toast.error("Please enter a name for the data source");
      return;
    }

    // Prepare connection details based on the selected tab
    let connectionDetails = {};
    let type = formState.type;

    if (formState.selectedTab === "database") {
      // For database tab
      const connectionString = (document.getElementById("connection") as HTMLInputElement)?.value;
      if (!connectionString) {
        toast.error("Please enter a connection string");
        return;
      }
      connectionDetails = { connectionString };
    } else if (formState.selectedTab === "api") {
      // For API tab
      const url = (document.getElementById("api-url") as HTMLInputElement)?.value;
      const authType = (document.getElementById("auth-type") as HTMLSelectElement)?.value;
      const apiKey = (document.getElementById("api-key") as HTMLInputElement)?.value;
      const headers = (document.getElementById("headers") as HTMLInputElement)?.value;

      if (!url) {
        toast.error("Please enter an API URL");
        return;
      }

      connectionDetails = {
        url,
        authType,
        apiKey,
        headers: headers ? JSON.parse(headers) : undefined
      };
      type = DataSourceType.API;
    }
    // Note: File upload will be handled separately

    // Create the data source
    createDataSource.mutate({
      name: formState.name,
      description: formState.description,
      type,
      connectionDetails
    }, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
        // Reset form
        setFormState({
          name: "",
          description: "",
          type: DataSourceType.POSTGRESQL,
          connectionDetails: {},
          selectedTab: "database"
        });
      }
    });
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

              <Tabs
                defaultValue="database"
                value={formState.selectedTab}
                onValueChange={(value) => setFormState({...formState, selectedTab: value})}
              >
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="database">Database</TabsTrigger>
                  <TabsTrigger value="file">File Upload</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                </TabsList>

                <TabsContent value="database" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 gap-4">
                      <Button
                        variant="outline"
                        className={`h-20 flex flex-col items-center justify-center gap-2 aspect-square ${formState.type === DataSourceType.POSTGRESQL ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setFormState({...formState, type: DataSourceType.POSTGRESQL})}
                        type="button"
                      >
                        <Database className="h-8 w-8 text-primary" />
                        <span className="text-xs">PostgreSQL</span>
                      </Button>

                      <Button
                        variant="outline"
                        className={`h-20 flex flex-col items-center justify-center gap-2 aspect-square ${formState.type === DataSourceType.MYSQL ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setFormState({...formState, type: DataSourceType.MYSQL})}
                        type="button"
                      >
                        <Database className="h-8 w-8 text-blue-500" />
                        <span className="text-xs">MySQL</span>
                      </Button>

                      <Button
                        variant="outline"
                        className={`h-20 flex flex-col items-center justify-center gap-2 aspect-square ${formState.type === DataSourceType.MONGODB ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setFormState({...formState, type: DataSourceType.MONGODB})}
                        type="button"
                      >
                        <Database className="h-8 w-8 text-orange-500" />
                        <span className="text-xs">MongoDB</span>
                      </Button>

                      <Button
                        variant="outline"
                        className={`h-20 flex flex-col items-center justify-center gap-2 aspect-square ${formState.type === DataSourceType.SQLITE ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setFormState({...formState, type: DataSourceType.SQLITE})}
                        type="button"
                      >
                        <Database className="h-8 w-8 text-red-500" />
                        <span className="text-xs">SQLite</span>
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Data Source Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Marketing Database"
                          value={formState.name}
                          onChange={(e) => setFormState({...formState, name: e.target.value})}
                        />
                      </div>

                      <div className="grid gap-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Description (Optional)
                        </label>
                        <Input
                          id="description"
                          placeholder="Database containing marketing data"
                          value={formState.description}
                          onChange={(e) => setFormState({...formState, description: e.target.value})}
                        />
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
                      <label htmlFor="file-upload" className="text-sm font-medium">
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
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept=".csv,.xlsx,.xls,.json"
                          />
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
                <Button
                  onClick={handleConnectSource}
                  disabled={createDataSource.isPending}
                >
                  {createDataSource.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Connect"
                  )}
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

        {/* Render data sources based on loading state */}
        {(() => {
          if (isLoading) {
            return (
              <div className="mt-8 flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading data sources...</span>
              </div>
            );
          }

          if (isError) {
            return (
              <div className="mt-8 text-center py-12 text-red-500">
                <p>Error loading data sources. Please try again.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            );
          }

          if (!data?.items?.length) {
            return (
              <div className="mt-8 text-center py-12 text-muted-foreground">
                <p>No data sources found. Add your first data source to get started.</p>
              </div>
            );
          }

          return (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.items.map((source) => (
                <DataSourceCard
                  key={source.id}
                  name={source.name}
                  type={source.type}
                  status={source.status}
                  lastSync={source.lastSync ? new Date(source.lastSync) : undefined}
                  recordCount={source.recordCount}
                  onClick={() => {}}
                />
              ))}
            </div>
          );
        })()}
      </div>
    </DashboardLayout>
  );
}
