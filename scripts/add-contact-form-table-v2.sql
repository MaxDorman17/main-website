-- Create contact form submissions table (Version 2)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    service_interest VARCHAR(255),
    message TEXT NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    budget_range VARCHAR(100),
    timeline VARCHAR(100),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_is_read ON contact_submissions(is_read);

-- Verify the table was created successfully
SELECT 'Contact form table created successfully!' as status;
SELECT COUNT(*) as record_count FROM contact_submissions;

-- Show table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'contact_submissions'
ORDER BY ordinal_position;
