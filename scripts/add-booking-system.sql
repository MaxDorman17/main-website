-- Create availability table for admin to set available time slots
CREATE TABLE IF NOT EXISTS availability (
  id SERIAL PRIMARY KEY,
  day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table for client requests
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  service_type VARCHAR(255) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some default availability (Monday-Friday, 9 AM - 5 PM)
INSERT INTO availability (day_of_week, start_time, end_time) VALUES
(1, '09:00', '17:00'), -- Monday
(2, '09:00', '17:00'), -- Tuesday
(3, '09:00', '17:00'), -- Wednesday
(4, '09:00', '17:00'), -- Thursday
(5, '09:00', '17:00'); -- Friday
