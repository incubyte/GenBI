# Data Sources API Endpoints

This document outlines the API endpoints related to managing data sources, including databases, file uploads, and API connections.

## Base URL

All API endpoints are relative to the base URL:

```
/api/v1
```

## Authentication

All endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### List Data Sources

Retrieves a list of all data sources available to the user.

**Endpoint:** `GET /data-sources`

**Query Parameters:**
- `search` (optional): Search term to filter data sources by name or type
- `status` (optional): Filter by connection status (connected, disconnected, error)
- `type` (optional): Filter by data source type (postgresql, mysql, csv, etc.)
- `page` (optional): Page number for paginated results - defaults to 1
- `pageSize` (optional): Number of records per page - defaults to 20
- `sortBy` (optional): Field to sort by (name, type, lastSync, recordCount) - defaults to name
- `sortOrder` (optional): Sort order (asc, desc) - defaults to asc

**Response:**

```json
{
  "dataSources": [
    {
      "id": "1",
      "name": "Marketing Data",
      "type": "postgresql",
      "status": "connected",
      "lastSync": "2023-04-15T10:30:00Z",
      "recordCount": 1250000,
      "createdAt": "2023-03-10T08:15:00Z",
      "updatedAt": "2023-04-15T10:30:00Z"
    },
    {
      "id": "2",
      "name": "Sales Analytics",
      "type": "mysql",
      "status": "connected",
      "lastSync": "2023-04-10T14:45:00Z",
      "recordCount": 850000,
      "createdAt": "2023-03-05T11:20:00Z",
      "updatedAt": "2023-04-10T14:45:00Z"
    },
    {
      "id": "3",
      "name": "Customer Data",
      "type": "csv",
      "status": "error",
      "lastSync": "2023-04-05T09:10:00Z",
      "recordCount": 45000,
      "createdAt": "2023-04-01T16:30:00Z",
      "updatedAt": "2023-04-05T09:10:00Z",
      "error": "File format validation failed"
    }
    // Additional data sources...
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalPages": 1,
    "totalRecords": 3
  }
}
```

**Status Codes:**
- `200 OK`: Data sources retrieved successfully
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid authentication

---

### Get Data Source Details

Retrieves detailed information about a specific data source.

**Endpoint:** `GET /data-sources/{dataSourceId}`

**Path Parameters:**
- `dataSourceId`: The ID of the data source

**Response:**

```json
{
  "id": "1",
  "name": "Marketing Data",
  "description": "PostgreSQL database containing marketing campaign data and analytics",
  "type": "postgresql",
  "status": "connected",
  "connectionDetails": {
    "host": "marketing-db.example.com",
    "port": 5432,
    "database": "marketing_analytics",
    "username": "analytics_user",
    "ssl": true
  },
  "schema": {
    "tables": [
      {
        "name": "campaigns",
        "rowCount": 250,
        "columns": [
          {"name": "id", "type": "integer", "isPrimary": true},
          {"name": "name", "type": "varchar", "isPrimary": false},
          {"name": "start_date", "type": "date", "isPrimary": false},
          {"name": "end_date", "type": "date", "isPrimary": false},
          {"name": "budget", "type": "decimal", "isPrimary": false},
          {"name": "status", "type": "varchar", "isPrimary": false}
        ]
      },
      {
        "name": "campaign_metrics",
        "rowCount": 12500,
        "columns": [
          {"name": "id", "type": "integer", "isPrimary": true},
          {"name": "campaign_id", "type": "integer", "isPrimary": false},
          {"name": "date", "type": "date", "isPrimary": false},
          {"name": "impressions", "type": "integer", "isPrimary": false},
          {"name": "clicks", "type": "integer", "isPrimary": false},
          {"name": "conversions", "type": "integer", "isPrimary": false},
          {"name": "spend", "type": "decimal", "isPrimary": false}
        ]
      }
      // Additional tables...
    ],
    "relationships": [
      {
        "name": "campaign_metrics_campaign_id_fkey",
        "table": "campaign_metrics",
        "column": "campaign_id",
        "referencedTable": "campaigns",
        "referencedColumn": "id"
      }
      // Additional relationships...
    ]
  },
  "lastSync": "2023-04-15T10:30:00Z",
  "recordCount": 1250000,
  "createdAt": "2023-03-10T08:15:00Z",
  "updatedAt": "2023-04-15T10:30:00Z",
  "createdBy": "user-123",
  "syncSchedule": {
    "frequency": "daily",
    "time": "02:00:00",
    "timezone": "UTC",
    "lastRun": "2023-04-15T02:00:00Z",
    "nextRun": "2023-04-16T02:00:00Z"
  }
}
```

