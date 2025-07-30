'use client'

import { createBrowserClient } from '@supabase/ssr'
import { Database } from '../types/supabase'

export const createClient = () =>
  createBrowserClient<Database>(
    'https://pyvqjtatbyqxnsmhgixw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5dnFqdGF0YnlxeG5zbWhnaXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MjM5NDEsImV4cCI6MjA2OTA5OTk0MX0.zjdNfe3kF_ZtdlJHfcE1guYbQd5EXeOfqlo6YC0cg8M'
  )
