import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dataSourcesService, {
  CreateDataSourceDto,
  TestConnectionDto,
  DataSourceSchema
} from '@/services/dataSourcesService';
import { toast } from '@/components/ui/sonner';

export const useDataSources = (search?: string, page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['dataSources', search, page, pageSize],
    queryFn: () => dataSourcesService.getAll(search, page, pageSize),
  });
};

export const useDataSource = (id: string) => {
  return useQuery({
    queryKey: ['dataSource', id],
    queryFn: () => dataSourcesService.getById(id),
    enabled: !!id, // Only run the query if we have an ID
  });
};

export const useCreateDataSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dataSource: CreateDataSourceDto) => dataSourcesService.create(dataSource),
    onSuccess: () => {
      // Invalidate the data sources query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['dataSources'] });
      toast.success('Data source created successfully');
    },
    onError: (error: any) => {
      // Error handling is done in the API interceptor, but we can add specific handling here
      console.error('Failed to create data source:', error);
    },
  });
};

export const useUpdateDataSource = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dataSource: Partial<CreateDataSourceDto>) => dataSourcesService.update(id, dataSource),
    onSuccess: (updatedDataSource) => {
      // Update the cache for this specific data source
      queryClient.setQueryData(['dataSource', id], updatedDataSource);
      // Invalidate the data sources list
      queryClient.invalidateQueries({ queryKey: ['dataSources'] });
      toast.success('Data source updated successfully');
    },
  });
};

export const useDeleteDataSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dataSourcesService.delete(id),
    onSuccess: (_, id) => {
      // Remove the data source from the cache
      queryClient.removeQueries({ queryKey: ['dataSource', id] });
      // Invalidate the data sources list
      queryClient.invalidateQueries({ queryKey: ['dataSources'] });
      toast.success('Data source deleted successfully');
    },
  });
};

export const useTestConnection = () => {
  return useMutation({
    mutationFn: (testDto: TestConnectionDto) => dataSourcesService.testConnection(testDto),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || 'Connection successful');
      } else {
        toast.error(result.message || 'Connection failed');
      }
    },
  });
};

export const useSyncDataSource = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fullSync, tables }: { fullSync?: boolean; tables?: string[] }) =>
      dataSourcesService.sync(id, fullSync, tables),
    onSuccess: () => {
      // Invalidate the specific data source to refetch it with updated sync info
      queryClient.invalidateQueries({ queryKey: ['dataSource', id] });
      toast.success('Sync started successfully');
    },
  });
};

export const useExtractSchema = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => dataSourcesService.extractSchema(id),
    onSuccess: () => {
      toast.success('Schema extraction started');
      // We'll poll for the schema after a delay
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['dataSourceSchema', id] });
      }, 3000);
    },
  });
};

export const useDataSourceSchema = (id: string) => {
  return useQuery({
    queryKey: ['dataSourceSchema', id],
    queryFn: () => dataSourcesService.getSchema(id),
    enabled: !!id,
    retry: 3,
    retryDelay: 1000,
    refetchInterval: (data) => {
      // If we have data and it was extracted recently (within the last minute), stop polling
      if (data && data.lastExtracted) {
        const lastExtracted = new Date(data.lastExtracted);
        const now = new Date();
        const diffInSeconds = (now.getTime() - lastExtracted.getTime()) / 1000;
        if (diffInSeconds < 60) {
          return false; // Stop polling
        }
      }
      return 5000; // Poll every 5 seconds
    },
  });
};
