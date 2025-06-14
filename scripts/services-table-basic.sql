-- Create services table (basic version)
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert one test service
INSERT INTO services (title, description) 
VALUES ('Excel Development', 'Custom Excel solutions for your business')
ON CONFLICT DO NOTHING;

-- Verify
SELECT COUNT(*) as services_count FROM services;
