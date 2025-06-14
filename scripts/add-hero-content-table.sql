-- Add hero content table for homepage hero section
CREATE TABLE IF NOT EXISTS hero_content (
    id SERIAL PRIMARY KEY,
    tagline VARCHAR(255) DEFAULT 'Technology Consultant & Microsoft Specialist',
    subtitle TEXT DEFAULT 'Delivering professional Microsoft solutions and digital services from Fife, Scotland',
    description TEXT DEFAULT 'Specializing in Excel development, logo design, and Microsoft Office consulting to help businesses streamline their operations and achieve their goals.',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default hero content
INSERT INTO hero_content (tagline, subtitle, description) VALUES (
    'Technology Consultant & Microsoft Specialist',
    'Delivering professional Microsoft solutions and digital services from Fife, Scotland',
    'Specializing in Excel development, logo design, and Microsoft Office consulting to help businesses streamline their operations and achieve their goals.'
) ON CONFLICT DO NOTHING;
