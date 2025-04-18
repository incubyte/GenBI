-- Sample Data for HRMS Database

-- Insert Departments
INSERT INTO departments (department_name, location) VALUES 
('Human Resources', 'Floor 1'),
('Information Technology', 'Floor 2'),
('Finance', 'Floor 3'),
('Marketing', 'Floor 2'),
('Operations', 'Floor 4'),
('Research and Development', 'Floor 5'),
('Sales', 'Floor 1');

-- Insert Positions
INSERT INTO positions (position_title, min_salary, max_salary, department_id) VALUES 
('HR Manager', 70000, 90000, 1),
('HR Specialist', 45000, 65000, 1),
('IT Director', 90000, 120000, 2),
('Software Engineer', 65000, 95000, 2),
('System Administrator', 60000, 85000, 2),
('Finance Manager', 75000, 100000, 3),
('Accountant', 50000, 70000, 3),
('Marketing Director', 85000, 110000, 4),
('Marketing Specialist', 45000, 65000, 4),
('Operations Manager', 70000, 95000, 5),
('Operations Analyst', 50000, 70000, 5),
('R&D Director', 95000, 130000, 6),
('Research Scientist', 70000, 100000, 6),
('Sales Manager', 75000, 110000, 7),
('Sales Representative', 40000, 80000, 7);

-- Insert Employees
INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, position_id, salary, department_id, address, city, state, zip_code, birth_date, gender) VALUES 
-- HR Department
('John', 'Smith', 'john.smith@company.com', '555-123-4567', '2015-06-15', 1, 85000, 1, '123 Main St', 'New York', 'NY', '10001', '1980-03-12', 'Male'),
('Sarah', 'Johnson', 'sarah.johnson@company.com', '555-234-5678', '2018-03-20', 2, 55000, 1, '456 Oak Ave', 'New York', 'NY', '10002', '1985-07-22', 'Female'),
('Michael', 'Williams', 'michael.williams@company.com', '555-345-6789', '2019-11-05', 2, 52000, 1, '789 Pine Rd', 'New York', 'NY', '10003', '1990-05-17', 'Male'),

-- IT Department
('David', 'Brown', 'david.brown@company.com', '555-456-7890', '2014-08-10', 3, 110000, 2, '101 Tech Blvd', 'San Francisco', 'CA', '94105', '1975-11-30', 'Male'),
('Jennifer', 'Davis', 'jennifer.davis@company.com', '555-567-8901', '2017-02-15', 4, 85000, 2, '202 Coding Way', 'San Francisco', 'CA', '94107', '1988-09-14', 'Female'),
('Robert', 'Miller', 'robert.miller@company.com', '555-678-9012', '2020-01-20', 4, 78000, 2, '303 Developer St', 'San Francisco', 'CA', '94108', '1992-12-05', 'Male'),
('Lisa', 'Wilson', 'lisa.wilson@company.com', '555-789-0123', '2019-05-12', 5, 72000, 2, '404 Server Rd', 'San Francisco', 'CA', '94109', '1987-04-23', 'Female'),

-- Finance Department
('James', 'Moore', 'james.moore@company.com', '555-890-1234', '2016-07-01', 6, 95000, 3, '505 Money Ave', 'Chicago', 'IL', '60601', '1978-08-18', 'Male'),
('Patricia', 'Taylor', 'patricia.taylor@company.com', '555-901-2345', '2018-09-15', 7, 65000, 3, '606 Finance St', 'Chicago', 'IL', '60602', '1983-01-27', 'Female'),
('Richard', 'Anderson', 'richard.anderson@company.com', '555-012-3456', '2021-02-01', 7, 60000, 3, '707 Accounting Blvd', 'Chicago', 'IL', '60603', '1991-06-11', 'Male'),

