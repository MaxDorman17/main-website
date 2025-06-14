-- Create hero content table for homepage hero section (Version 2)
CREATE TABLE IF NOT EXISTS hero_content (
    id SERIAL PRIMARY KEY,
    tagline VARCHAR(255) DEFAULT 'Technology Consultant & Microsoft Specialist',
    subtitle TEXT DEFAULT 'Delivering professional Microsoft solutions and digital services from Fife, Scotland',
    description TEXT DEFAULT 'Specializing in Excel development, logo design, and Microsoft Office consulting to help businesses streamline their operations and achieve their goals.',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default hero content if table is empty
INSERT INTO hero_content (tagline, subtitle, description) 
SELECT 
    'Technology Consultant & Microsoft Specialist',
    'Delivering professional Microsoft solutions and digital services from Fife, Scotland',
    'Specializing in Excel development, logo design, and Microsoft Office consulting to help businesses streamline their operations and achieve their goals.'
WHERE NOT EXISTS (SELECT 1 FROM hero_content);

-- Verify the table was created and populated
SELECT 'Hero content table created successfully!' as status;
SELECT COUNT(*) as record_count FROM hero_content;
SELECT * FROM hero_content LIMIT 1;
