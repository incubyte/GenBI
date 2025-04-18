#!/usr/bin/env python3
"""
Run sample queries against the HRMS SQLite database to demonstrate its functionality.
"""

import os
import sqlite3
from tabulate import tabulate

def run_query(conn, query, title):
    """Run a query and print the results in a formatted table."""
    print(f"\n=== {title} ===")
    cursor = conn.cursor()
    cursor.execute(query)
    
    # Get column names
    columns = [description[0] for description in cursor.description]
    
    # Fetch all rows
    rows = cursor.fetchall()
    
    # Print table
    if rows:
        print(tabulate(rows, headers=columns, tablefmt="grid"))
        print(f"Total rows: {len(rows)}")
    else:
        print("No results found.")

def main():
    # Database file path
    db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'hrms.db')
    
    # Check if database exists
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        print("Please run init_database.py first to create and populate the database.")
        return
    
    # Connect to the database
    conn = sqlite3.connect(db_path)
    
    # Sample queries
    queries = [
        (
            "SELECT COUNT(*) as total_employees FROM employees",
            "Total Number of Employees"
        ),
        (
            """
            SELECT d.department_name, COUNT(e.employee_id) as employee_count
            FROM departments d
            LEFT JOIN employees e ON d.department_id = e.department_id
            GROUP BY d.department_name
            ORDER BY employee_count DESC
            """,
            "Employee Count by Department"
        ),
        (
            """
            SELECT e.first_name || ' ' || e.last_name as employee_name, 
                   p.position_title, d.department_name, e.salary
            FROM employees e
            JOIN positions p ON e.position_id = p.position_id
            JOIN departments d ON e.department_id = d.department_id
            ORDER BY e.salary DESC
            LIMIT 10
            """,
            "Top 10 Highest Paid Employees"
        ),
        (
            """
            SELECT e.first_name || ' ' || e.last_name as employee_name,
                   a.attendance_date, a.status,
                   time(a.time_in) as time_in, time(a.time_out) as time_out
            FROM attendance a
            JOIN employees e ON a.employee_id = e.employee_id
            ORDER BY a.attendance_date DESC, e.employee_id
            LIMIT 15
            """,
            "Recent Attendance Records"
        ),
        (
            """
            SELECT e.first_name || ' ' || e.last_name as employee_name,
                   lt.leave_type_name, lr.start_date, lr.end_date, lr.total_days,
                   lr.status
            FROM leave_requests lr
            JOIN employees e ON lr.employee_id = e.employee_id
            JOIN leave_types lt ON lr.leave_type_id = lt.leave_type_id
            ORDER BY lr.start_date DESC
            """,
            "Leave Requests"
        ),
        (
            """
            SELECT e.first_name || ' ' || e.last_name as employee_name,
                   pr.review_date, pr.performance_score,
                   r.first_name || ' ' || r.last_name as reviewer_name
            FROM performance_reviews pr
            JOIN employees e ON pr.employee_id = e.employee_id
            JOIN employees r ON pr.reviewer_id = r.employee_id
            ORDER BY pr.review_date DESC
            """,
            "Performance Reviews"
        ),
        (
            """
            SELECT tp.program_name, tp.start_date, tp.end_date,
                   COUNT(et.employee_id) as participant_count
            FROM training_programs tp
            LEFT JOIN employee_training et ON tp.program_id = et.program_id
            GROUP BY tp.program_id
            ORDER BY tp.start_date
            """,
            "Training Programs and Participation"
        ),
        (
            """
            SELECT e.first_name || ' ' || e.last_name as employee_name,
                   p.pay_period_start, p.pay_period_end,
                   p.basic_salary, p.overtime_pay, p.bonuses,
                   p.deductions, p.tax, p.net_pay, p.status
            FROM payroll p
            JOIN employees e ON p.employee_id = e.employee_id
            ORDER BY p.payment_date DESC
            LIMIT 10
            """,
            "Recent Payroll Records"
        ),
        (
            """
            SELECT d.department_name, 
                   AVG(e.salary) as avg_salary,
                   MIN(e.salary) as min_salary,
                   MAX(e.salary) as max_salary
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            GROUP BY d.department_name
            ORDER BY avg_salary DESC
            """,
            "Salary Statistics by Department"
        ),
        (
            """
            SELECT m.first_name || ' ' || m.last_name as manager_name,
                   COUNT(e.employee_id) as direct_reports
            FROM employees e
            JOIN employees m ON e.manager_id = m.employee_id
            GROUP BY e.manager_id
            ORDER BY direct_reports DESC
            """,
            "Managers and Their Direct Reports"
        )
    ]
    
    # Run each query
    for query, title in queries:
        run_query(conn, query, title)
    
    # Close connection
    conn.close()
    print("\nAll queries completed.")

if __name__ == "__main__":
    main()