-- Marketing Department
('Elizabeth', 'Thomas', 'elizabeth.thomas@company.com', '555-123-4567', '2015-11-10', 8, 100000, 4, '808 Brand St', 'Los Angeles', 'CA', '90001', '1979-10-15', 'Female'),
('Charles', 'Jackson', 'charles.jackson@company.com', '555-234-5678', '2019-03-25', 9, 60000, 4, '909 Marketing Ave', 'Los Angeles', 'CA', '90002', '1986-02-28', 'Male'),
('Susan', 'White', 'susan.white@company.com', '555-345-6789', '2020-08-17', 9, 58000, 4, '110 Creative Rd', 'Los Angeles', 'CA', '90003', '1993-07-19', 'Female'),

-- Operations Department
('Joseph', 'Harris', 'joseph.harris@company.com', '555-456-7890', '2014-05-20', 10, 90000, 5, '211 Operations Cir', 'Dallas', 'TX', '75201', '1976-12-03', 'Male'),
('Margaret', 'Martin', 'margaret.martin@company.com', '555-567-8901', '2017-10-05', 11, 65000, 5, '312 Process St', 'Dallas', 'TX', '75202', '1984-03-09', 'Female'),
('Thomas', 'Thompson', 'thomas.thompson@company.com', '555-678-9012', '2021-01-15', 11, 62000, 5, '413 Workflow Ave', 'Dallas', 'TX', '75203', '1989-09-21', 'Male'),

-- R&D Department
('Dorothy', 'Garcia', 'dorothy.garcia@company.com', '555-789-0123', '2013-09-01', 12, 125000, 6, '514 Innovation Pkwy', 'Boston', 'MA', '02108', '1972-05-07', 'Female'),
('Christopher', 'Martinez', 'christopher.martinez@company.com', '555-890-1234', '2016-11-15', 13, 95000, 6, '615 Research Blvd', 'Boston', 'MA', '02109', '1981-08-14', 'Male'),
('Nancy', 'Robinson', 'nancy.robinson@company.com', '555-901-2345', '2018-07-10', 13, 90000, 6, '716 Science Way', 'Boston', 'MA', '02110', '1985-11-29', 'Female'),

-- Sales Department
('Daniel', 'Clark', 'daniel.clark@company.com', '555-012-3456', '2015-03-15', 14, 105000, 7, '817 Sales Ave', 'Miami', 'FL', '33101', '1977-04-22', 'Male'),
('Karen', 'Rodriguez', 'karen.rodriguez@company.com', '555-123-4567', '2017-06-01', 15, 75000, 7, '918 Commission St', 'Miami', 'FL', '33102', '1982-10-17', 'Female'),
('Matthew', 'Lewis', 'matthew.lewis@company.com', '555-234-5678', '2019-09-20', 15, 68000, 7, '019 Client Rd', 'Miami', 'FL', '33103', '1988-01-05', 'Male'),
('Betty', 'Lee', 'betty.lee@company.com', '555-345-6789', '2020-11-10', 15, 65000, 7, '120 Prospect Blvd', 'Miami', 'FL', '33104', '1992-03-18', 'Female');

-- Update department managers
UPDATE departments SET manager_id = 1 WHERE department_id = 1;  -- John Smith as HR Manager
UPDATE departments SET manager_id = 4 WHERE department_id = 2;  -- David Brown as IT Director
UPDATE departments SET manager_id = 8 WHERE department_id = 3;  -- James Moore as Finance Manager
UPDATE departments SET manager_id = 11 WHERE department_id = 4; -- Elizabeth Thomas as Marketing Director
UPDATE departments SET manager_id = 14 WHERE department_id = 5; -- Joseph Harris as Operations Manager
UPDATE departments SET manager_id = 17 WHERE department_id = 6; -- Dorothy Garcia as R&D Director
UPDATE departments SET manager_id = 20 WHERE department_id = 7; -- Daniel Clark as Sales Manager

