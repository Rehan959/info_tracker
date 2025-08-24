# 🚀 InfluenceTracker - Influencer Monitoring Platform

A modern, full-stack influencer monitoring application built with Next.js 14, Clerk authentication, and Neon PostgreSQL database.

## ✨ Features

- **🔐 Authentication** - Secure sign-in/sign-up with Clerk
- **📊 Dashboard** - Real-time influencer campaign analytics
- **👥 User Management** - Profile management and user statistics
- **📈 Campaign Tracking** - Monitor influencer campaigns and performance
- **🔔 Notifications** - Real-time activity notifications
- **📱 Responsive Design** - Works perfectly on all devices
- **⚡ Fast Performance** - Optimized for speed and user experience

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Authentication**: Clerk
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon PostgreSQL database
- Clerk account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rehan959/info_tracker.git
   cd info_tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your credentials:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

   # Database (Neon PostgreSQL)
   DATABASE_URL="your_neon_database_url"

   # OpenAI (for AI features)
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # User dashboard
│   ├── landing/           # Landing page
│   ├── sign-in/           # Sign-in page
│   ├── sign-up/           # Sign-up page
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── navigation.tsx    # Navigation component
├── lib/                  # Utility libraries
│   ├── prisma.ts         # Prisma client
│   └── services/         # Business logic services
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🌐 API Endpoints

- `GET /api/users` - Get user profile
- `POST /api/users` - Create/update user profile
- `GET /api/influencers` - Get all influencers
- `POST /api/influencers` - Create new influencer
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create new campaign
- `GET /api/dashboard` - Get dashboard data
- `POST /api/webhooks/clerk` - Clerk webhook handler

## 🔐 Authentication Flow

1. **Landing Page** → User sees the main landing page
2. **Sign Up/Sign In** → User authenticates with Clerk
3. **Dashboard** → Authenticated user sees their dashboard
4. **Protected Routes** → All dashboard and API routes require authentication

## 📊 Database Schema

The application uses the following main entities:
- **Users** - User profiles and authentication
- **Influencers** - Influencer profiles and metrics
- **Campaigns** - Marketing campaigns
- **Posts** - Social media posts
- **Activities** - User activity tracking
- **Notifications** - User notifications

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_WEBHOOK_SECRET`
- `DATABASE_URL`
- `OPENAI_API_KEY` (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Rehan959/info_tracker/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Clerk](https://clerk.com/) for authentication
- [Neon](https://neon.tech/) for the database
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Made with ❤️ by Rehan Shamsi**
