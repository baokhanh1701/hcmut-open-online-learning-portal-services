import pkg from 'pg';
import { config } from "dotenv";
config();

export const queryDatabaseFunction = async (query) => {
    const { Pool } = pkg;
    const pool = new Pool({
        connectionString: 'postgresql://knguyenkieubao:0nV1SrXbdsLx@ep-blue-grass-95062190-pooler.ap-southeast-1.aws.neon.tech/staging_env_db?sslmode=require'
    });
    const client = await pool.connect();
    try {
        const response = await client.query(query);
        // console.log(response);
        return response.rows;
    } catch (error) {
        console.log("Query database failed: Error:", error);
        throw new Error(error);
    } finally {
        client.release();
    }
}

export const queryInsertTransformation = async (query, req_body) => {
    let requested_values = Object.values(req_body);

    requested_values.forEach((element, index) => {
        requested_values[index] = "\'" + element + "\'";
    });
    let requested_values_string = requested_values.join(',');
    let return_query = query + requested_values_string + ")";

    return return_query;
}