-- Update employee managers
UPDATE employees SET manager_id = 1 WHERE employee_id IN (2, 3);                -- HR employees report to John Smith
UPDATE employees SET manager_id = 4 WHERE employee_id IN (5, 6, 7);             -- IT employees report to David Brown
UPDATE employees SET manager_id = 8 WHERE employee_id IN (9, 10);               -- Finance employees report to James Moore
UPDATE employees SET manager_id = 11 WHERE employee_id IN (12, 13);             -- Marketing employees report to Elizabeth Thomas
UPDATE employees SET manager_id = 14 WHERE employee_id IN (15, 16);             -- Operations employees report to Joseph Harris
UPDATE employees SET manager_id = 17 WHERE employee_id IN (18, 19);             -- R&D employees report to Dorothy Garcia
UPDATE employees SET manager_id = 20 WHERE employee_id IN (21, 22, 23);         -- Sales employees report to Daniel Clark

-- Insert Leave Types
INSERT INTO leave_types (leave_type_name, description, default_days) VALUES
('Annual Leave', 'Regular vacation time', 20),
('Sick Leave', 'Leave due to illness or medical appointments', 10),
('Personal Leave', 'Leave for personal matters', 5),
('Maternity Leave', 'Leave for childbirth and infant care', 90),
('Paternity Leave', 'Leave for fathers after childbirth', 14),
('Bereavement Leave', 'Leave due to death of family member', 5),
('Unpaid Leave', 'Leave without pay', NULL);

-- Insert Attendance Records (for the last week)
INSERT INTO attendance (employee_id, attendance_date, time_in, time_out, status) VALUES
-- Monday
(1, date('now', '-7 days'), datetime('now', '-7 days', '08:55'), datetime('now', '-7 days', '17:05'), 'Present'),
(2, date('now', '-7 days'), datetime('now', '-7 days', '09:10'), datetime('now', '-7 days', '17:15'), 'Present'),
(3, date('now', '-7 days'), datetime('now', '-7 days', '08:50'), datetime('now', '-7 days', '17:00'), 'Present'),
(4, date('now', '-7 days'), datetime('now', '-7 days', '08:45'), datetime('now', '-7 days', '18:30'), 'Present'),
(5, date('now', '-7 days'), datetime('now', '-7 days', '09:20'), datetime('now', '-7 days', '17:45'), 'Late'),
-- Tuesday
(1, date('now', '-6 days'), datetime('now', '-6 days', '08:50'), datetime('now', '-6 days', '17:10'), 'Present'),
(2, date('now', '-6 days'), datetime('now', '-6 days', '09:05'), datetime('now', '-6 days', '17:00'), 'Present'),
(3, date('now', '-6 days'), NULL, NULL, 'Absent'),
(4, date('now', '-6 days'), datetime('now', '-6 days', '08:55'), datetime('now', '-6 days', '18:15'), 'Present'),
(5, date('now', '-6 days'), datetime('now', '-6 days', '08:50'), datetime('now', '-6 days', '17:30'), 'Present'),
-- Wednesday
(1, date('now', '-5 days'), datetime('now', '-5 days', '08:45'), datetime('now', '-5 days', '17:00'), 'Present'),
(2, date('now', '-5 days'), datetime('now', '-5 days', '09:00'), datetime('now', '-5 days', '17:05'), 'Present'),
(3, date('now', '-5 days'), datetime('now', '-5 days', '08:55'), datetime('now', '-5 days', '17:10'), 'Present'),
(4, date('now', '-5 days'), datetime('now', '-5 days', '08:50'), datetime('now', '-5 days', '18:00'), 'Present'),
(5, date('now', '-5 days'), datetime('now', '-5 days', '09:15'), datetime('now', '-5 days', '13:30'), 'Half-day'),
-- Thursday
(1, date('now', '-4 days'), datetime('now', '-4 days', '08:55'), datetime('now', '-4 days', '17:15'), 'Present'),
(2, date('now', '-4 days'), datetime('now', '-4 days', '09:05'), datetime('now', '-4 days', '17:10'), 'Present'),
(3, date('now', '-4 days'), datetime('now', '-4 days', '08:50'), datetime('now', '-4 days', '17:05'), 'Present'),
(4, date('now', '-4 days'), datetime('now', '-4 days', '08:45'), datetime('now', '-4 days', '18:30'), 'Present'),
(5, date('now', '-4 days'), datetime('now', '-4 days', '08:50'), datetime('now', '-4 days', '17:00'), 'Present'),
-- Friday
(1, date('now', '-3 days'), datetime('now', '-3 days', '08:50'), datetime('now', '-3 days', '17:00'), 'Present'),
(2, date('now', '-3 days'), datetime('now', '-3 days', '09:30'), datetime('now', '-3 days', '17:15'), 'Late'),
(3, date('now', '-3 days'), datetime('now', '-3 days', '08:55'), datetime('now', '-3 days', '16:30'), 'Present'),
(4, date('now', '-3 days'), datetime('now', '-3 days', '08:45'), datetime('now', '-3 days', '17:45'), 'Present'),
(5, date('now', '-3 days'), datetime('now', '-3 days', '08:50'), datetime('now', '-3 days', '17:00'), 'Present');

