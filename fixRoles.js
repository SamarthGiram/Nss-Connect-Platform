import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://brjbdmxdtaljkvhxtefm.supabase.co';
const supabaseAnon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyamJkbXhkdGFsamt2aHh0ZWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NDYxOTAsImV4cCI6MjA5ODEyMjE5MH0.KNl-VnEJQFT8O0bAIvhW6bHq-N5sixTWhHHzSrK_U8Q';
const supabase = createClient(supabaseUrl, supabaseAnon);

async function fixRoles() {
  const { data: users, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error('Error fetching users:', error);
    return;
  }
  
  console.log('Found', users.length, 'profiles');

  for (const u of users) {
    let newRole = null;
    if (u.name && u.name.toLowerCase().includes('admin')) {
      newRole = 'admin';
    } else if (u.name && u.name.toLowerCase().includes('prof')) {
      newRole = 'professor';
    }
    
    if (newRole && u.role !== newRole) {
      const { error: updErr } = await supabase.from('profiles').update({ role: newRole, status: 'approved' }).eq('id', u.id);
      if (updErr) {
        console.error('Failed to update', u.name, updErr);
      } else {
        console.log('Successfully updated', u.name, 'to', newRole);
      }
    } else if (newRole) {
      console.log('User', u.name, 'is already', newRole);
      // Ensure they are approved anyway
      await supabase.from('profiles').update({ status: 'approved' }).eq('id', u.id);
    }
  }
}

fixRoles();
