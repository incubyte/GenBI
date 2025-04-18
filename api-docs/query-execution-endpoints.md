# Query Execution API Endpoints

This document outlines the API endpoints related to executing natural language queries, retrieving results, and managing query history.

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

### Execute Natural Language Query

Executes a natural language query by converting it to SQL and running it against the connected data sources.

**Endpoint:** `POST /queries/execute`

**Request Body:**

```json
{
  "query": "Show me monthly revenue trends by product category",
  "dataSourceIds": ["1", "2"],  // Optional: Specific data sources to query (if omitted, queries all accessible sources)
  "options": {
    "limit": 1000,              // Optional: Maximum number of rows to return
    "timeout": 30000,           // Optional: Query timeout in milliseconds
    "generateInsights": true    // Optional: Whether to generate AI insights from the results
  }
}
```

**Response:**

```json
{
  "queryId": "q-123456",
  "status": "processing",
  "estimatedCompletionTime": "2023-06-15T10:30:45Z"
}
```

**Status Codes:**
- `202 Accepted`: Query is being processed
- `400 Bad Request`: Invalid query parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to query the specified data sources

---

### Get Query Results

Retrieves the results of a previously executed query.

**Endpoint:** `GET /queries/{queryId}/results`

**Path Parameters:**
- `queryId`: The ID of the query returned from the execute endpoint

**Query Parameters:**
- `format` (optional): Response format (json, csv) - defaults to json
- `page` (optional): Page number for paginated results - defaults to 1
- `pageSize` (optional): Number of records per page - defaults to 100

**Response:**

```json
{
  "queryId": "q-123456",
  "status": "completed",
  "executionTime": 1250,
  "sql": "SELECT DATE_TRUNC('month', order_date) AS month, SUM(CASE WHEN category = 'Electronics' THEN revenue ELSE 0 END) AS electronics_revenue, SUM(CASE WHEN category = 'Apparel' THEN revenue ELSE 0 END) AS apparel_revenue, SUM(CASE WHEN category = 'Home Goods' THEN revenue ELSE 0 END) AS home_goods_revenue, SUM(revenue) AS total_revenue FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-05-31' GROUP BY DATE_TRUNC('month', order_date) ORDER BY month ASC",
  "columns": [
    {"name": "month", "type": "date"},
    {"name": "electronics_revenue", "type": "number"},
    {"name": "apparel_revenue", "type": "number"},
    {"name": "home_goods_revenue", "type": "number"},
    {"name": "total_revenue", "type": "number"}
  ],
  "data": [
    {
      "month": "2023-01-01",
      "electronics_revenue": 2500,
      "apparel_revenue": 800,
      "home_goods_revenue": 700,
      "total_revenue": 4000
    },
    {
      "month": "2023-02-01",
      "electronics_revenue": 1800,
      "apparel_revenue": 600,
      "home_goods_revenue": 600,
      "total_revenue": 3000
    },
    // Additional rows...
  ],
  "pagination": {
    "page": 1,
    "pageSize": 100,
    "totalPages": 1,
    "totalRecords": 5
  },
  "insights": [
    {
      "title": "Electronics dominates revenue",
      "description": "Electronics consistently accounts for over 60% of total revenue across all months.",
      "type": "info"
    },
    {
      "title": "Declining trend in February",
      "description": "All product categories showed a decline in February compared to January.",
      "type": "negative"
    },
    {
      "title": "Home Goods stability",
      "description": "Home Goods revenue has remained the most stable across the time period.",
      "type": "neutral"
    }
  ],
  "visualizationSuggestions": [
    {
      "type": "bar",
      "title": "Monthly Revenue by Product Category",
      "description": "Comparing revenue across product categories by month"
    },
    {
      "type": "line",
      "title": "Revenue Trends Over Time",
      "description": "Tracking revenue changes over the time period"
    },
    {
      "type": "pie",
      "title": "Revenue Distribution by Category",
      "description": "Showing the proportion of revenue from each product category"
    }
  ]
}
```

**Status Codes:**
- `200 OK`: Results retrieved successfully
- `202 Accepted`: Query is still processing
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to access this query
- `404 Not Found`: Query not found

---