-- Insert Leave Requests
INSERT INTO leave_requests (employee_id, leave_type_id, start_date, end_date, total_days, reason, status, approved_by) VALUES
(2, 1, date('now', '+10 days'), date('now', '+14 days'), 5, 'Family vacation', 'Approved', 1),
(5, 2, date('now', '-10 days'), date('now', '-8 days'), 3, 'Flu', 'Approved', 4),
(9, 1, date('now', '+20 days'), date('now', '+24 days'), 5, 'Personal trip', 'Pending', NULL),
(12, 3, date('now', '+5 days'), date('now', '+5 days'), 1, 'Personal matters', 'Approved', 11),
(15, 2, date('now', '-5 days'), date('now', '-4 days'), 2, 'Medical appointment', 'Approved', 14),
(18, 1, date('now', '+30 days'), date('now', '+40 days'), 11, 'Extended vacation', 'Pending', NULL),
(21, 6, date('now', '-15 days'), date('now', '-13 days'), 3, 'Family emergency', 'Approved', 20);

-- Insert Performance Reviews
INSERT INTO performance_reviews (employee_id, reviewer_id, review_date, performance_score, comments, goals, status) VALUES
(2, 1, date('now', '-180 days'), 4.2, 'Sarah has been performing exceptionally well in her role. She consistently meets deadlines and produces high-quality work.', 'Work on leadership skills and take on more complex projects', 'Completed'),
(3, 1, date('now', '-180 days'), 3.8, 'Michael is a reliable team member who consistently meets expectations.', 'Improve communication skills and technical knowledge', 'Completed'),
(5, 4, date('now', '-90 days'), 4.5, 'Jennifer is an outstanding software engineer who consistently delivers high-quality code ahead of schedule.', 'Take on more mentoring responsibilities and explore new technologies', 'Completed'),
(6, 4, date('now', '-90 days'), 3.5, 'Robert meets expectations but needs to improve documentation practices.', 'Improve code documentation and increase test coverage', 'Completed'),
(9, 8, date('now', '-120 days'), 4.0, 'Patricia is a valuable team member with strong analytical skills.', 'Develop more advanced financial modeling skills', 'Completed'),
(12, 11, date('now', '-150 days'), 3.7, 'Charles has good creative ideas but sometimes struggles with deadlines.', 'Improve time management and project planning', 'Completed'),
(15, 14, date('now', '-60 days'), 4.3, 'Margaret consistently exceeds expectations in her role.', 'Develop leadership skills and take on more complex analysis', 'Completed'),
(18, 17, date('now', '-30 days'), 4.7, 'Christopher is an exceptional researcher who has contributed significantly to several key projects.', 'Lead a major research initiative in the coming year', 'Completed'),
(21, 20, date('now', '-45 days'), 4.1, 'Karen is a strong performer who consistently meets sales targets.', 'Focus on developing larger accounts and improving closing rates', 'Completed');

