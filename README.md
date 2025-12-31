# React Super App

A high-performance, production-ready multi-role Super App built with React, Vite, Tailwind CSS, and modern UI libraries.

## Features

- **Multi-Role Authentication**: Student, Vendor, and Admin roles with protected routes
- **E-commerce Module**: Product catalog, shopping cart, and multi-step checkout
- **Learning Management System (LMS)**: Video player UI, course curriculum, and progress tracking
- **Admin Panel**: User management, revenue analytics with Recharts, and content upload
- **Vendor Dashboard**: Order management and inventory control
- **Modern UI**: Glassmorphism effects, Framer Motion animations, and responsive design
- **High-Quality Images**: Uses Unsplash/Pexels for all images

## Tech Stack

- **React 18** with Vite
- **TypeScript**
- **Tailwind CSS** for styling
- **Shadcn UI** (Radix UI) for components
- **Framer Motion** for animations
- **Zustand** for state management
- **TanStack Query** for data fetching
- **React Router v6** for routing
- **Recharts** for data visualization
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Demo Accounts

- **Admin**: `admin@example.com` / `admin123`
- **Student**: `student@example.com` / `student123`
- **Vendor**: `vendor@example.com` / `vendor123`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and configure the build settings
4. Deploy!

The project includes a `vercel.json` configuration file for optimal deployment.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── auth/       # Authentication components
│   ├── cart/       # Shopping cart components
│   ├── layout/     # Layout components (Sidebar, Navbar)
│   └── ui/         # Shadcn UI components
├── lib/            # Utilities and data
├── pages/          # Page components
├── stores/         # Zustand stores
└── types/          # TypeScript types
```

## Features by Role

### Student
- Learning dashboard with progress tracking
- Video player UI for course content
- Product catalog for learning resources
- Course curriculum sidebar

### Vendor
- Order management dashboard
- Product inventory management
- Sales statistics

### Admin
- User management with search and filtering
- Revenue analytics with charts
- Content upload (courses/products)
- Platform-wide statistics

## License

MIT
