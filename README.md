# Influencer Monitoring Dashboard

A modern web application for monitoring and managing influencer marketing campaigns. Built with Next.js, React, and Tailwind CSS.

## Features

- **Dashboard Analytics**: Real-time insights into influencer performance
- **Content Management**: Track and organize influencer content
- **Brief Generation**: AI-powered brief creation for campaigns
- **Automation Tools**: Streamlined workflow automation
- **User Authentication**: Secure login and signup with Clerk
- **Responsive Design**: Mobile-first approach with modern UI

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript/JavaScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **AI Integration**: AI SDK

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rehan959/info_tracker.git
cd info_tracker
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your configuration:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
```

4. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── briefs/           # Brief management
│   ├── content/          # Content tracking
│   ├── influencers/      # Influencer management
│   └── automation/       # Automation tools
├── components/           # Reusable UI components
│   └── ui/              # Shadcn/ui components
├── lib/                 # Utility functions
├── hooks/               # Custom React hooks
└── public/              # Static assets
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Deployment

This project can be deployed to various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `out`
4. Configure environment variables

### Manual Deployment
1. Build the project: `pnpm build`
2. Export static files: `pnpm export`
3. Deploy the `out` directory to your hosting provider

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub.
