-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-------------------------------------------------------------------------------
-- 1. TABLES
-------------------------------------------------------------------------------

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT,
    full_description TEXT,
    problem_statement TEXT,
    objective TEXT,
    features TEXT[],
    tech_stack TEXT[],
    github_url VARCHAR(255),
    live_demo VARCHAR(255),
    thumbnail VARCHAR(512),
    gallery_images TEXT[],
    architecture_image VARCHAR(512),
    category VARCHAR(100),
    status VARCHAR(100) DEFAULT 'Completed',
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    team_size INTEGER DEFAULT 1,
    my_role VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    credential_id VARCHAR(255),
    credential_url VARCHAR(512),
    certificate_image VARCHAR(512),
    featured BOOLEAN DEFAULT false,
    tags TEXT[],
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Leadership Table
CREATE TABLE IF NOT EXISTS leadership (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL implies "Present"
    description TEXT,
    logo VARCHAR(512),
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Events / Hackathons Table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- e.g., 'Hackathon', 'Conference'
    organizer VARCHAR(255),
    role VARCHAR(255),
    date DATE NOT NULL,
    description TEXT,
    certificate VARCHAR(512),
    images TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(512), -- URL to image or SVG/FontAwesome class string
    category VARCHAR(100) NOT NULL, -- e.g., 'Language', 'Backend'
    display_order INTEGER DEFAULT 0,
    proficiency INTEGER, -- 1 to 100
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Profile (Personal Info & Socials) Table
-- This is meant to be a singleton table (only 1 row)
CREATE TABLE IF NOT EXISTS profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    bio_short TEXT,
    bio_long TEXT,
    email VARCHAR(255),
    location VARCHAR(255),
    resume_url VARCHAR(512),
    social_github VARCHAR(255),
    social_linkedin VARCHAR(255),
    social_twitter VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Experience / Education Table
CREATE TABLE IF NOT EXISTS experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(100) NOT NULL, -- 'Experience' or 'Education'
    institution VARCHAR(255) NOT NULL,
    role_degree VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    location VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-------------------------------------------------------------------------------
-- 2. ROW LEVEL SECURITY (RLS)
-------------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- Create Policies for READ access (Publicly accessible)
CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read on certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read on leadership" ON leadership FOR SELECT USING (true);
CREATE POLICY "Allow public read on events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read on skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read on profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Allow public read on experience" ON experience FOR SELECT USING (true);

-- Create Policies for WRITE access (Authenticated Admin only)
CREATE POLICY "Allow admin write on projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write on certificates" ON certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write on leadership" ON leadership FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write on events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write on skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write on profile" ON profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write on experience" ON experience FOR ALL USING (auth.role() = 'authenticated');

-------------------------------------------------------------------------------
-- 3. TRIGGERS
-------------------------------------------------------------------------------

-- Function to automatically update 'updated_at' columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to relevant tables
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
