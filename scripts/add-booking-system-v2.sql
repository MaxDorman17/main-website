-- Drop existing tables if they exist to avoid conflicts
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS availability;

-- Create availability table for admin to set available time slots
CREATE TABLE availability (
  id SERIAL PRIMARY KEY,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table for client requests
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  service_type VARCHAR(255) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default availability (Monday-Friday, 9 AM - 5 PM)
INSERT INTO availability (day_of_week, start_time, end_time) VALUES
(1, '09:00:00', '17:00:00'),
(2, '09:00:00', '17:00:00'),
(3, '09:00:00', '17:00:00'),
(4, '09:00:00', '17:00:00'),
(5, '09:00:00', '17:00:00');

-- Create indexes for better performance
CREATE INDEX idx_bookings_date_time ON bookings(booking_date, booking_time);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_availability_day ON availability(day_of_week, is_active);
