const SUPABASE_URL = "https://fliwgaclwfwtdjnxgdtk.supabase.co/rest/v1/";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsaXdnYWNsd2Z3dGRqbnhnZHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMTE2NjYsImV4cCI6MjA5ODg4NzY2Nn0.Kaec9_RTC7fXIukvTstyikd3qvBt5i0TpoiLw2gqCiI ;"

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
