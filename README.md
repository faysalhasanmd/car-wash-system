# 🚗 CarClean — Professional Car Wash & Detailing Service

A modern car washing and detailing web application built for a Bangladesh-based business. Customers can browse services, book appointments, and leave reviews — while admins and managers run the business through a full role-based dashboard.

![CarClean](https://img.freepik.com/premium-vector/vector-car-logo-design_714931-342.jpg?w=200)

## 🌐 Live Demo

[https://car-wash-system-two.vercel.app](https://car-wash-system-two.vercel.app)

### 🔑 Demo Credentials

| Role    | Email              | Password |
| ------- | ------------------ | -------- |
| User    | newEmail@gmail.com | 123456   |
| Admin   | JohnDue@gmail.com  | 123456   |
| Manager | mazidur@gmail.com  | 123456   |

---

## 🌐 GitHub Link

[https://github.com/faysalhasanmd/car-wash-system](https://github.com/faysalhasanmd/car-wash-system)

---

## ✨ Features

- 🔐 Authentication with NextAuth (Credentials, Google, GitHub)
- 🛡️ Role-Based Access Control (Admin, Manager, User) with protected routes
- 📋 Browse & book car washing services
- ⭐ Customer reviews section
- 📊 Role-aware dashboard with stats cards & Recharts visualizations (revenue, bookings, service breakdown)
- 👥 Admin user management & role assignment
- 📱 Fully responsive design — mobile hamburger sidebar, tablet & desktop layouts
- 🌙 Toast notifications & loading states

---

## 🛠️ Tech Stack

| Frontend     | Backend            | Database                         | Auth        |
| ------------ | ------------------ | -------------------------------- | ----------- |
| Next.js 15   | Next.js API Routes | MongoDB                          | NextAuth.js |
| Tailwind CSS | Node.js            | Mongoose / MongoDB Native Driver |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/faysalhasanmd/car-cleanify.git
cd car-cleanify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_MONGO_URI=your_mongodb_connection_string
NEXT_MONGODB_NAME=your_database_name
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
```

> ⚠️ When deploying (e.g. to Vercel), make sure `NEXTAUTH_URL` is set to your **production domain**, not `localhost`, or authentication will fail in production.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📁 Project Structure

```
car-cleanify/
├── app/
│   ├── (dashboard-layout)/
│   │   └── dashboard/
│   │       ├── layout.jsx          # Sidebar + Navbar wrapper
│   │       ├── page.jsx            # Role-aware overview (stats + charts)
│   │       ├── profile/
│   │       ├── bookings/
│   │       ├── my-bookings/
│   │       ├── services/
│   │       ├── reports/
│   │       ├── reviews/
│   │       ├── users/               # Admin only
│   │       ├── roles/               # Admin only
│   │       └── settings/            # Admin only
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   ├── bookings/
│   │   ├── services/
│   │   ├── reviews/
│   │   └── users/
│   ├── login/
│   ├── register/
│   └── page.jsx                     # Public landing page
├── components/
│   ├── shared/
│   │   ├── DashboardSidebar.jsx     # Role-based nav, mobile hamburger
│   │   └── DashboardNavbar.jsx
│   └── ui/
├── lib/
│   └── mongodb.js                   # DB connection helper
├── models/                          # Mongoose schemas (if used)
├── public/
├── .env.local
├── next.config.mjs
├── package.json
└── README.md
```

---

## 👥 Roles & Permissions

| Role    | Access                                                                   |
| ------- | ------------------------------------------------------------------------ |
| Admin   | Full access — manage users, services, bookings, roles, reports, settings |
| Manager | Manage bookings, services, reports, reviews                              |
| User    | Book services, view own bookings, leave reviews, manage own profile      |
