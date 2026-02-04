CREATE DATABASE student_system;

USE student_system;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    dob DATE,
    gender VARCHAR(10),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(15),
    address TEXT,
    qualification VARCHAR(100)
);
