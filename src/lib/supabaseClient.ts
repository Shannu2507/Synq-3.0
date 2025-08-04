import { createClient } from '@supabase/supabase-js'

// Your Supabase project URL and anon key
const supabaseUrl = 'https://qqhihokobnhzzkzogzmm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxaGlob2tvYm5oenprem9nem1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwMjA3NzIsImV4cCI6MjAyNzU5Njc3Mn0.gG6ajTfU1tRhRx5Q5K8AG_PgbDdPB5pL5Pj7gWpbEQI'

// Create a single supabase client for your app
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
