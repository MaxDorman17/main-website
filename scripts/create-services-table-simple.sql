-- Simple services table creation
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price_from DECIMAL(10,2),
    price_type VARCHAR(50) DEFAULT 'from',
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test if table was created
SELECT 'Services table created!' as result;
