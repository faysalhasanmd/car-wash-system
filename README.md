# 🚗 CarClean — Professional Car Wash & Detailing Service

A modern car washing and detailing web application built for a Bangladesh-based business. Customers can browse services, book appointments, and leave reviews — all in one place.

![CarClean](https://img.freepik.com/premium-vector/vector-car-logo-design_714931-342.jpg?w=200)

## 🌐 Live Demo

[https://car-cleanify-d55d.vercel.app](https://car-cleanify-d55d.vercel.app)

---

## 🌐 gitHub Link

[https://github.com/faysalhasanmd/car-cleanify]

## ✨ Features

- 🔐 Authentication with NextAuth (Credentials, Google, GitHub)
- 🛡️ Protected routes
- 📋 Browse & book car washing services
- ⭐ Customer reviews section
- 👤 User & Admin dashboard
- 📱 Fully responsive design
- 🌙 Toast notifications & loading states

---

## 🛠️ Tech Stack

| Frontend        | Backend            | Database | Auth        |
| --------------- | ------------------ | -------- | ----------- |
| Next.js 15      | Next.js API Routes | MongoDB  | NextAuth.js |
| Tailwind CSS    | Node.js            | Mongoose | JWT         |
| React Hot Toast | bcrypt             | —        | —           |

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

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📁 Project Structure