**Status Codes:**
- `200 OK`: Data source retrieved successfully
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to access this data source
- `404 Not Found`: Data source not found

---

### Create Data Source

Creates a new data source connection.

**Endpoint:** `POST /data-sources`

**Request Body:**

For a database connection:
```json
{
  "name": "Marketing Data",
  "description": "PostgreSQL database containing marketing campaign data and analytics",
  "type": "postgresql",
  "connectionDetails": {
    "host": "marketing-db.example.com",
    "port": 5432,
    "database": "marketing_analytics",
    "username": "analytics_user",
    "password": "securePassword123",
    "ssl": true
  },
  "syncSchedule": {
    "frequency": "daily",
    "time": "02:00:00",
    "timezone": "UTC"
  }
}
```

For a file upload:
```json
{
  "name": "Customer Data",
  "description": "CSV file containing customer information",
  "type": "csv",
  "fileId": "file-123456" // Reference to a previously uploaded file
}
```

For an API connection:
```json
{
  "name": "Google Analytics",
  "description": "Connection to Google Analytics API",
  "type": "api",
  "connectionDetails": {
    "url": "https://www.googleapis.com/analytics/v3/data",
    "authType": "oauth2",
    "credentials": {
      "clientId": "your-client-id",
      "clientSecret": "your-client-secret",
      "refreshToken": "your-refresh-token"
    },
    "headers": {
      "Content-Type": "application/json"
    }
  },
  "syncSchedule": {
    "frequency": "daily",
    "time": "03:00:00",
    "timezone": "UTC"
  }
}
```

**Response:**

```json
{
  "id": "4",
  "name": "Marketing Data",
  "description": "PostgreSQL database containing marketing campaign data and analytics",
  "type": "postgresql",
  "status": "connecting",
  "connectionDetails": {
    "host": "marketing-db.example.com",
    "port": 5432,
    "database": "marketing_analytics",
    "username": "analytics_user",
    "ssl": true
    // Note: Password is not returned
  },
  "createdAt": "2023-06-15T14:30:00Z",
  "updatedAt": "2023-06-15T14:30:00Z",
  "createdBy": "user-123",
  "syncSchedule": {
    "frequency": "daily",
    "time": "02:00:00",
    "timezone": "UTC",
    "nextRun": "2023-06-16T02:00:00Z"
  }
}
```

**Status Codes:**
- `201 Created`: Data source created successfully
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to create data sources

---

### Update Data Source

Updates an existing data source.

**Endpoint:** `PUT /data-sources/{dataSourceId}`

**Path Parameters:**
- `dataSourceId`: The ID of the data source to update

**Request Body:**

```json
{
  "name": "Updated Marketing Data",
  "description": "Updated description for marketing database",
  "connectionDetails": {
    "host": "new-marketing-db.example.com",
    "port": 5432,
    "database": "marketing_analytics",
    "username": "new_analytics_user",
    "password": "newSecurePassword456",
    "ssl": true
  },
  "syncSchedule": {
    "frequency": "hourly",
    "timezone": "UTC"
  }
}
```

**Response:**

```json
{
  "id": "1",
  "name": "Updated Marketing Data",
  "description": "Updated description for marketing database",
  "type": "postgresql",
  "status": "connected",
  "connectionDetails": {
    "host": "new-marketing-db.example.com",
    "port": 5432,
    "database": "marketing_analytics",
    "username": "new_analytics_user",
    "ssl": true
    // Note: Password is not returned
  },
  "lastSync": "2023-04-15T10:30:00Z",
  "recordCount": 1250000,
  "createdAt": "2023-03-10T08:15:00Z",
  "updatedAt": "2023-06-15T15:45:00Z",
  "createdBy": "user-123",
  "syncSchedule": {
    "frequency": "hourly",
    "timezone": "UTC",
    "lastRun": "2023-04-15T10:30:00Z",
    "nextRun": "2023-06-15T16:00:00Z"
  }
}
```

**Status Codes:**
- `200 OK`: Data source updated successfully
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to update this data source
- `404 Not Found`: Data source not found

---

### Delete Data Source

Deletes a data source.

**Endpoint:** `DELETE /data-sources/{dataSourceId}`

**Path Parameters:**
- `dataSourceId`: The ID of the data source to delete

**Response:**

```json
{
  "message": "Data source deleted successfully",
  "id": "1"
}
```

**Status Codes:**
- `200 OK`: Data source deleted successfully
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to delete this data source
- `404 Not Found`: Data source not found

---

### Test Data Source Connection