### Get Query Status

Checks the status of a query without retrieving the full results.

**Endpoint:** `GET /queries/{queryId}/status`

**Path Parameters:**
- `queryId`: The ID of the query

**Response:**

```json
{
  "queryId": "q-123456",
  "status": "completed", // possible values: queued, processing, completed, failed, cancelled
  "progress": 100,
  "startTime": "2023-06-15T10:30:00Z",
  "endTime": "2023-06-15T10:30:45Z",
  "executionTime": 45000, // in milliseconds
  "error": null // present only if status is "failed"
}
```

**Status Codes:**
- `200 OK`: Status retrieved successfully
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to access this query
- `404 Not Found`: Query not found

---

### Save Query

Saves a query for future reference.

**Endpoint:** `POST /queries/{queryId}/save`

**Path Parameters:**
- `queryId`: The ID of the query to save

**Request Body:**

```json
{
  "name": "Monthly Revenue Analysis",
  "description": "Analysis of monthly revenue trends by product category",
  "tags": ["revenue", "monthly", "product"],
  "isPublic": false
}
```

**Response:**

```json
{
  "id": "sq-789012",
  "queryId": "q-123456",
  "name": "Monthly Revenue Analysis",
  "description": "Analysis of monthly revenue trends by product category",
  "tags": ["revenue", "monthly", "product"],
  "isPublic": false,
  "createdAt": "2023-06-15T10:35:00Z",
  "createdBy": "user-123"
}
```

**Status Codes:**
- `201 Created`: Query saved successfully
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to save this query
- `404 Not Found`: Query not found

---

### Get Recent Queries

Retrieves a list of recent queries executed by the user.

**Endpoint:** `GET /queries/recent`

**Query Parameters:**
- `limit` (optional): Maximum number of queries to return - defaults to 10
- `offset` (optional): Number of queries to skip - defaults to 0
- `status` (optional): Filter by query status (completed, failed, etc.)

**Response:**

```json
{
  "queries": [
    {
      "id": "q-123456",
      "naturalLanguageQuery": "Show me monthly revenue trends by product category",
      "status": "completed",
      "executionTime": 1250,
      "executedAt": "2023-06-15T10:30:00Z",
      "dataSourceIds": ["1", "2"],
      "rowCount": 5,
      "isSaved": true,
      "savedQueryId": "sq-789012"
    },
    {
      "id": "q-123455",
      "naturalLanguageQuery": "What are my top 5 customers by revenue?",
      "status": "completed",
      "executionTime": 980,
      "executedAt": "2023-06-14T15:20:00Z",
      "dataSourceIds": ["1"],
      "rowCount": 5,
      "isSaved": false,
      "savedQueryId": null
    }
    // Additional queries...
  ],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 24
  }
}
```

**Status Codes:**
- `200 OK`: Queries retrieved successfully
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid authentication

---

### Cancel Query Execution

Cancels a running query.

**Endpoint:** `POST /queries/{queryId}/cancel`

**Path Parameters:**
- `queryId`: The ID of the query to cancel

**Response:**

```json
{
  "queryId": "q-123456",
  "status": "cancelled",
  "message": "Query execution cancelled successfully"
}
```

**Status Codes:**
- `200 OK`: Query cancelled successfully
- `400 Bad Request`: Query cannot be cancelled (already completed or failed)
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User doesn't have permission to cancel this query
- `404 Not Found`: Query not found

---

### Get Popular Queries

Retrieves a list of popular or suggested queries.

**Endpoint:** `GET /queries/popular`

**Query Parameters:**
- `limit` (optional): Maximum number of queries to return - defaults to 5
- `category` (optional): Filter by query category (revenue, customers, products, etc.)

**Response:**

```json
{
  "queries": [
    {
      "text": "Show me monthly revenue trends by product category",
      "category": "revenue"
    },
    {
      "text": "Compare sales performance across regions",
      "category": "sales"
    },
    {
      "text": "What are my top 5 customers by revenue?",
      "category": "customers"
    },
    {
      "text": "Show customer retention rates over time",
      "category": "customers"
    }
  ]
}
```

**Status Codes:**
- `200 OK`: Queries retrieved successfully
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid authentication
