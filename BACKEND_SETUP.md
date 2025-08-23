# Backend Setup Guide

This guide will help you set up the complete backend for your influencer monitoring application using Neon (PostgreSQL) and Prisma.

## 🗄️ Database Setup (Neon)

### 1. Create Neon Account
1. Go to [neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project

### 2. Get Database Connection String
1. In your Neon dashboard, go to your project
2. Click on "Connection Details"
3. Copy the connection string that looks like:
   ```
   postgresql://username:password@host:port/database?sslmode=require
   ```

### 3. Set Environment Variables
Create a `.env.local` file in your project root:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# OpenAI (for AI features)
OPENAI_API_KEY=your_openai_api_key
```

## 🔧 Database Setup

### 1. Generate Prisma Client
```bash
npm run db:generate
```

### 2. Push Schema to Database
```bash
npm run db:push
```

### 3. Seed Database (Optional)
```bash
npm run db:seed
```

### 4. Open Prisma Studio (Optional)
```bash
npm run db:studio
```

## 🔐 Clerk Setup

### 1. Create Clerk Application
1. Go to [clerk.com](https://clerk.com)
2. Create a new application
3. Get your API keys from the dashboard

### 2. Configure Webhooks
1. In Clerk dashboard, go to "Webhooks"
2. Create a new webhook endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`
4. Copy the webhook secret to your `.env.local`

### 3. Update Environment Variables
Add your Clerk credentials to `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
```

## 🚀 API Endpoints

### Authentication Required Endpoints

#### Users
- `GET /api/users` - Get current user profile
- `POST /api/users` - Create/update user profile

#### Influencers
- `GET /api/influencers` - Get all influencers (with pagination)
- `POST /api/influencers` - Create new influencer
- `GET /api/influencers/[id]` - Get specific influencer
- `PUT /api/influencers/[id]` - Update influencer
- `DELETE /api/influencers/[id]` - Delete influencer

#### Campaigns
- `GET /api/campaigns` - Get all campaigns (with pagination)
- `POST /api/campaigns` - Create new campaign

#### Dashboard
- `GET /api/dashboard` - Get dashboard statistics and data

#### Webhooks
- `POST /api/webhooks/clerk` - Clerk webhook handler

### Query Parameters

#### Influencers API
- `platform` - Filter by platform (INSTAGRAM, YOUTUBE, etc.)
- `status` - Filter by status (ACTIVE, INACTIVE, etc.)
- `category` - Filter by category
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

#### Campaigns API
- `status` - Filter by status (DRAFT, ACTIVE, etc.)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## 📊 Database Schema

### Core Models

#### User
- `id` - Unique identifier
- `email` - User email
- `name` - User name
- `clerkId` - Clerk user ID
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

#### Influencer
- `id` - Unique identifier
- `name` - Influencer name
- `username` - Social media username
- `platform` - Platform (INSTAGRAM, YOUTUBE, etc.)
- `followers` - Follower count
- `engagement` - Engagement rate
- `bio` - Biography
- `avatar` - Profile picture URL
- `website` - Website URL
- `email` - Contact email
- `phone` - Contact phone
- `location` - Location
- `category` - Content category
- `status` - Status (ACTIVE, INACTIVE, etc.)
- `isVerified` - Verification status

#### Campaign
- `id` - Unique identifier
- `name` - Campaign name
- `description` - Campaign description
- `startDate` - Start date
- `endDate` - End date
- `budget` - Campaign budget
- `status` - Status (DRAFT, ACTIVE, etc.)
- `goals` - Campaign goals (array)
- `metrics` - Performance metrics (JSON)

#### Post
- `id` - Unique identifier
- `title` - Post title
- `content` - Post content
- `url` - Post URL
- `platform` - Platform
- `postType` - Type (POST, STORY, REEL, etc.)
- `publishedAt` - Publication date
- `likes` - Like count
- `comments` - Comment count
- `shares` - Share count
- `views` - View count
- `engagement` - Engagement rate
- `reach` - Reach count
- `impressions` - Impression count
- `sentiment` - Sentiment analysis
- `tags` - Tags (array)
- `mentions` - Brand mentions (array)
- `hashtags` - Hashtags (array)
- `mediaUrls` - Media URLs (array)

#### Activity
- `id` - Unique identifier
- `type` - Activity type
- `title` - Activity title
- `description` - Activity description
- `data` - Additional data (JSON)
- `priority` - Priority level
- `isRead` - Read status

## 🔧 Development Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Run database migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Start development server
npm run dev
```

## 🧪 Testing the Backend

### 1. Test Database Connection
```bash
npm run db:studio
```

### 2. Test API Endpoints
Use tools like Postman or curl to test the endpoints:

```bash
# Get dashboard data (requires authentication)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/dashboard

# Get influencers (requires authentication)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/influencers
```

### 3. Test Webhook
```bash
# Test Clerk webhook (requires webhook secret)
curl -X POST http://localhost:3000/api/webhooks/clerk \
  -H "Content-Type: application/json" \
  -H "svix-id: test-id" \
  -H "svix-timestamp: $(date +%s)" \
  -H "svix-signature: test-signature" \
  -d '{"type":"user.created","data":{"id":"test","email_addresses":[{"email_address":"test@example.com"}]}}'
```

## 🔒 Security Features

### Authentication
- All API routes are protected with Clerk authentication
- User data is isolated by user ID
- Webhook verification with Svix

### Data Validation
- Input validation on all API endpoints
- Type safety with TypeScript
- Prisma schema validation

### Error Handling
- Comprehensive error handling
- Proper HTTP status codes
- Error logging

## 📈 Performance Features

### Database Optimization
- Indexed foreign keys
- Efficient queries with Prisma
- Connection pooling with Neon

### API Optimization
- Pagination for large datasets
- Selective field inclusion
- Parallel data fetching

## 🚀 Deployment

### Environment Variables
Make sure to set all required environment variables in your deployment platform:

- `DATABASE_URL` - Neon database connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `CLERK_WEBHOOK_SECRET` - Clerk webhook secret
- `OPENAI_API_KEY` - OpenAI API key (optional)

### Database Migration
```bash
# Generate Prisma client
npm run db:generate

# Push schema to production database
npm run db:push
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your `DATABASE_URL` in `.env.local`
   - Ensure Neon database is active
   - Verify SSL mode is set to `require`

2. **Authentication Error**
   - Verify Clerk credentials
   - Check webhook configuration
   - Ensure middleware is properly configured

3. **Prisma Errors**
   - Run `npm run db:generate` to regenerate client
   - Check schema syntax
   - Verify database permissions

4. **Webhook Errors**
   - Check webhook secret
   - Verify endpoint URL
   - Check webhook event types

### Debug Mode
Enable debug mode in middleware for development:
```typescript
// middleware.ts
debug: process.env.NODE_ENV === 'development'
```

## 📚 Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
