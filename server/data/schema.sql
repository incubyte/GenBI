-- Data Sources
CREATE TABLE IF NOT EXISTS data_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'connecting',
    connectionDetails TEXT NOT NULL,
    lastSync DATETIME,
    recordCount INTEGER,
    error TEXT,
    syncSchedule TEXT,
    createdBy TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Data Source Syncs
CREATE TABLE IF NOT EXISTS data_source_syncs (
    id TEXT PRIMARY KEY,
    dataSourceId TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued',
    progress INTEGER NOT NULL DEFAULT 0,
    fullSync INTEGER NOT NULL DEFAULT 0,
    tables TEXT,
    startTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    endTime DATETIME,
    estimatedCompletionTime DATETIME,
    tablesProcessed INTEGER,
    totalTables INTEGER,
    recordsProcessed INTEGER,
    error TEXT,
    FOREIGN KEY (dataSourceId) REFERENCES data_sources(id) ON DELETE CASCADE
);

-- Data Source Tables
CREATE TABLE IF NOT EXISTS data_source_tables (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    rowCount INTEGER,
    dataSourceId TEXT NOT NULL,
    FOREIGN KEY (dataSourceId) REFERENCES data_sources(id) ON DELETE CASCADE
);

-- Data Source Columns
CREATE TABLE IF NOT EXISTS data_source_columns (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    isPrimary INTEGER NOT NULL DEFAULT 0,
    isNullable INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    tableId TEXT NOT NULL,
    FOREIGN KEY (tableId) REFERENCES data_source_tables(id) ON DELETE CASCADE
);

-- Data Source Relationships
CREATE TABLE IF NOT EXISTS data_source_relationships (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sourceTableId TEXT NOT NULL,
    sourceColumn TEXT NOT NULL,
    targetTableId TEXT NOT NULL,
    targetColumn TEXT NOT NULL,
    FOREIGN KEY (sourceTableId) REFERENCES data_source_tables(id) ON DELETE CASCADE,
    FOREIGN KEY (targetTableId) REFERENCES data_source_tables(id) ON DELETE CASCADE
);

-- Queries
CREATE TABLE IF NOT EXISTS queries (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'natural_language',
    sql TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    dataSourceId TEXT,
    error TEXT,
    isSaved INTEGER NOT NULL DEFAULT 0,
    name TEXT,
    description TEXT,
    executionTime INTEGER,
    rowCount INTEGER,
    createdBy TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dataSourceId) REFERENCES data_sources(id) ON DELETE SET NULL
);

-- Query Results
CREATE TABLE IF NOT EXISTS query_results (
    id TEXT PRIMARY KEY,
    queryId TEXT NOT NULL,
    data TEXT NOT NULL,
    columns TEXT,
    insights TEXT,
    executionTime INTEGER,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (queryId) REFERENCES queries(id) ON DELETE CASCADE
);

-- Dashboards
CREATE TABLE IF NOT EXISTS dashboards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    layout TEXT,
    createdBy TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Dashboard Widgets
CREATE TABLE IF NOT EXISTS dashboard_widgets (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'chart',
    queryId TEXT,
    config TEXT,
    position TEXT,
    dashboardId TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dashboardId) REFERENCES dashboards(id) ON DELETE CASCADE,
    FOREIGN KEY (queryId) REFERENCES queries(id) ON DELETE SET NULL
);
