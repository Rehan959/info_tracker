# 🚀 Vercel Deployment Guide

## Prerequisites
- [Vercel Account](https://vercel.com/signup)
- [GitHub Account](https://github.com)
- Your project code pushed to GitHub

## Step 1: Prepare Your Project

### 1.1 Build Test
```bash
npm run build
```
Make sure the build completes successfully without errors.

### 1.2 Environment Variables
You'll need to set these in Vercel:

#### Required Environment Variables:
```bash
# Database (Your Neon PostgreSQL)
DATABASE_URL=postgresql://neondb_owner:npg_Xl7pN6jUuOKE@ep-rapid-star-adqh2flb-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_b3JnYW5pYy1nbmF0LTc0LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_b3JnYW5pYy1nbmF0LTc0LmNsZXJrLmFjY291bnRzLmRldiQ

# RapidAPI
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=instagram-bulk-profile-reports.p.rapidapi.com

# Next Auth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-domain.vercel.app
```

## Step 2: Deploy to Vercel

### 2.1 Connect GitHub Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing your project

### 2.2 Configure Project
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 2.3 Set Environment Variables
1. In the project settings, go to "Environment Variables"
2. Add each environment variable from the list above
3. Make sure to set them for all environments (Production, Preview, Development)

### 2.4 Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be available at `https://your-project.vercel.app`

## Step 3: Post-Deployment Setup

### 3.1 Database Setup
After deployment, you need to set up your database:

```bash
# Connect to your deployed app
# Run database migrations
npx prisma db push

# Seed the database
npx prisma db seed
```

### 3.2 Update Clerk Settings
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Update your app's allowed origins to include your Vercel domain
3. Add: `https://your-project.vercel.app`

### 3.3 Test Your App
1. Visit your deployed app
2. Test the sign-in functionality
3. Test adding influencers
4. Verify all features work correctly

## Step 4: Custom Domain (Optional)

### 4.1 Add Custom Domain
1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to match your custom domain

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check build logs for TypeScript errors
2. **Environment Variables**: Ensure all required variables are set
3. **Database Connection**: Verify DATABASE_URL is correct
4. **Clerk Authentication**: Check allowed origins in Clerk dashboard

### Build Commands:
```bash
# Local build test
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check Prisma schema
npx prisma validate
```

## Support
If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally with `npm run build`
4. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
