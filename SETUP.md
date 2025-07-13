# Volunteer Club Website Setup

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

You can find these values in your Supabase project settings under API settings.

## Database Schema

Here's the comprehensive database schema for your volunteer club website:

### Users Table
```sql
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  nickname TEXT,
  dob DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  student_status TEXT CHECK (student_status IN ('current_student', 'alumni', 'not_student')),
  home_country TEXT,
  university TEXT,
  study_year INTEGER CHECK (study_year >= 1 AND study_year <= 10),
  degree TEXT,
  interest TEXT,
  current_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  role TEXT CHECK (role IN ('member', 'admin')) DEFAULT 'member',
  telephone TEXT,
  igen_club TEXT,
  faculty TEXT,
  major TEXT,
  nationality TEXT,
  religious TEXT,
  current_country TEXT,
  current_city TEXT,
  occupation TEXT,
  profile_image_url TEXT,
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_university ON users(university);
CREATE INDEX idx_users_current_country ON users(current_country);
```

### Activities Table
```sql
CREATE TABLE activities (
  activity_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT CHECK (event_type IN ('camp', 'online', 'one_day', 'workshop', 'seminar', 'conference', 'volunteer', 'other')) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  duration_hours DECIMAL(5,2),
  location TEXT,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')) DEFAULT 'upcoming',
  created_by UUID REFERENCES users(user_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT,
  registration_deadline DATE,
  cost DECIMAL(10,2) DEFAULT 0,
  requirements TEXT,
  is_featured BOOLEAN DEFAULT false
);

-- Create indexes for better performance
CREATE INDEX idx_activities_event_type ON activities(event_type);
CREATE INDEX idx_activities_status ON activities(status);
CREATE INDEX idx_activities_start_date ON activities(start_date);
CREATE INDEX idx_activities_created_by ON activities(created_by);
```

### Activity Participants Table
```sql
CREATE TABLE activity_participants (
  participant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES activities(activity_id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('participant', 'organizer', 'volunteer', 'speaker', 'mentor', 'helper')) DEFAULT 'participant',
  status TEXT CHECK (status IN ('registered', 'confirmed', 'attended', 'cancelled', 'no_show')) DEFAULT 'registered',
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  attended_at TIMESTAMP WITH TIME ZONE,
  score_earned INTEGER DEFAULT 0,
  feedback TEXT,
  notes TEXT,
  UNIQUE(activity_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_activity_participants_activity_id ON activity_participants(activity_id);
CREATE INDEX idx_activity_participants_user_id ON activity_participants(user_id);
CREATE INDEX idx_activity_participants_status ON activity_participants(status);
CREATE INDEX idx_activity_participants_role ON activity_participants(role);
```

### User Logs Table
```sql
CREATE TABLE user_logs (
  log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  action_description TEXT,
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  additional_data JSONB
);

-- Create indexes for better performance
CREATE INDEX idx_user_logs_user_id ON user_logs(user_id);
CREATE INDEX idx_user_logs_action_type ON user_logs(action_type);
CREATE INDEX idx_user_logs_created_at ON user_logs(created_at);
```

### News Table
```sql
CREATE TABLE news (
  news_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  author_id UUID REFERENCES users(user_id),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  tags TEXT[],
  view_count INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX idx_news_author_id ON news(author_id);
CREATE INDEX idx_news_published_at ON news(published_at);
CREATE INDEX idx_news_is_published ON news(is_published);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('unread', 'read', 'replied', 'archived')) DEFAULT 'unread',
  replied_at TIMESTAMP WITH TIME ZONE,
  replied_by UUID REFERENCES users(user_id),
  reply_message TEXT,
  ip_address INET
);

-- Create indexes for better performance
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);
```

### Additional Tables for Enhanced Functionality

### User Scores Table (for tracking points/achievements)
```sql
CREATE TABLE user_scores (
  score_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(activity_id) ON DELETE SET NULL,
  score_type TEXT CHECK (score_type IN ('participation', 'leadership', 'volunteer', 'achievement', 'bonus')) NOT NULL,
  points INTEGER NOT NULL,
  description TEXT,
  awarded_by UUID REFERENCES users(user_id),
  awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_user_scores_user_id ON user_scores(user_id);
CREATE INDEX idx_user_scores_activity_id ON user_scores(activity_id);
CREATE INDEX idx_user_scores_score_type ON user_scores(score_type);
```

