import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://rqlwhlcsinqrleeruflj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxbHdobGNzaW5xcmxlZXJ1ZmxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ0Mzk3NDQsImV4cCI6MTk5MDAxNTc0NH0.K7JW4hmyx4QOfkoLHW47EfbYd8zUUuOsjiN-zQY0igc');