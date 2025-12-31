import { Pool } from 'pg';
import { env } from './env';

// Create a connection pool to Neon PostgreSQL
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000, // 20 seconds - Neon databases need time to wake from sleep
  statement_timeout: 30000, // 30 seconds for query execution
});

// Handle pool errors gracefully
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client:', err);
  // Don't exit the process - let the pool handle reconnection
});

export default pool;

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

// Export the pool for direct access if needed
export { pool };
