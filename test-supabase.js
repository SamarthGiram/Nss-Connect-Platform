import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, roll_number, "group", department')
    .eq('role', 'student');
    
  console.log('With quotes:', error ? error.message : data.length);
  
  const { data: d2, error: e2 } = await supabase
    .from('profiles')
    .select('id, name, email, roll_number, group, department')
    .eq('role', 'student');
    
  console.log('Without quotes:', e2 ? e2.message : d2.length);
}
test();
