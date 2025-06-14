-- Insert sample data for Max Dorman's website

-- Insert default about me content
INSERT INTO about_me (content) VALUES (
    '<p>I''m Max Dorman, currently diving deep into Microsoft fundamentals and expanding my technical expertise. Based in beautiful Fife, Scotland, I''m passionate about technology and helping others through my skills.</p><p>Whether it''s learning new Microsoft technologies or working on exciting projects, I''m always ready for the next challenge. My journey in technology is driven by curiosity and a desire to create meaningful solutions.</p>'
) ON CONFLICT DO NOTHING;

-- Insert sample blog post
INSERT INTO blog_posts (title, content) VALUES (
    'Welcome to My Digital Journey',
    '<p>Welcome to my personal website! This is where I''ll be sharing my experiences learning Microsoft fundamentals, showcasing my work, and connecting with fellow technology enthusiasts.</p><p>Stay tuned for regular updates on my learning progress, project showcases, and insights from the world of Microsoft technologies.</p>'
);

-- Insert sample MS Learn progress
INSERT INTO ms_learn_progress (course_name, description, progress_percentage, status, modules_completed, total_modules) VALUES 
(
    'Microsoft Azure Fundamentals (AZ-900)',
    'Learn the basics of cloud computing and Microsoft Azure services',
    75,
    'in_progress',
    6,
    8
),
(
    'Microsoft 365 Fundamentals (MS-900)',
    'Understand Microsoft 365 services and concepts',
    100,
    'completed',
    10,
    10
);
