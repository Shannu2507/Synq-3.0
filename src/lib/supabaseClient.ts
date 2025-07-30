import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://cdlbntbjvntvmidouydu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbGJudGJqdm50dm1pZG91eWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwMDU1NDUsImV4cCI6MjAzNzU4MTU0NX0.Rp3BGUe1TEfYHqucUpxqYosjkHyP8VcbgcYjB8NjVbQ'
)
