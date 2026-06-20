import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read .env file manually since dotenv might not be installed for node script execution
const envFile = fs.readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1]] = match[2].trim();
  }
});

const supabaseUrl = envVars['VITE_SUPABASE_URL'];
const supabaseAnonKey = envVars['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log("Testing connection to Supabase via REST API...");
  try {
    // Try to select from tool_feedback
    const { data, error } = await supabase.from('tool_feedback').select('*').limit(1);
    
    if (error) {
      console.error("Connection successful, but error accessing table (maybe schema.sql wasn't run?):", error.message);
    } else {
      console.log("Success! Connection is working and the 'tool_feedback' table exists.");
      console.log("Data returned:", data);
    }
  } catch (err) {
    console.error("Failed to connect:", err.message);
  }
}

testConnection();
