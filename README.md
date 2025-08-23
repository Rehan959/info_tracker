# InfluenceTracker

A comprehensive influencer monitoring platform that helps you track engagement, analyze performance, and discover new opportunities in real-time.

## Features

### Landing Page
- **Modern Design**: Beautiful, responsive landing page with consistent branding
- **Call-to-Action**: Clear sign-in and sign-up buttons for user conversion
- **Feature Showcase**: Highlights key platform capabilities
- **Social Proof**: Displays user statistics and testimonials
- **Professional Footer**: Complete with links to important pages

### User Dashboard
- **Welcome Section**: Personalized greeting for returning users
- **Key Metrics**: Real-time statistics including:
  - Total Influencers
  - Active Campaigns
  - Average Engagement
  - Next Brief Schedule
- **Recent Activity**: Live feed of influencer activities
- **Quick Actions**: Easy access to common tasks
- **Performance Overview**: Monthly campaign performance metrics

### Authentication
- **Clerk Integration**: Secure authentication with Clerk
- **Sign In/Sign Up Pages**: Consistent styling with the main application
- **Protected Routes**: Middleware ensures proper authentication flow
- **User Management**: Built-in user profile and sign-out functionality

## Pages

### Public Pages
- `/` - Redirects to landing page
- `/landing` - Main landing page with sign-in/sign-up options
- `/sign-in` - Authentication page
- `/sign-up` - Registration page

### Protected Pages
- `/dashboard` - Main user dashboard (requires authentication)
- `/influencers` - Influencer management
- `/content` - Content monitoring
- `/briefs` - Trend briefs
- `/automation` - Automation settings

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Clerk
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file with your Clerk credentials:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:3000`

## Navigation Flow

1. **Landing Page** (`/landing`) - Public page with sign-in/sign-up options
2. **Authentication** (`/sign-in` or `/sign-up`) - User authentication
3. **Dashboard** (`/dashboard`) - Main application after authentication
4. **Feature Pages** - Access to all platform features

## Component Structure

### Shared Components
- `Navigation` - Consistent header across all pages
- `Card` - Reusable card components
- `Button` - Styled button components

### Page Components
- `LandingPage` - Main marketing page
- `UserDashboard` - Authenticated user dashboard
- `SignInPage` - Authentication page
- `SignUpPage` - Registration page

## Styling

The application uses a consistent design system with:
- **Color Scheme**: Primary, secondary, and muted colors
- **Typography**: Geist Sans font family
- **Spacing**: Consistent padding and margins
- **Components**: shadcn/ui component library
- **Responsive**: Mobile-first design approach

## Authentication Flow

1. User visits landing page
2. Clicks "Sign In" or "Sign Up"
3. Completes authentication with Clerk
4. Redirected to dashboard
5. Can access all protected features

## Middleware

The application uses Clerk middleware to:
- Protect routes requiring authentication
- Allow public access to landing and auth pages
- Redirect unauthenticated users to sign-in page
- Handle authentication state properly

## Development

### File Structure
```
app/
├── landing/          # Landing page
├── sign-in/          # Sign in page
├── sign-up/          # Sign up page
├── dashboard/        # User dashboard
├── auth/             # Clerk auth pages
├── influencers/      # Influencer management
├── content/          # Content monitoring
├── briefs/           # Trend briefs
├── automation/       # Automation settings
└── layout.tsx        # Root layout

components/
├── navigation.tsx    # Shared navigation
└── ui/              # shadcn/ui components
```

### Key Features Implemented

✅ **Landing Page** - Complete marketing page with sign-in/sign-up
✅ **User Dashboard** - Comprehensive dashboard with metrics and actions
✅ **Authentication** - Secure sign-in/sign-up flow
✅ **Navigation** - Consistent header across all pages
✅ **Responsive Design** - Mobile-friendly interface
✅ **Type Safety** - Full TypeScript implementation
✅ **Middleware** - Proper route protection
✅ **Component Reusability** - Shared navigation component

## Next Steps

Potential enhancements for future development:
- User profile management
- Advanced analytics dashboard
- Email notifications
- API integrations
- Mobile app
- Team collaboration features
