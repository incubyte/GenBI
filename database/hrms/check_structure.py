#!/usr/bin/env python3
"""
Check the structure of the HRMS SQLite database.
"""

import os
import sqlite3

def main():
    # Database file path
    db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'hrms.db')
    
    # Check if database exists
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        return
    
    # Connect to the database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get list of tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;")
    tables = cursor.fetchall()
    
    print("Tables in the database:")
    for i, table in enumerate(tables, 1):
        print(f"{i}. {table[0]}")
    
    # For each table, get its structure
    print("\nTable structures:")
    for table in tables:
        table_name = table[0]
        print(f"\n{table_name}:")
        
        # Get table info
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = cursor.fetchall()
        
        # Print column information
        for col in columns:
            col_id, col_name, col_type, not_null, default_val, pk = col
            pk_str = "PRIMARY KEY" if pk else ""
            not_null_str = "NOT NULL" if not_null else ""
            default_str = f"DEFAULT {default_val}" if default_val is not None else ""
            print(f"  - {col_name} ({col_type}) {pk_str} {not_null_str} {default_str}".strip())
    
    # Close connection
    conn.close()

if __name__ == "__main__":
    main()