-- Insert Training Programs
INSERT INTO training_programs (program_name, description, start_date, end_date, trainer, location) VALUES
('Leadership Development', 'Program designed to develop leadership skills for managers and potential managers', date('now', '+30 days'), date('now', '+60 days'), 'External Consultant', 'Conference Room A'),
('Technical Skills Workshop', 'Workshop focusing on the latest technologies and programming languages', date('now', '+15 days'), date('now', '+17 days'), 'IT Director', 'Training Lab'),
('Customer Service Excellence', 'Training program for improving customer service skills', date('now', '+45 days'), date('now', '+46 days'), 'HR Manager', 'Conference Room B'),
('Financial Management', 'Course on financial management principles for non-finance employees', date('now', '+60 days'), date('now', '+62 days'), 'Finance Manager', 'Conference Room C'),
('Project Management Fundamentals', 'Introduction to project management methodologies and best practices', date('now', '-30 days'), date('now', '-28 days'), 'Operations Manager', 'Training Lab');

-- Insert Employee Training
INSERT INTO employee_training (employee_id, program_id, status, completion_date, certification) VALUES
(1, 1, 'Enrolled', NULL, NULL),
(4, 1, 'Enrolled', NULL, NULL),
(8, 1, 'Enrolled', NULL, NULL),
(11, 1, 'Enrolled', NULL, NULL),
(5, 2, 'Enrolled', NULL, NULL),
(6, 2, 'Enrolled', NULL, NULL),
(7, 2, 'Enrolled', NULL, NULL),
(21, 3, 'Enrolled', NULL, NULL),
(22, 3, 'Enrolled', NULL, NULL),
(23, 3, 'Enrolled', NULL, NULL),
(9, 4, 'Enrolled', NULL, NULL),
(10, 4, 'Enrolled', NULL, NULL),
(15, 5, 'Completed', date('now', '-28 days'), 'Project Management Basics Certificate'),
(16, 5, 'Completed', date('now', '-28 days'), 'Project Management Basics Certificate');

-- Insert Payroll Records
INSERT INTO payroll (employee_id, pay_period_start, pay_period_end, basic_salary, overtime_pay, bonuses, deductions, tax, net_pay, payment_date, payment_method, status) VALUES
-- Last month payroll
(1, date('now', 'start of month', '-1 month'), date('now', 'start of month', '-1 day'), 7083.33, 0, 0, 708.33, 1416.67, 4958.33, date('now', '-15 days'), 'Direct Deposit', 'Paid'),
(2, date('now', 'start of month', '-1 month'), date('now', 'start of month', '-1 day'), 4583.33, 0, 0, 458.33, 916.67, 3208.33, date('now', '-15 days'), 'Direct Deposit', 'Paid'),
(3, date('now', 'start of month', '-1 month'), date('now', 'start of month', '-1 day'), 4333.33, 200, 0, 433.33, 866.67, 3233.33, date('now', '-15 days'), 'Direct Deposit', 'Paid'),
(4, date('now', 'start of month', '-1 month'), date('now', 'start of month', '-1 day'), 9166.67, 0, 1000, 916.67, 1833.33, 7416.67, date('now', '-15 days'), 'Direct Deposit', 'Paid'),
(5, date('now', 'start of month', '-1 month'), date('now', 'start of month', '-1 day'), 7083.33, 350, 0, 708.33, 1416.67, 5308.33, date('now', '-15 days'), 'Direct Deposit', 'Paid'),
-- Current month payroll (pending)
(1, date('now', 'start of month'), date('now', '+14 days'), 7083.33, 0, 500, 708.33, 1416.67, 5458.33, date('now', '+15 days'), 'Direct Deposit', 'Pending'),
(2, date('now', 'start of month'), date('now', '+14 days'), 4583.33, 0, 0, 458.33, 916.67, 3208.33, date('now', '+15 days'), 'Direct Deposit', 'Pending'),
(3, date('now', 'start of month'), date('now', '+14 days'), 4333.33, 0, 0, 433.33, 866.67, 3033.33, date('now', '+15 days'), 'Direct Deposit', 'Pending'),
(4, date('now', 'start of month'), date('now', '+14 days'), 9166.67, 0, 0, 916.67, 1833.33, 6416.67, date('now', '+15 days'), 'Direct Deposit', 'Pending'),
(5, date('now', 'start of month'), date('now', '+14 days'), 7083.33, 0, 0, 708.33, 1416.67, 4958.33, date('now', '+15 days'), 'Direct Deposit', 'Pending');
