-- Test if services table exists and show contents
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'services') 
        THEN 'Services table EXISTS' 
        ELSE 'Services table MISSING' 
    END as table_status;

-- Show all services if table exists
SELECT id, title, price_from, is_featured 
FROM services 
ORDER BY display_order 
LIMIT 10;
