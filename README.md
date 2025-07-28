# NullSender – Anonymous Feedback Platform

NullSender is a modern, full-stack web application built with Next.js that enables users to receive honest, anonymous feedback through a unique shareable link. Designed for privacy, simplicity, and a beautiful user experience, NullSender is ideal for creators, professionals, and anyone seeking genuine insights without revealing identities.

## Features

- **Anonymous Messaging:** Receive messages from anyone without exposing sender identity.
- **Unique User Links:** Each user gets a personal URL to collect feedback.
- **Secure Authentication:** Sign up and sign in with email or username, with email verification.
- **Message Management:** View, delete, and manage received messages in a clean dashboard.
- **Accept/Reject Messages:** Toggle whether you are open to receiving new messages.
- **AI-Powered Suggestions:** Get engaging, open-ended question prompts powered by AI.
- **Responsive UI:** Beautiful, mobile-friendly interface with smooth animations.
- **Email Notifications:** Receive verification codes via email for secure onboarding.

## Tech Stack

- **Frontend:** React 19, Next.js 15 (App Router), Tailwind CSS, Radix UI, Lucide Icons
- **Backend:** Next.js API Routes, Mongoose, MongoDB
- **Authentication:** NextAuth.js (Credentials Provider, JWT)
- **AI Integration:** Google Gemini via AI SDK for message suggestions
- **Email:** Resend API with React Email templates
- **Forms & Validation:** React Hook Form, Zod
- **Notifications:** Sonner Toasts

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or cloud)
- Resend API key (for email)
- Google Gemini API key (for AI suggestions)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Muhammad-BinMushtaq/nullsender.git
   cd nullsender
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and update the values:
     ```bash
     NEXTAUTH_SECRET=your_nextauth_secret
     MONGODB_URI=your_mongodb_uri
     RESEND_API_KEY=your_resend_api_key
     GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
