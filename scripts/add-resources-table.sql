-- Add resources table
CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'Other',
    is_free BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);

-- Insert some sample resources
INSERT INTO resources (title, description, url, category, is_free) VALUES 
(
    'Microsoft Learn',
    'Free online learning platform for Microsoft technologies',
    'https://learn.microsoft.com',
    'Learning',
    true
),
(
    'Azure Documentation',
    'Official Microsoft Azure documentation and guides',
    'https://docs.microsoft.com/en-us/azure/',
    'Documentation',
    true
),
(
    'Visual Studio Code',
    'Free source-code editor made by Microsoft',
    'https://code.visualstudio.com/',
    'Tools',
    true
),
(
    'Microsoft 365 Developer Program',
    'Free Microsoft 365 developer subscription',
    'https://developer.microsoft.com/en-us/microsoft-365/dev-program',
    'Learning',
    true
),
(
    'Azure Portal',
    'Web-based application for managing Azure resources',
    'https://portal.azure.com',
    'Tools',
    true
),
(
    'Microsoft Tech Community',
    'Community hub for Microsoft technologies',
    'https://techcommunity.microsoft.com/',
    'Websites',
    true
),
(
    'Channel 9',
    'Microsoft developer videos and content',
    'https://channel9.msdn.com/',
    'Videos',
    true
),
(
    'PowerShell Documentation',
    'Official PowerShell documentation',
    'https://docs.microsoft.com/en-us/powershell/',
    'Documentation',
    true
);
