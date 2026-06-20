const { Client } = require('pg');
const fs = require('fs');

const connectionString = 'postgresql://postgres:[HesoyaM12009__]@db.mdpuezlydlijbxeooqwq.supabase.co:5432/postgres';

const client = new Client({
  connectionString,
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to database.');
    const schema = fs.readFileSync('./supabase/schema.sql', 'utf8');
    await client.query(schema);
    console.log('Schema executed successfully.');
  } catch (err) {
    console.error('Error executing schema:', err);
  } finally {
    await client.end();
  }
}

run();
