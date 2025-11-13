# FinEase - Personal Finance Management App 💰

**FinEase** is a modern, responsive personal finance management web application that helps users track income, expenses, set budgets, and visualize financial insights through interactive charts.

🌐 **Live Site URL**: [https://fine-ease-new.netlify.app]

---

## ✨ Key Features

- **Secure Authentication** – Email/password login & Google Sign-In with Firebase Authentication. Conditional navbar shows user avatar & dropdown (email, name, logout).
- **Full CRUD Operations** – Add, view, update, and delete transactions with real-time UI updates and toast notifications (React-Toastify).
- **Interactive Financial Reports** – Beautiful Pie & Bar charts using **Recharts** to visualize expense categories and monthly trends.
- **Smart Transaction Management** – Filter & **server-side sorting** by date/amount, card layout with equal height cards, instant delete confirmation via SweetAlert2.
- **Light / Dark Mode Toggle** – Seamless theme switching with persistent user preference.
- **Fully Responsive Design** – Works perfectly on mobile, tablet, and desktop using Tailwind CSS + DaisyUI.
- **Loading Spinners & Custom Toasts** – No browser alerts; all success/error messages shown via toast.
- **Custom 404 Page** – Friendly not-found page for invalid routes.
- **Secure Authentication:**  
  Email-password and Google login supported. User-specific transactions are fetched securely from MongoDB.

---

## 🚀 Tech Stack

- React 19 + Vite
- React Router v7
- Firebase Authentication
- Tailwind CSS + DaisyUI
- Recharts (data visualization)
- React-Toastify & SweetAlert2
- Axios for API calls
- React Spinners
