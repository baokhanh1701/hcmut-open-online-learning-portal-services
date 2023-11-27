import pkg from 'pg';
import { config } from "dotenv";
config();

export const queryDatabase = async (req, res) => {
    const { Pool } = pkg;
    const pool = new Pool({
        connectionString: 'postgresql://knguyenkieubao:0nV1SrXbdsLx@ep-blue-grass-95062190-pooler.ap-southeast-1.aws.neon.tech/hoolp_db?sslmode=require'
    });
    const client = await pool.connect();
    try {
        const response = await client.query(req.body.query);
        console.log(response);
        res.send(response.rows)
    } catch (error) {
        console.log(error);
        res.send({
            error
        })
    } finally {
        client.release();
    }
};