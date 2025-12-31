import { Pool } from 'pg';

// Hardcode the database URL for initialization
// Replace this with your actual DATABASE_URL from .env
const DATABASE_URL = 'postgresql://neondb_owner:npg_pBNIF19mJfPK@ep-sweet-forest-a1gzvf9u-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initializeDatabase() {
  try {
    console.log('Connecting to Neon database...');

    // Test connection
    const client = await pool.connect();
    console.log('✓ Connected to database');

    // Enable UUID extension
    console.log('\nEnabling UUID extension...');
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    console.log('✓ UUID extension enabled');

    // Create search_history table
    console.log('\nCreating search_history table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS search_history (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id VARCHAR(255) NOT NULL,
        query TEXT NOT NULL,
        location VARCHAR(500) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ search_history table created');

    // Create indexes for search_history
    console.log('\nCreating indexes for search_history...');
    await client.query('CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_search_history_created_at ON search_history(created_at DESC)');
    console.log('✓ Indexes created');

    // Create bookmarks table
    console.log('\nCreating bookmarks table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        query TEXT NOT NULL,
        location VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ bookmarks table created');

    // Create indexes for bookmarks
    console.log('\nCreating indexes for bookmarks...');
    await client.query('CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_bookmarks_created_at ON bookmarks(created_at DESC)');
    console.log('✓ Indexes created');

    // Verify tables
    console.log('\nVerifying tables...');
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('search_history', 'bookmarks')
    `);
    console.log('✓ Tables verified:', result.rows.map(r => r.table_name).join(', '));

    client.release();
    console.log('\n✓ Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