Tests the connection to a data source without creating or updating it.

**Endpoint:** `POST /data-sources/test-connection`

**Request Body:**

```json
{
  "type": "postgresql",
  "connectionDetails": {
    "host": "marketing-db.example.com",
    "port": 5432,
    "database": "marketing_analytics",
    "username": "analytics_user",
    "password": "securePassword123",
    "ssl": true
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Connection successful",
  "details": {
    "latency": 120, // in milliseconds
    "version": "PostgreSQL 13.4"
  }
}
```

Or for a failed connection:

```json
{
  "success": false,
  "message": "Connection failed",
  "error": {
    "code": "ECONNREFUSED",
    "message": "Could not connect to database server"
  }
}
```

**Status Codes:**
- `200 OK`: Connection test completed (check success field for result)
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid authentication

---

### Sync Data Source

Triggers a manual synchronization of a data source.

**Endpoint:** `POST /data-sources/{dataSourceId}/sync`

**Path Parameters:**
- `dataSourceId`: The ID of the data source to sync

**Request Body:**

```json
{
  "fullSync": true, // Optional: Whether to perform a full sync or incremental sync
  "tables": ["campaigns", "campaign_metrics"] // Optional: Specific tables to sync
}
```

**Response:**

```json
{
  "syncId": "sync-123456",
  "dataSourceId": "1",
  "status": "queued",
  "message": "Sync job queued successfully",
  "estimatedCompletionTime": "2023-06-15T16:30:00Z"
}
```

**Status Codes:**
- `202 Accepted`: Sync job queued successfully
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to sync this data source
- `404 Not Found`: Data source not found

---

### Get Data Source Sync Status

Retrieves the status of a data source synchronization job.

**Endpoint:** `GET /data-sources/{dataSourceId}/sync/{syncId}`

**Path Parameters:**
- `dataSourceId`: The ID of the data source
- `syncId`: The ID of the sync job

**Response:**

```json
{
  "syncId": "sync-123456",
  "dataSourceId": "1",
  "status": "in_progress", // possible values: queued, in_progress, completed, failed
  "progress": 65, // percentage complete
  "startTime": "2023-06-15T16:00:00Z",
  "estimatedCompletionTime": "2023-06-15T16:30:00Z",
  "tablesProcessed": 2,
  "totalTables": 5,
  "recordsProcessed": 750000,
  "error": null // present only if status is "failed"
}
```

**Status Codes:**
- `200 OK`: Sync status retrieved successfully
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to access this sync job
- `404 Not Found`: Data source or sync job not found

---

### Upload File for Data Source

Uploads a file to be used as a data source.

**Endpoint:** `POST /data-sources/files/upload`

**Request:**
- Content-Type: multipart/form-data
- Form fields:
  - `file`: The file to upload
  - `type`: File type (csv, excel, json)
  - `name` (optional): Custom name for the file

**Response:**

```json
{
  "fileId": "file-123456",
  "name": "customer_data.csv",
  "originalName": "customer_data.csv",
  "type": "csv",
  "size": 1048576, // in bytes
  "uploadedAt": "2023-06-15T16:45:00Z",
  "previewAvailable": true
}
```

**Status Codes:**
- `201 Created`: File uploaded successfully
- `400 Bad Request`: Invalid file or parameters
- `401 Unauthorized`: Missing or invalid authentication
- `413 Payload Too Large`: File size exceeds limit

---

### Get File Preview

Retrieves a preview of an uploaded file.

**Endpoint:** `GET /data-sources/files/{fileId}/preview`

**Path Parameters:**
- `fileId`: The ID of the uploaded file

**Query Parameters:**
- `rows` (optional): Number of rows to preview - defaults to 10

**Response:**

For a CSV file:
```json
{
  "fileId": "file-123456",
  "name": "customer_data.csv",
  "type": "csv",
  "columns": [
    {"name": "id", "type": "integer"},
    {"name": "name", "type": "string"},
    {"name": "email", "type": "string"},
    {"name": "signup_date", "type": "date"},
    {"name": "last_purchase", "type": "date"}
  ],
  "data": [
    {"id": 1, "name": "John Doe", "email": "john@example.com", "signup_date": "2022-01-15", "last_purchase": "2023-03-20"},
    {"id": 2, "name": "Jane Smith", "email": "jane@example.com", "signup_date": "2022-02-10", "last_purchase": "2023-04-05"},
    // Additional rows...
  ],
  "totalRows": 45000
}
```

**Status Codes:**
- `200 OK`: File preview retrieved successfully
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to access this file
- `404 Not Found`: File not found
