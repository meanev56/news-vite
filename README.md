Nairametrics Dashboard (Vite + React + Clerk)

A modern, scalable dashboard built with Vite, React, React Router, Tailwind CSS, and Clerk Authentication.
This project powers a news-focused user dashboard with protected routes, personalization, and role-based access.

✨ Features

🔐 Authentication with Clerk

Sign in / Sign out

User profile management

Protected routes

🧭 Protected Dashboard

Only authenticated users can access /dashboard

🧑‍💼 Role-Based Access

Admin vs regular users using Clerk metadata

📌 Bookmarks System

Saved articles per user

📊 Reading Analytics

Track articles read

🧱 Dashboard Layout

Sidebar navigation

📱 Responsive UI

Mobile-friendly with animated menu

🎨 Tailwind CSS + shadcn/ui

Clean and consistent design

⚡ Vite

Fast dev server and builds


🛠 Tech Stack

Vite

React + TypeScript

React Router DOM

Tailwind CSS

Clerk Authentication

shadcn/ui

Lucide Icons



src/
├─ components/
│  ├─ Navbar.tsx
│  ├─ ProtectedRoute.tsx
│
├─ hooks/
│  ├─ useBookmarks.ts
│
├─ services/
│  ├─ bookmarks.ts
│  ├─ analytics.ts
│
├─ layouts/
│  ├─ DashboardLayout.tsx
│
├─ pages/
│  ├─ dashboard/
│  │  ├─ Dashboard.tsx
│  │  ├─ Bookmarks.tsx
│  │  ├─ Profile.tsx
|  |-AboutUs.tsx
|  |- Article.tsx
|  |-Banking.tsx
|  |-Markets.tsx
|  |-Home.tsx
|  |-NotFound.tsx
|  |-Sports.tsx
│
├─ App.tsx
├─ main.tsx
└─ index.css

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/your-username/nairametrics-dashboard.git
cd nairametrics-dashboard

2️⃣ Install dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the root directory:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key


You can get this from your Clerk Dashboard → API Keys

4️⃣ Run the project
npm run dev


App will be available at:

http://localhost:5173

🔐 Authentication Flow

Public pages are accessible to everyone

/dashboard is protected using ProtectedRoute

Unauthenticated users are redirected to /

User roles are stored in Clerk publicMetadata

Example admin metadata:
{
  "role": "admin"
}

📌 Dashboard Pages
Route	Description
/dashboard	Overview
/dashboard/bookmarks	Saved articles
/dashboard/profile	User profile & security
🧠 Custom Hooks & Services
useBookmarks

Fetches user bookmarks

Easy to replace with real backend

analytics.ts

Tracks article reads

Ready for database integration

🎯 Future Improvements

🔗 Connect real backend (Supabase / Firebase / Laravel)

📰 Live news API integration

📊 Advanced analytics dashboard

🔔 Notifications system

🌙 Dark mode

📱 PWA support

🧪 Scripts
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build

🤝 Contributing

Fork the repo

Create a feature branch

Commit your changes

Open a pull request

📄 License

This project is licensed under the MIT License.

🙌 Acknowledgements

Clerk

Vite

shadcn/ui

Lucide Icons