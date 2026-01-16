# 🛍️ AyashTech - Modern E-Commerce Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A sleek, modern e-commerce storefront built with Next.js 16 and React 19**

[🌐 Live Demo](https://ayash-tech.vercel.app/) • [📡 Backend API](https://github.com/mdadeel/AyashTech-server)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Modern UI** | Clean, responsive design with dark/light mode support |
| ⚡ **Blazing Fast** | Built with Next.js 16 Turbopack for optimal performance |
| 🛒 **Product Catalog** | Browse, filter, and search products by category |
| ➕ **Admin Panel** | Add new products with rich form validation |
| 📱 **Fully Responsive** | Seamless experience across all devices |
| 🔔 **Toast Notifications** | Real-time feedback with react-hot-toast |

---

## 🛠️ Tech Stack

```
Frontend Framework  →  Next.js 16.1.1 (App Router)
UI Library          →  React 19
Styling             →  Tailwind CSS 4.0
Icons               →  Lucide React
Notifications       →  React Hot Toast
HTTP Client         →  Native Fetch API
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mdadeel/AyashTech-client.git

# Navigate to project directory
cd AyashTech-client

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API URL (for production, set this in Vercel)
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
```

---

## 📁 Project Structure

```
app/
├── (main)/              # Main route group
│   ├── add-item/        # Add product page
│   └── items/           # Product listing page
├── components/          # Reusable UI components
│   ├── layout/          # Layout components (Navbar, Footer)
│   └── sections/        # Page sections
├── lib/                 # Utilities & API functions
└── globals.css          # Global styles
```

---

## 🔗 Related

- **Backend API:** [AyashTech-server](https://github.com/mdadeel/AyashTech-server)
- **Live API:** [https://ayash-tech-server.vercel.app](https://ayash-tech-server.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ by [Adeel](https://github.com/mdadeel)**

</div>
