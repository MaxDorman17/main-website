-- Create profile picture table manually
CREATE TABLE IF NOT EXISTS profile_picture (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255) DEFAULT 'Profile Picture',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Check if table was created successfully
SELECT 'Profile picture table created successfully!' as status;

-- Show table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'profile_picture'
ORDER BY ordinal_position;
