-- Create services table for the services page (Version 2)
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    features TEXT[],
    price_from DECIMAL(10,2),
    price_type VARCHAR(50) DEFAULT 'from',
    currency VARCHAR(3) DEFAULT 'GBP',
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    icon_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default services one by one to avoid array issues
INSERT INTO services (title, description, features, price_from, price_type, is_featured, display_order, icon_name) 
SELECT 
    'Excel Development & Automation',
    'Custom Excel solutions to streamline your business processes and boost productivity.',
    ARRAY['Custom formulas and functions', 'Data analysis and reporting', 'Automated workflows', 'Dashboard creation', 'VBA programming', 'Data validation and cleanup'],
    50.00,
    'from',
    true,
    1,
    'FileSpreadsheet'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Excel Development & Automation');

INSERT INTO services (title, description, features, price_from, price_type, is_featured, display_order, icon_name) 
SELECT 
    'Logo Design & Branding',
    'Professional logo design that captures your brand identity and makes a lasting impression.',
    ARRAY['Custom logo design', 'Multiple concept variations', 'High-resolution files', 'Vector formats (SVG, AI)', 'Brand color palette', 'Usage guidelines'],
    75.00,
    'from',
    true,
    2,
    'Palette'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Logo Design & Branding');

INSERT INTO services (title, description, features, price_from, price_type, is_featured, display_order, icon_name) 
SELECT 
    'Microsoft Office Consulting',
    'Expert guidance to optimize your Microsoft Office workflows and increase team efficiency.',
    ARRAY['Workflow optimization', 'Template creation', 'Training and support', 'Integration solutions', 'Best practices guidance', 'Troubleshooting'],
    40.00,
    'hourly',
    false,
    3,
    'Settings'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Microsoft Office Consulting');

INSERT INTO services (title, description, features, price_from, price_type, is_featured, display_order, icon_name) 
SELECT 
    'Technology Consulting',
    'Strategic technology advice to help your business leverage digital solutions effectively.',
    ARRAY['Technology assessment', 'Digital transformation planning', 'Software recommendations', 'Process improvement', 'Training and implementation', 'Ongoing support'],
    60.00,
    'hourly',
    false,
    4,
    'Lightbulb'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Technology Consulting');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(is_featured);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(display_order);

-- Verify the table was created and populated
SELECT 'Services table created successfully!' as status;
SELECT COUNT(*) as service_count FROM services;
SELECT title, price_from, is_featured FROM services ORDER BY display_order;
