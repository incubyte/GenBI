#!/usr/bin/env python3
"""
Example of how to connect to the HRMS SQLite database and run queries.
"""

import sqlite3
import os

def main():
    # Get the path to the database file
    db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'hrms.db')
    
    # Connect to the database
    conn = sqlite3.connect(db_path)
    
    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()
    
    # Example 1: Simple query to get all departments
    print("Example 1: List of departments")
    cursor.execute("SELECT * FROM departments")
    departments = cursor.fetchall()
    for dept in departments:
        print(dept)
    
    print("\n" + "-"*50 + "\n")
    
    # Example 2: Query with parameters to find employees in a specific department
    print("Example 2: Employees in IT department")
    cursor.execute("""
        SELECT e.first_name, e.last_name, p.position_title
        FROM employees e
        JOIN positions p ON e.position_id = p.position_id
        JOIN departments d ON e.department_id = d.department_id
        WHERE d.department_name = ?
    """, ("Information Technology",))
    
    it_employees = cursor.fetchall()
    for emp in it_employees:
        print(f"{emp[0]} {emp[1]} - {emp[2]}")
    
    print("\n" + "-"*50 + "\n")
    
    # Example 3: Insert a new record
    print("Example 3: Adding a new training program")
    try:
        cursor.execute("""
            INSERT INTO training_programs 
            (program_name, description, start_date, end_date, trainer, location)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            "Python Programming", 
            "Introduction to Python programming language", 
            "2025-07-15", 
            "2025-07-17", 
            "External Trainer", 
            "Training Lab"
        ))
        conn.commit()
        print("New training program added successfully!")
        
        # Verify the insertion
        cursor.execute("SELECT * FROM training_programs WHERE program_name = ?", ("Python Programming",))
        print(cursor.fetchone())
    except sqlite3.Error as e:
        print(f"Error adding new training program: {e}")
    
    # Close the connection
    conn.close()

if __name__ == "__main__":
    main()
