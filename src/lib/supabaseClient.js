import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://umaxgaoirfxyahuherfa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtYXhnYW9pcmZ4eWFodWhlcmZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NDAzMzEsImV4cCI6MjA4ODExNjMzMX0._lsO_RTXxxTvwNPw2F1Rrq0vM87HL6D2KgqMcVMSbn4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
