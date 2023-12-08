import pkg from 'pg';
import { config } from "dotenv";
import { request } from 'express';
import { queryInsertTransformation, queryDatabaseFunction } from '../helpers/query.js';

config();

const insert_data_into = {
    user_information: "user_information (user_id, user_name, user_password, email, address, first_name, last_name, birthday, sex, description, country, account_type)",
    department: "department (department_id, email, address, description, department_name)",
    student: "student (user_id, department_id, student_status, student_class, student_degree, student_program, student_major)",
    administrator: "administrator (user_id, department_id)",
    lecturer: "lecturer (user_id, department_id, lecturer_degree, lecturer_specialty)",
    ticket: "ticket (ticket_id, ticket_type, created_at, process_at, description, status, user_id, admin_id)",
    question: "question (question_id, question_content, created_at, answer_date, course_id, student_id, lecturer_id)",
    answer: "answer (answer_id, answer_date, answer_content, question_id)",
    admin_manages_department: "admin_manages_department (admin_id, department_id)",
    course: "course (course_id, course_name, course_description, lecturer_id, modified_at)",
    admin_manages_course: "admin_manages_course (admin_id, course_id)",
    student_takes_course: "student_takes_course (student_id, course_id, date_of_enrollment)",
    lecture: "lecture (lecture_id, course_id, lecture_name, lecture_content)",
    lecture_document: "lecture_document (document_id, lecture_id, course_id, author, title, subject)",
    attempt: "attempt (quiz_id, lecture_id, course_id, student_id, attempt_detail_id)",
    attempt_detail: "attempt_detail (attempt_detail_id, created_at)",
    attempt_answer: "attempt_answer (attempt_answer_id, answer_content, attempt_detail_id)",
    quiz: "quiz (quiz_id, lecture_id, course_id, description, title)",
    quiz_question: "quiz_question (quiz_question_id, title, description, max_point, quiz_question_type, attempt_detail_id, quiz_id, lecture_id, course_id)",
    short_answer: "short_answer (quiz_question_id)",
    correct_answer: "correct_answer (correct_answer, quiz_question_id)",
    multiple_choice: "multiple_choice (quiz_question_id)",
    multiple_choice_answer: "multiple_choice_answer (multiple_choice_answer, quiz_question_id, is_correct)"
}

export const queryDatabase = async (req, res) => {
    const { Pool } = pkg;
    const pool = new Pool({
        connectionString: 'postgresql://knguyenkieubao:0nV1SrXbdsLx@ep-blue-grass-95062190-pooler.ap-southeast-1.aws.neon.tech/staging_env_db?sslmode=require'
    });
    const client = await pool.connect();
    try {
        const response = await client.query(req.body.query);
        // console.log(response);
        res.send(response.rows);
        return response.rows;
    } catch (error) {
        // console.log(error);
        res.send({
            error
        });
        return error;
    } finally {
        client.release();
    }
};

export const insertData = async (req, res) => {
    let query = "INSERT INTO ";
    const query_value = " VALUES (";
    switch (req.body.query) {
        default: console.log("insertData func: req: ", req);
        case "user_information":
            try {
                query += insert_data_into.user_information + query_value;
                query = await queryInsertTransformation(query, req.body);
                let response = await queryDatabaseFunction(query);
                console.log(response);
                res.send(response);
            } catch (e) {
                console.log(e);
                res.status(400);
                res.send(e.stack);
            }
        case "department":
            try {
                query += insert_data_into.department + query_value;
                query = await queryInsertTransformation(query, req.body);
                let response = await queryDatabaseFunction(query);
                console.log(response);
                res.send(response);
            } catch (e) {
                console.log(e);
                res.status(400);
                res.send(e.stack);
            }
    }
}
