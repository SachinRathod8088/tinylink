<h1 align="center">🔗 TinyLink – Modern URL Shortener</h1>

<p align="center">
A clean, full-stack, production-ready URL Shortener built using <b>Next.js, Prisma, PostgreSQL (Neon), Tailwind CSS</b> and deployed on <b>Vercel</b>.
<br/>Inspired by Bit.ly — created for the TinyLink Take-Home Assignment.
</p>

---

## 🚀 Live Demo  
🔗 **Website:** _[Add Vercel URL here_](https://tinylink-od4i.vercel.app/)  
🎥 **Video Walkthrough:** _Add your YouTube / Drive link here_  

---

## 📸 Screenshots

> Upload your screenshots to the repository and update paths accordingly.  
> For now, these are the paths you provided.

### **Dashboard – Full View**
<img src="/Screenshots/full_screen.png" width="100%" />

---

### **Create Short Link View**
<img src="/Screenshots/Screenshot 2025-11-21 011908.png" width="100%" />

---

### **Dashboard With Multiple Links**
<img src="/Screenshots/Screenshot 2025-11-21 012332.png" width="100%" />

---

### **Search by Code / URL**
<img src="/Screenshots/search_with_code _url.png" width="100%" />

---

### **Filtered Results**
<img src="/Screenshots/Screenshot 2025-11-21 012504.png" width="100%" />

---

## 🧩 Overview

TinyLink is a complete full-stack application enabling users to:

- Create short URLs  
- Optionally specify custom codes  
- Redirect using `/:code`  
- Track total clicks & last clicked time  
- View per-link statistics  
- Search & filter links  
- Delete links  
- Monitor system health via `/healthz`  

This project strictly follows the **official TinyLink assignment requirements**, including routing structure, API specs, validations, and UI quality.

---

## 🛠 Tech Stack

| Layer | Tools |
|-------|-------|
| Frontend | Next.js, React, Tailwind CSS |
| Backend | API Routes (Next.js), Axios |
| Database | PostgreSQL (Neon Serverless) |
| ORM | Prisma |
| UI Icons | Heroicons |
| Hosting | Vercel |

---
##🛠 How to Pull & Run This Project Locally

Follow the steps below to clone, install dependencies, configure environment variables, and run the TinyLink project on your local machine.

1️⃣ Clone the Repository
git clone https://github.com/<your-username>/tinylink.git
cd tinylink

2️⃣ Install Dependencies

Make sure you have Node.js 18+ installed.

npm install

3️⃣ Set Environment Variables

Create a .env.local file by copying the example:

cp .env.example .env.local


Then open .env.local and update with your real values:

DATABASE_URL="your_neon_postgres_url?sslmode=require&connection_limit=1"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

4️⃣ Set Up Prisma

Generate the Prisma client:

npx prisma generate


Push the Prisma schema to your database:

npx prisma db push


If the database URL is correct, this will automatically create your tables in Neon.

5️⃣ Start the Development Server
npm run dev


Now open your browser and visit:

http://localhost:3000

6️⃣ Test Key Routes
Feature	URL
Dashboard	/
Create Link API	/api/links
Stats Page	/code/:code
Redirect Page	/:code
Health Check	/healthz
