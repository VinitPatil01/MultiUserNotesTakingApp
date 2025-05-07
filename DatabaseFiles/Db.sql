create database notes_app;

use notes_app;

/*user table */
create table student(
prn CHAR(12) PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
email VARCHAR(30) UNIQUE NOT NULL,
username VARCHAR(30) UNIQUE NOT NULL,
password VARCHAR(30) NOT NULL,
mobile_number CHAR(12) NOT NULL,
gender VARCHAR(10) NOT NULL,
course VARCHAR(10) NOT NULL,
center VARCHAR(30) NOT NULL,
A1 INT,
A2 INT,
A3 INT,
A4 VARCHAR(20),
A5 VARCHAR(20),
A6 VARCHAR(20),
A7 CHAR(20),
A8 CHAR(20),
A9 FLOAT,
A10 DATETIME
);


create table notes(
note_id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(50) NOT NULL,
type VARCHAR(20) NOT NULL,
text VARCHAR(2000) NOT NULL,
pdf_url VARCHAR(100),
created_by CHAR(12) NOT NULL,
created_at DATETIME NOT NULL,
category_id INT,
A1 INT,
A2 INT,
A3 INT,
A4 VARCHAR(20),
A5 VARCHAR(20),
A6 VARCHAR(20),
A7 CHAR(20),
A8 CHAR(20),
A9 FLOAT,
A10 DATETIME,
CONSTRAINT FK_PRN FOREIGN KEY (created_by) REFERENCES student(prn),
CONSTRAINT FK_NoteId FOREIGN KEY (category_id) REFERENCES categories(category_id)
) AUTO_INCREMENT = 1001;


create table categories(
category_id int primary key AUTO_INCREMENT,
category_name varchar(30) not null,
A1 INT,
A2 INT,
A3 INT,
A4 VARCHAR(20),
A5 VARCHAR(20),
A6 VARCHAR(20),
A7 CHAR(20),
A8 CHAR(20),
A9 FLOAT,
A10 DATETIME
) AUTO_INCREMENT=2001;

create table `groups`(
group_id int primary key AUTO_INCREMENT,
group_name varchar(30),
A1 INT,
A2 INT,
A3 INT,
A4 VARCHAR(20),
A5 VARCHAR(20),
A6 VARCHAR(20),
A7 CHAR(20),
A8 CHAR(20),
A9 FLOAT,
A10 DATETIME
) AUTO_INCREMENT=3001;

create table roles(
role_id int primary key AUTO_INCREMENT,
role_name varchar(30),
A1 INT,
A2 INT,
A3 INT,
A4 VARCHAR(20),
A5 VARCHAR(20),
A6 VARCHAR(20),
A7 CHAR(20),
A8 CHAR(20),
A9 FLOAT,
A10 DATETIME
) AUTO_INCREMENT=4001;


create table UserGroups(
student_prn char(12),
group_id int,
role_id int,
A1 INT,
A2 INT,
A3 INT,
A4 VARCHAR(20),
A5 VARCHAR(20),
A6 VARCHAR(20),
A7 CHAR(20),
A8 CHAR(20),
A9 FLOAT,
A10 DATETIME,
FOREIGN KEY(student_prn) REFERENCES student(prn),
FOREIGN KEY(group_id) REFERENCES `groups`(group_id),
FOREIGN KEY(role_id) REFERENCES roles(role_id),
PRIMARY KEY (student_prn, group_id)
);


create table NotesGroups(
note_id int,
group_id int,
A1 INT,
A2 INT,
A3 INT,
A4 VARCHAR(20),
A5 VARCHAR(20),
A6 VARCHAR(20),
A7 CHAR(20),
A8 CHAR(20),
A9 FLOAT,
A10 DATETIME,
foreign key(note_id) references notes(note_id),
foreign key(group_id) references `groups`(group_id),
PRIMARY KEY (note_id, group_id)
);