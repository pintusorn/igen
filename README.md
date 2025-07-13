# Volunteer Club Website

A modern, responsive website for a volunteer club built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

### Public Pages
- **Homepage**: Beautiful landing page with hero section and features
- **About Us**: Mission, values, team information, and impact statistics
- **Projects**: Showcase of current volunteer projects and initiatives
- **Join Us**: Information about how to become a volunteer
- **News**: Latest updates and stories from the community
- **Support Us**: Ways to contribute and support the organization
- **Contact**: Contact form and organization information

### Authentication System
- **Unified Login Portal**: Single login page for both members and admins
- **Role-Based Access**: Different dashboards based on user role
- **Secure Authentication**: Powered by Supabase Auth

### Member Dashboard
- **Profile Management**: Update personal information and preferences
- **Activity Pages**: Interactive project participation and management
- **Progress Tracking**: View volunteer hours and achievements
- **Upcoming Events**: Calendar of scheduled activities

### Admin Dashboard
- **Member Management**: View and manage volunteer members
- **Activity Management**: Create, edit, and monitor volunteer activities
- **Analytics**: Track participation and impact metrics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Components**: Custom components with Headless UI
- **Icons**: Heroicons
- **Forms**: React Hook Form with Zod validation
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **Additional**: keen-slider, react-simple-maps, react-phone-input-2

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages (login, register)
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── member/        # Member dashboard
│   │   └── admin/         # Admin dashboard
│   ├── about/             # About us page
│   ├── projects/          # Projects page
│   ├── join-us/           # Join us page
│   ├── news/              # News page
│   ├── support/           # Support us page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # UI components (Button, Card, etc.)
│   ├── layout/           # Layout components (Navigation, Footer)
│   └── forms/            # Form components
├── lib/                  # Utility libraries
│   ├── supabase/         # Supabase client configurations
│   │   ├── client.ts     # Browser client
│   │   └── server.ts     # Server client
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
    └── index.ts          # Application types
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('member', 'admin')) DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  profile_image_url TEXT,
  phone TEXT,
  bio TEXT
);
```

### Activities Table
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT CHECK (status IN ('ongoing', 'completed', 'upcoming')) DEFAULT 'upcoming',
  start_date DATE NOT NULL,
  end_date DATE,
  location TEXT NOT NULL,
  max_participants INTEGER,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT
);
```

### Activity Participants Table
```sql
CREATE TABLE activity_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('registered', 'attended', 'cancelled')) DEFAULT 'registered',
  UNIQUE(activity_id, user_id)
);
```

### News Table
```sql
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author_id UUID REFERENCES users(id),
  image_url TEXT
);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('unread', 'read', 'replied')) DEFAULT 'unread'
);
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd volunteer-club-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database schema SQL commands in your Supabase SQL editor
   - Copy your project URL and anon key to the environment variables

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 UI Components

The project includes a custom UI component library built with Tailwind CSS:

- **Button**: Multiple variants (primary, secondary, outline, ghost) and sizes
- **Card**: Flexible card component with header, content, and footer sections
- **Navigation**: Responsive navigation with mobile menu
- **Footer**: Clean footer with links and copyright

## 🔐 Authentication Flow

1. **Login Portal**: Single login page for all users
2. **Role Detection**: System checks user role after authentication
3. **Redirect Logic**: 
   - Members → `/member/dashboard`
   - Admins → `/admin/dashboard`
4. **Protected Routes**: Dashboard pages require authentication

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help or have questions:
- Check the [SETUP.md](SETUP.md) file for detailed setup instructions
- Review the Supabase documentation for database setup
- Open an issue in the GitHub repository

## 🎯 Roadmap

- [ ] Email notifications
- [ ] Real-time chat for volunteers
- [ ] Mobile app companion
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Integration with social media platforms
