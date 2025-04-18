import { apiCall } from '@/lib/api';

// Types
export enum DataSourceType {
  POSTGRESQL = 'postgresql',
  MYSQL = 'mysql',
  SQLITE = 'sqlite',
  MONGODB = 'mongodb',
  CSV = 'csv',
  EXCEL = 'excel',
  JSON = 'json',
  API = 'api',
}

export enum DataSourceStatus {
  CONNECTED = 'connected',
  CONNECTING = 'connecting',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
}

export enum SyncFrequency {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  NEVER = 'never',
}

export interface SyncSchedule {
  frequency: SyncFrequency;
  time?: string;
  timezone?: string;
}

export interface DataSource {
  id: string;
  name: string;
  description?: string;
  type: DataSourceType;
  status: DataSourceStatus;
  connectionDetails: Record<string, any>;
  lastSync?: Date;
  recordCount?: number;
  error?: string;
  syncSchedule?: SyncSchedule;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDataSourceDto {
  name: string;
  description?: string;
  type: DataSourceType;
  connectionDetails: Record<string, any>;
  syncSchedule?: SyncSchedule;
  fileId?: string;
}

export interface TestConnectionDto {
  type: DataSourceType;
  connectionDetails: Record<string, any>;
  fileId?: string;
}

export interface TestConnectionResult {
  success: boolean;
  message: string;
  details?: Record<string, any>;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

// API Service
const dataSourcesService = {
  // Get all data sources
  getAll: async (search?: string, page = 1, pageSize = 10): Promise<PaginatedResult<DataSource>> => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());

    return apiCall<PaginatedResult<DataSource>>('get', `/data-sources?${params.toString()}`);
  },

  // Get a single data source by ID
  getById: async (id: string): Promise<DataSource> => {
    return apiCall<DataSource>('get', `/data-sources/${id}`);
  },

  // Create a new data source
  create: async (dataSource: CreateDataSourceDto): Promise<DataSource> => {
    return apiCall<DataSource>('post', '/data-sources', dataSource);
  },

  // Update a data source
  update: async (id: string, dataSource: Partial<CreateDataSourceDto>): Promise<DataSource> => {
    return apiCall<DataSource>('put', `/data-sources/${id}`, dataSource);
  },

  // Delete a data source
  delete: async (id: string): Promise<void> => {
    return apiCall<void>('delete', `/data-sources/${id}`);
  },

  // Test a connection
  testConnection: async (testDto: TestConnectionDto): Promise<TestConnectionResult> => {
    return apiCall<TestConnectionResult>('post', '/data-sources/test-connection', testDto);
  },

  // Sync a data source
  sync: async (id: string, fullSync = false, tables?: string[]): Promise<any> => {
    return apiCall<any>('post', `/data-sources/${id}/sync`, { fullSync, tables });
  },
};

export default dataSourcesService;
