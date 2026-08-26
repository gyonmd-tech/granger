# ⚡ Granger Sportainment Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12.2-FF4154?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)

> **Granger Sportainment** adalah platform all-in-one sport, fitness, dan sports entertainment modern dengan desain premium, interaktif, dan performa tinggi. Platform ini menggabungkan booking fasilitas olahraga, sports analytics lab, e-commerce peralatan & nutrisi olahraga, turnamen & event, serta dashboard atlet terintegrasi.

---

## 🌟 Fitur Utama (Key Features)

### 1. 🏟️ **Arena Hub & Smart Booking**
- Reservasi lapangan olahraga real-time (Hardwood Basketball, Roland Clay Tennis, Padel Court, Sprint Track).
- Pemilihan jadwal waktu, trainer/coach berlisensi, dan instant digital pass generasi QR Code.

### 2. 🧬 **Sports Performance Lab & Biometrics**
- Visualisasi tracking performa atlet (VO2 Max, Jump Elevation, Readiness Score, Recovery index).
- Pemantauan metrik latihan, nutrisi, dan kualitas tidur interaktif.

### 3. 🛍️ **Pro Gear Store & Seamless Checkout**
- Katalog produk eksklusif (Equipment, Apparel, Recovery & Nutrition).
- Filter berdasarkan kategori & jenis olahraga.
- Keranjang belanja interaktif dan sistem checkout multi-opsi (Smart Locker Pickup / Courier Delivery).

### 4. 🏆 **Events, Camps & Tournament Bracket**
- Daftar kejuaraan & training camp profesional.
- Visualisasi bracket turnamen interaktif dengan jadwal dan status eliminasi langsung.

### 5. 👤 **Member & Athlete Dashboard**
- Profil atlet dengan ringkasan status keanggotaan (Pro Athlete Tier).
- Dynamic QR Pass untuk akses check-in lapangan / fasilitas.
- Riwayat pesanan & booking dengan update status real-time.

### 6. 🎨 **Rich UI/UX & Micro-Animations**
- Animasi transisi halaman halus menggunakan **Motion (`motion/react`)**.
- Desain modern, clean high-contrast palet oranye & gelap yang sporty dan responsif di semua perangkat.

---

## 🛠️ Tech Stack

- **Framework / Library**: React 19, TypeScript
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS v4, Vanilla CSS Design System
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion v12)
- **AI Integration Support**: Google GenAI SDK (`@google/genai`)

---

## 📁 Struktur Direktori (Project Structure)

```text
granger-sportainment/
├── public/                 # Static assets & favicon
├── src/
│   ├── components/         # Komponen UI modular
│   │   ├── AboutPage.tsx
│   │   ├── ActivitySection.tsx
│   │   ├── ArenaHubPage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── BookingPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── EventListSection.tsx
│   │   ├── EventsPage.tsx
│   │   ├── FooterSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LabPage.tsx
│   │   ├── Modals.tsx
│   │   ├── Navbar.tsx
│   │   ├── PageLoadingShell.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── ProgramSection.tsx
│   │   ├── TestimonialBookingSection.tsx
│   │   ├── TournamentBracket.tsx
│   │   └── TrackingSection.tsx
│   ├── data/               # Mock data produk, events, & master data
│   │   └── productsData.ts
│   ├── App.tsx             # Root layout & routing state switcher
│   ├── main.tsx            # Entry point React
│   ├── types.ts            # Type definitions TypeScript
│   └── index.css           # Global typography & Tailwind styles
├── BACKEND_ARCHITECTURE_ROADMAP.md # Panduan arsitektur backend & database
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Panduan Menjalankan Aplikasi (Getting Started)

### Prasyarat:
- [Node.js](https://nodejs.org/) versi 18 atau lebih baru.
- npm atau pnpm / yarn.

### 1. Clone Repository
```bash
git clone https://github.com/gyonmd-tech/granger.git
cd granger
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka browser dan akses: `http://localhost:3000`

### 4. Build untuk Production
```bash
npm run build
```

---

## 📄 Lisensi
Distributed under the Apache-2.0 License.

---
*Built with ❤️ for sports enthusiasts and athletes.*
