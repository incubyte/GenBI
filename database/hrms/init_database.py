#!/usr/bin/env python3
"""
Initialize the HRMS SQLite database by creating the schema and populating it with sample data.
"""

import os
import sqlite3
import sys

def main():
    # Database file path
    db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'hrms.db')
    
    # Check if database already exists
    if os.path.exists(db_path):
        print(f"Database already exists at {db_path}")
        choice = input("Do you want to recreate it? (y/n): ").lower()
        if choice != 'y':
            print("Exiting without changes.")
            sys.exit(0)
        os.remove(db_path)
        print("Existing database removed.")
    
    # Create a new database
    print(f"Creating new database at {db_path}...")
    conn = sqlite3.connect(db_path)
    
    # Execute schema script
    print("Creating database schema...")
    schema_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'schema.sql')
    with open(schema_path, 'r') as f:
        schema_script = f.read()
    conn.executescript(schema_script)
    
    # Execute sample data script
    print("Populating database with sample data...")
    data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sample_data.sql')
    with open(data_path, 'r') as f:
        data_script = f.read()
    conn.executescript(data_script)
    
    # Commit changes and close connection
    conn.commit()
    conn.close()
    
    print("Database initialization completed successfully!")
    print(f"Database file: {db_path}")

if __name__ == "__main__":
    main()
