-- Simple services table creation script
DROP TABLE IF EXISTS services;

CREATE TABLE services (
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

-- Insert services one by one
INSERT INTO services (title, description, features, price_from, price_type, is_featured, display_order, icon_name) VALUES
('Excel Development & Automation', 'Custom Excel solutions to streamline your business processes and boost productivity.', ARRAY['Custom formulas and functions', 'Data analysis and reporting', 'Automated workflows', 'Dashboard creation', 'VBA programming', 'Data validation and cleanup'], 50.00, 'from', true, 1, 'FileSpreadsheet');

INSERT INTO services (title, description, features, price_from, price_type, is_featured, display_order, icon_name) VALUES
('Logo Design & Branding', 'Professional logo design that captures your brand identity and makes a lasting impression.', ARRAY['Custom logo design', 'Multiple concept variations', 'High-resolution files', 'Vector formats (SVG, AI)', 'Brand color palette', 'Usage guidelines'], 75.00, 'from', true, 2, 'Palette');

INSERT INTO services (title, description, features, price_from, price_type, is_featured, display_order, icon_name) VALUES
('Microsoft Office Consulting', 'Expert guidance to optimize your Microsoft Office workflows and increase team efficiency.', ARRAY['Workflow optimization', 'Template creation', 'Training and support', 'Integration solutions', 'Best practices guidance', 'Troubleshooting'], 40.00, 'hourly', false, 3, 'Settings');

INSERT INTO services (title, description, features, price_from, price_type, is_featured, display_order, icon_name) VALUES
('Technology Consulting', 'Strategic technology advice to help your business leverage digital solutions effectively.', ARRAY['Technology assessment', 'Digital transformation planning', 'Software recommendations', 'Process improvement', 'Training and implementation', 'Ongoing support'], 60.00, 'hourly', false, 4, 'Lightbulb');

-- Verify creation
SELECT 'Services table created successfully!' as message;
SELECT COUNT(*) as total_services FROM services;
