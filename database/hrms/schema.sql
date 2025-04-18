-- HRMS Database Schema

-- Departments Table
CREATE TABLE departments (
    department_id INTEGER PRIMARY KEY,
    department_name TEXT NOT NULL,
    location TEXT,
    manager_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Positions Table
CREATE TABLE positions (
    position_id INTEGER PRIMARY KEY,
    position_title TEXT NOT NULL,
    min_salary REAL,
    max_salary REAL,
    department_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Employees Table
CREATE TABLE employees (
    employee_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    hire_date DATE NOT NULL,
    position_id INTEGER,
    salary REAL,
    manager_id INTEGER,
    department_id INTEGER,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    birth_date DATE,
    gender TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (position_id) REFERENCES positions(position_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);

-- Update departments table to add foreign key constraint for manager_id
CREATE TRIGGER update_department_manager
AFTER INSERT ON employees
BEGIN
    UPDATE departments
    SET manager_id = NEW.employee_id
    WHERE manager_id IS NULL AND department_id = NEW.department_id AND NEW.manager_id IS NULL;
END;

-- Attendance Table
CREATE TABLE attendance (
    attendance_id INTEGER PRIMARY KEY,
    employee_id INTEGER,
    attendance_date DATE NOT NULL,
    time_in TIMESTAMP,
    time_out TIMESTAMP,
    status TEXT CHECK(status IN ('Present', 'Absent', 'Late', 'Half-day')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- Leave Types Table
CREATE TABLE leave_types (
    leave_type_id INTEGER PRIMARY KEY,
    leave_type_name TEXT NOT NULL,
    description TEXT,
    default_days INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leave Requests Table
CREATE TABLE leave_requests (
    leave_request_id INTEGER PRIMARY KEY,
    employee_id INTEGER,
    leave_type_id INTEGER,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INTEGER,
    reason TEXT,
    status TEXT CHECK(status IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
    approved_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (leave_type_id) REFERENCES leave_types(leave_type_id),
    FOREIGN KEY (approved_by) REFERENCES employees(employee_id)
);

-- Performance Reviews Table
CREATE TABLE performance_reviews (
    review_id INTEGER PRIMARY KEY,
    employee_id INTEGER,
    reviewer_id INTEGER,
    review_date DATE,
    performance_score REAL,
    comments TEXT,
    goals TEXT,
    status TEXT CHECK(status IN ('Draft', 'Submitted', 'Acknowledged', 'Completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (reviewer_id) REFERENCES employees(employee_id)
);

-- Training Programs Table
CREATE TABLE training_programs (
    program_id INTEGER PRIMARY KEY,
    program_name TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    trainer TEXT,
    location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employee Training Table
CREATE TABLE employee_training (
    id INTEGER PRIMARY KEY,
    employee_id INTEGER,
    program_id INTEGER,
    status TEXT CHECK(status IN ('Enrolled', 'In Progress', 'Completed', 'Failed', 'Dropped')),
    completion_date DATE,
    certification TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (program_id) REFERENCES training_programs(program_id)
);

-- Payroll Table
CREATE TABLE payroll (
    payroll_id INTEGER PRIMARY KEY,
    employee_id INTEGER,
    pay_period_start DATE,
    pay_period_end DATE,
    basic_salary REAL,
    overtime_pay REAL,
    bonuses REAL,
    deductions REAL,
    tax REAL,
    net_pay REAL,
    payment_date DATE,
    payment_method TEXT,
    status TEXT CHECK(status IN ('Pending', 'Processed', 'Paid')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- Create indexes for better performance
CREATE INDEX idx_employee_department ON employees(department_id);
CREATE INDEX idx_employee_position ON employees(position_id);
CREATE INDEX idx_attendance_employee ON attendance(employee_id);
CREATE INDEX idx_leave_employee ON leave_requests(employee_id);
CREATE INDEX idx_performance_employee ON performance_reviews(employee_id);
CREATE INDEX idx_payroll_employee ON payroll(employee_id);