### User Skills Table (for tracking member skills)
```sql
CREATE TABLE user_skills (
  skill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')) DEFAULT 'beginner',
  verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES users(user_id),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX idx_user_skills_skill_name ON user_skills(skill_name);
```

### Activity Categories Table (for organizing activities)
```sql
CREATE TABLE activity_categories (
  category_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add category_id to activities table
ALTER TABLE activities ADD COLUMN category_id UUID REFERENCES activity_categories(category_id);
CREATE INDEX idx_activities_category_id ON activities(category_id);
```

### Certificate System Tables

### Certificate Templates Table
```sql
CREATE TABLE certificate_templates (
  template_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  template_html TEXT NOT NULL,
  background_image_url TEXT,
  signature_image_url TEXT,
  created_by UUID REFERENCES users(user_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create indexes
CREATE INDEX idx_certificate_templates_created_by ON certificate_templates(created_by);
CREATE INDEX idx_certificate_templates_is_active ON certificate_templates(is_active);
```

### Certificate Requests Table
```sql
CREATE TABLE certificate_requests (
  request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(activity_id) ON DELETE CASCADE,
  template_id UUID REFERENCES certificate_templates(template_id),
  request_type TEXT CHECK (request_type IN ('participation', 'leadership', 'volunteer', 'achievement', 'custom')) NOT NULL,
  custom_title TEXT,
  custom_description TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'generated')) DEFAULT 'pending',
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES users(user_id),
  rejected_at TIMESTAMP WITH TIME ZONE,
  rejected_by UUID REFERENCES users(user_id),
  rejection_reason TEXT,
  generated_at TIMESTAMP WITH TIME ZONE,
  certificate_url TEXT,
  certificate_id TEXT UNIQUE,
  notes TEXT
);

-- Create indexes
CREATE INDEX idx_certificate_requests_user_id ON certificate_requests(user_id);
CREATE INDEX idx_certificate_requests_activity_id ON certificate_requests(activity_id);
CREATE INDEX idx_certificate_requests_status ON certificate_requests(status);
CREATE INDEX idx_certificate_requests_requested_at ON certificate_requests(requested_at);
CREATE INDEX idx_certificate_requests_certificate_id ON certificate_requests(certificate_id);
```

### Certificate Verification Table
```sql
CREATE TABLE certificate_verification (
  verification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id TEXT UNIQUE NOT NULL,
  request_id UUID REFERENCES certificate_requests(request_id) ON DELETE CASCADE,
  verification_code TEXT UNIQUE NOT NULL,
  is_valid BOOLEAN DEFAULT true,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by_ip INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_certificate_verification_certificate_id ON certificate_verification(certificate_id);
CREATE INDEX idx_certificate_verification_verification_code ON certificate_verification(verification_code);
CREATE INDEX idx_certificate_verification_is_valid ON certificate_verification(is_valid);
```

### Certificate Requirements Table (for defining what qualifies for certificates)
```sql
CREATE TABLE certificate_requirements (
  requirement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES activities(activity_id) ON DELETE CASCADE,
  request_type TEXT CHECK (request_type IN ('participation', 'leadership', 'volunteer', 'achievement', 'custom')) NOT NULL,
  minimum_attendance_hours DECIMAL(5,2) DEFAULT 0,
  minimum_score INTEGER DEFAULT 0,
  required_role TEXT CHECK (required_role IN ('participant', 'organizer', 'volunteer', 'speaker', 'mentor', 'helper')),
  auto_approve BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(activity_id, request_type)
);

-- Create indexes
CREATE INDEX idx_certificate_requirements_activity_id ON certificate_requirements(activity_id);
CREATE INDEX idx_certificate_requirements_request_type ON certificate_requirements(request_type);
```

## Running the Project

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see above)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages (login, register)
│   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── member/        # Member dashboard
│   │   └── admin/         # Admin dashboard
│   ├── about/             # About us page
│   ├── projects/          # Projects page
│   ├── join-us/           # Join us page
│   ├── news/              # News page
│   ├── support/           # Support us page
│   ├── contact/           # Contact page
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── layout/           # Layout components (navigation, footer)
│   └── forms/            # Form components
├── lib/                  # Utility libraries
│   ├── supabase/         # Supabase client configurations
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
```

## Features

- **Public Pages**: Home, About, Projects, Join Us, News, Support, Contact
- **Authentication**: Login/Register system with role-based access
- **Member Dashboard**: Profile management, activity participation
- **Admin Dashboard**: Member management, activity management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional design with Heroicons 