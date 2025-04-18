# HRMS SQLite Database

This is a simple SQLite database for a Human Resource Management System (HRMS). It includes tables for employees, departments, positions, attendance, leave management, performance reviews, training, and payroll.

## Database Structure

The database consists of the following tables:

1. **departments** - Company departments
2. **positions** - Job positions/titles
3. **employees** - Employee information
4. **attendance** - Daily attendance records
5. **leave_types** - Types of leave (annual, sick, etc.)
6. **leave_requests** - Employee leave requests
7. **performance_reviews** - Employee performance evaluations
8. **training_programs** - Available training programs
9. **employee_training** - Employee participation in training
10. **payroll** - Employee payroll records

## Getting Started

### Prerequisites

- Python 3.6 or higher
- SQLite3
- tabulate (for running sample queries)

### Installation

1. Install the required Python package:

```bash
pip install tabulate
```

### Creating and Populating the Database

Run the initialization script to create the database and populate it with sample data:

```bash
python init_database.py
```

This will create a file named `hrms.db` in the current directory.

### Running Sample Queries

To run sample queries against the database:

```bash
python sample_queries.py
```

This will display various reports from the database, such as:
- Employee counts by department
- Salary statistics
- Attendance records
- Leave requests
- Performance reviews
- Training program participation
- Payroll information

## Manual Database Access

You can also access the database directly using the SQLite command-line tool:

```bash
sqlite3 hrms.db
```

Some useful SQLite commands:
- `.tables` - List all tables
- `.schema [table_name]` - Show the schema for a table
- `.headers on` - Turn on column headers
- `.mode column` - Format output as columns
- `.quit` - Exit SQLite

## Database Schema

The database schema is defined in `schema.sql`. It includes table definitions, foreign key constraints, and indexes for better performance.

## Sample Data

Sample data is provided in `sample_data.sql`. It includes:
- 7 departments
- 15 job positions
- 23 employees
- Attendance records for a sample week
- Leave requests
- Performance reviews
- Training programs
- Payroll records

## Extending the Database

You can extend this database by:
1. Adding more tables as needed
2. Adding more columns to existing tables
3. Creating additional indexes for performance
4. Adding more complex relationships between tables

## License

This project is available for free use and modification.
