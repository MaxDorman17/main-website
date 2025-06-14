-- Test database connection
SELECT 'Database connection working!' as status, NOW() as current_time;

-- Show existing tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
