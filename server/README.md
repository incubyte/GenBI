# GenBI Backend

A production-ready NestJS TypeScript backend that connects to SQLite, uses TypeORM, and integrates with Claude API for natural language to SQL conversion.

## Overview

GenBI Backend is a powerful data analytics platform that allows users to:

- Connect to various data sources (databases, files, APIs)
- Query data using natural language
- Generate visualizations and insights
- Create and manage dashboards

The backend uses Claude AI to convert natural language queries into SQL, making data analysis accessible to non-technical users.

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: SQLite
- **ORM**: TypeORM
- **API Documentation**: Swagger
- **AI Integration**: Anthropic Claude API

## Project Structure

```
server/
├── src/                      # Source code
│   ├── common/               # Shared code
│   │   ├── dto/              # Data Transfer Objects
│   │   └── services/         # Common services
│   ├── data-sources/         # Data sources module
│   │   ├── dto/              # Data source DTOs
│   │   ├── entities/         # Data source entities
│   │   ├── data-sources.controller.ts
│   │   ├── data-sources.module.ts
│   │   ├── data-sources.service.ts
│   │   ├── connection-test.service.ts
│   │   └── file-upload.service.ts
│   ├── queries/              # Queries module
│   ├── dashboards/           # Dashboards module
│   ├── app.module.ts         # Main application module
│   └── main.ts               # Application entry point
├── data/                     # SQLite database files
├── uploads/                  # Uploaded files
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Anthropic API key (for Claude integration)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>/server
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the server directory with the following content:

```
# Database Configuration
DATABASE_PATH=./data/genbi.db

# API Configuration
PORT=3000
API_PREFIX=api/v1

# Anthropic API Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key
```

Replace `your_anthropic_api_key` with your actual Anthropic API key.

## Running the Application

### Development Mode

```bash
npm run start:dev
# or
yarn start:dev
```

This will start the application in development mode with hot-reload enabled.

### Production Mode

```bash
npm run build
npm run start:prod
# or
yarn build
yarn start:prod
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3000/docs
```

## API Endpoints

### Data Sources

- `GET /api/v1/data-sources` - List all data sources
- `GET /api/v1/data-sources/:id` - Get a specific data source
- `POST /api/v1/data-sources` - Create a new data source
- `PUT /api/v1/data-sources/:id` - Update a data source
- `DELETE /api/v1/data-sources/:id` - Delete a data source
- `POST /api/v1/data-sources/test-connection` - Test a data source connection
- `POST /api/v1/data-sources/:id/sync` - Sync a data source
- `GET /api/v1/data-sources/:id/sync/:syncId` - Get sync status
- `POST /api/v1/data-sources/files/upload` - Upload a file for data source
- `GET /api/v1/data-sources/files/:fileId/preview` - Get file preview

### Queries (Coming Soon)

- `POST /api/v1/queries/execute` - Execute a natural language query
- `GET /api/v1/queries/:id/results` - Get query results
- `GET /api/v1/queries/:id/status` - Get query status
- `POST /api/v1/queries/:id/save` - Save a query
- `GET /api/v1/queries/recent` - Get recent queries
- `POST /api/v1/queries/:id/cancel` - Cancel a query
- `GET /api/v1/queries/popular` - Get popular queries

### Dashboards (Coming Soon)

- `GET /api/v1/dashboards` - List all dashboards
- `GET /api/v1/dashboards/:id` - Get a specific dashboard
- `POST /api/v1/dashboards` - Create a new dashboard
- `PUT /api/v1/dashboards/:id` - Update a dashboard
- `DELETE /api/v1/dashboards/:id` - Delete a dashboard

## Data Source Types

The application supports the following data source types:

- **Databases**: PostgreSQL, MySQL, SQLite, MongoDB
- **Files**: CSV, Excel, JSON
- **APIs**: REST API connections

## Natural Language to SQL Conversion

The application uses Claude AI to convert natural language queries into SQL. The process works as follows:

1. User submits a natural language query
2. The query is sent to the Claude API along with the database schema
3. Claude generates the appropriate SQL query
4. The SQL query is executed against the data source
5. Results are returned to the user along with AI-generated insights

## Development

### Adding a New Module

1. Create a new directory in the `src` folder
2. Create the module, controller, service, and entity files
3. Add the module to the imports array in `app.module.ts`

### Running Tests

```bash
# Unit tests
npm run test
# or
yarn test

# e2e tests
npm run test:e2e
# or
yarn test:e2e

# Test coverage
npm run test:cov
# or
yarn test:cov
```

## License

[MIT](LICENSE)
