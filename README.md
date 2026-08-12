<div align="center">

# 📱 Hybrid Portal Merchant Web & Mobile POS 

**A next-generation, high-performance full-stack web application combining merchant management, a mobile POS simulator, PPOB digital transactions, and an embedded Server-Side AI assistant.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[Key Features](#-key-features) • [Tech Stack](#️-tech-stack) • [Getting Started](#-getting-started) • [API Reference](#-api-reference) • [Author](#-author)

</div>

---

## ✨ Key Features

*   🪄 **Single Page Application (SPA) Experience:** Seamless transitions between Home, PPOB, Shop, Cashier POS, Wallet, Tasks, and AI Assistant tabs without page reloads, powered by React & Motion (Framer Motion).
*   🧠 **AI-Powered Business Assistant:** Integrated server-side engine that analyzes financial reports, generates high-conversion WhatsApp marketing copy, and provides smart store operational advice.
*   ⚡ **Low-Latency API Architecture:** Built with Node.js & Express for lightning-fast request routing, optimized CORS handling, and clean JSON payloads.
*   🎨 **Modern UI/UX Design:** Immersive, responsive interface featuring realistic smartphone casing simulators (iPhone Titanium, Rose Gold, Midnight Dark) alongside comprehensive desktop web portal views.
*   📊 **Digital Wallet & Advanced Analytics:** Real-time balance tracker, structured income/expense transaction logging, and interactive data visualizations built with Recharts.

---

## 🛠️ Tech Stack

*   **Backend:** Node.js, Express.js (RESTful API), Google GenAI SDK
*   **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide React
*   **Architecture:** Decoupled logic (Client-side SPA bundled via Vite, Server-side API & static hosting served via Express & ESBuild).

---

## 🚀 Getting Started

Follow these steps to get a development copy up and running locally on your machine.

### Prerequisites

Ensure you have **Node.js** and **NPM** installed on your system.
```bash
node --version
npm --version
```

## 🚀 Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/AgungDimas/aplikasi-mobile-web-portal.git](https://github.com/AgungDimas/aplikasi-mobile-web-portal.git)
   cd aplikasi-mobile-web-portal
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   ```bash
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Run the application in development mode:
   ```bash
   npm run dev
   ```
5. Access the Web App:
* Open your browser and navigate to: http://localhost:3001 

## 📡 API Reference
1. Chat / AI Assistant Endpoint:
*   Endpoint: POST /api/chat
*   Request Payload:
  ```
JSON
  {
  "message": "Buatkan draf ucapan promosi pulsa dan paket data murah untuk status WhatsApp toko saya."
}
```
*   Response Example:
 ```
JSON
  {
  "reply": "🔥 PROMO SPESIAL TOKO KITA! 🔥\n\nBeli Pulsa & Paket Data sekarang lebih hemat & cepat! Tersedia juga Token PLN dan Top Up E-Wallet.\n\n📲 Hubungi kami sekarang atau datang langsung ke toko!"
}
```

## 👨💻 Author
BungDimas

R&D Intern | Full-Stack Enthusiast

Feel free to reach out, open an issue, or connect with me if you have any questions or feedback regarding this project!
