# 🏗️ Architecture Overview - Main Components

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 15.2.4 (React + TypeScript)                           │
│  ├── Dashboard Pages                                            │
│  ├── Influencer Management                                      │
│  ├── Analytics & Charts                                         │
│  └── Authentication UI                                          │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  Next.js API Routes                                             │
│  ├── /api/dashboard     - Dashboard data                       │
│  ├── /api/influencers   - Influencer CRUD                      │
│  ├── /api/campaigns     - Campaign management                   │
│  ├── /api/social-media  - Social media integration             │
│  └── /api/webhooks      - External integrations                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICE LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│  Business Logic Services                                        │
│  ├── DashboardService    - Dashboard data aggregation          │
│  ├── SocialMediaService  - Social media API integration        │
│  ├── UserService         - User management                     │
│  └── InfluencerService   - Influencer operations               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                  │
├─────────────────────────────────────────────────────────────────┤
│  Prisma ORM + PostgreSQL (Neon)                                │
│  ├── Users              - User accounts                        │
│  ├── Influencers        - Influencer profiles                  │
│  ├── Campaigns          - Marketing campaigns                  │
│  ├── Posts              - Social media content                 │
│  ├── Activities         - System activities                    │
│  └── Briefs             - AI-generated reports                 │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                  EXTERNAL INTEGRATIONS                         │
├─────────────────────────────────────────────────────────────────┤
│  ├── Clerk              - Authentication                       │
│  ├── RapidAPI           - Social media data                    │
│  │   ├── Instagram API                                         │
│  │   ├── YouTube API                                           │
│  │   ├── TikTok API                                            │
│  │   ├── Twitter API                                           │
│  │   └── LinkedIn API                                          │
│  └── Vercel              - Deployment platform                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🗄️ Core Database Models

### Main Entities
```
User (1) ──── (N) Influencer
User (1) ──── (N) Campaign  
User (1) ──── (N) Activity
User (1) ──── (N) Brief

Influencer (1) ──── (N) Post
Influencer (1) ──── (N) Activity
Campaign (1) ──── (N) Post
Campaign (1) ──── (N) Activity

Campaign (N) ──── (N) Influencer (via CampaignInfluencer)
```

### Key Data Models
- **User**: Authentication, profile, settings
- **Influencer**: Social media profiles, metrics, status
- **Campaign**: Marketing campaigns, goals, budget
- **Post**: Social media content, engagement metrics
- **Activity**: System events, notifications
- **Brief**: AI-generated reports and insights

## 🔄 Data Flow

### 1. User Authentication Flow
```
Browser → Clerk Auth → Webhook → Database → Dashboard
```

### 2. Influencer Monitoring Flow
```
User Input → Platform Detection → RapidAPI → Database → Dashboard
```

### 3. Campaign Management Flow
```
Campaign Creation → Influencer Assignment → Content Monitoring → Analytics
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **UI**: Tailwind CSS + Shadcn/UI
- **Charts**: Recharts
- **Auth**: Clerk

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **External APIs**: RapidAPI (Social Media)

### Infrastructure
- **Deployment**: Vercel
- **Database**: Neon (PostgreSQL)
- **Authentication**: Clerk
- **Monitoring**: Built-in logging

## 📱 Key Features

### Core Functionality
1. **Multi-platform Influencer Monitoring**
2. **Campaign Management**
3. **Real-time Analytics Dashboard**
4. **Social Media Integration**
5. **AI-powered Reporting**

### User Journey
1. **Sign Up/Login** → Clerk Authentication
2. **Add Influencers** → Social Media Link Import
3. **Create Campaigns** → Goal Setting & Budget
4. **Monitor Performance** → Real-time Analytics
5. **Generate Reports** → AI-powered Insights

## 🔐 Security Architecture

### Authentication
- **Clerk**: JWT-based authentication
- **Webhooks**: Secure user synchronization
- **API Protection**: Middleware-based route guards

### Data Security
- **Database**: PostgreSQL with SSL
- **Environment Variables**: Secure configuration
- **Multi-tenant**: User data isolation

## 🚀 Deployment Architecture

### Vercel Deployment
```
GitHub Repository → Vercel Build → Production Deployment
                ↓
        Environment Variables
        ├── Database URL
        ├── Clerk Keys
        ├── RapidAPI Key
        └── App Configuration
```

### Database Schema
```
PostgreSQL (Neon)
├── Users Table
├── Influencers Table
├── Campaigns Table
├── Posts Table
├── Activities Table
└── Briefs Table
```

## 📊 Performance & Scalability

### Current Architecture
- **Serverless**: Vercel functions
- **Database**: Neon PostgreSQL
- **Caching**: Built-in Next.js caching
- **CDN**: Vercel edge network

### Scalability Features
- **Auto-scaling**: Vercel serverless functions
- **Database**: Neon auto-scaling
- **API Rate Limiting**: Built-in protection
- **Caching Strategy**: Multi-level caching

---

## 🎯 Key Design Principles

1. **Modular Architecture**: Separated concerns with clear boundaries
2. **API-First Design**: RESTful API endpoints
3. **Real-time Data**: Live updates and monitoring
4. **Scalable Infrastructure**: Cloud-native deployment
5. **Security First**: Authentication and data protection
6. **User Experience**: Intuitive interface and workflows

This architecture provides a solid foundation for a scalable, secure, and feature-rich influencer monitoring platform.
