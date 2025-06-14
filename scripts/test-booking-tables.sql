-- Test if the booking tables were created successfully
SELECT 'availability table' as table_name, COUNT(*) as row_count FROM availability
UNION ALL
SELECT 'bookings table' as table_name, COUNT(*) as row_count FROM bookings;

-- Show the availability schedule
SELECT 
  CASE day_of_week
    WHEN 0 THEN 'Sunday'
    WHEN 1 THEN 'Monday'
    WHEN 2 THEN 'Tuesday'
    WHEN 3 THEN 'Wednesday'
    WHEN 4 THEN 'Thursday'
    WHEN 5 THEN 'Friday'
    WHEN 6 THEN 'Saturday'
  END as day_name,
  start_time,
  end_time,
  is_active
FROM availability
ORDER BY day_of_week;
