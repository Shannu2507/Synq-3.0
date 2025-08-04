import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pyvqjtatbyqxnsmhgixw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5dnFqdGF0YnlxeG5zbWhnaXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MjM5NDEsImV4cCI6MjA2OTA5OTk0MX0.zjdNfe3kF_ZtdlJHfcE1guYbQd5EXeOfqlo6YC0cg8M'

// Exporting directly for easy import
const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)
export default supabase

// Optional: export factory function if needed
export const createClient = () =>
  createSupabaseClient(supabaseUrl, supabaseAnonKey)
