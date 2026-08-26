# 🏛️ Granger Sportainment — Backend Architecture & Feature Roadmap

Dokumen ini memuat analisis sistem, spesifikasi arsitektur backend, skema database, integrasi IoT/telemetri, dan rencana pengembangan fitur lanjutan untuk **Granger Sportainment Platform**.

---

## 📑 Daftar Isi
1. [Ringkasan Ekosistem](#1-ringkasan-ekosistem)
2. [Arsitektur Backend & Tech Stack](#2-arsitektur-backend--tech-stack)
3. [Skema Database Relasional & Time-Series](#3-skema-database-relasional--time-series)
4. [Rincian 7 Modul Fitur Backend](#4-rincian-7-modul-fitur-backend)
5. [Spesifikasi REST & WebSocket API](#5-spesifikasi-rest--websocket-api)
6. [Roadmap Implementasi Bertahap](#6-roadmap-implementasi-bertahap)

---

## 1. Ringkasan Ekosistem
Granger Sportainment adalah platform terintegrasi untuk fasilitas olahraga *high-performance* yang mencakup:
- **Hardwood Basketball Arena** & **Roland Clay Tennis Stadium**
- **Biomechanics Kinematics Lab** & **Hydro-Recovery Contrast Pools**
- **Olympic Coaching & Youth Sports Academy**
- **Pro Shop E-Commerce & Official Gear**
- **Tournament Circuits & Sanctioned Leagues**

---

## 2. Arsitektur Backend & Tech Stack

```
[ Client: Web / iOS / Android ]
              │ (HTTPS / WSS)
              ▼
[ Cloudflare CDN & API Gateway ]
              │
    ┌─────────┴──────────────┬─────────────────────────┐
    ▼                        ▼                         ▼
[ Auth Service ]     [ Core API (NestJS/Go) ]   [ Real-Time WebSocket ]
 (JWT / OAuth2)              │                    (Socket.io / Redis)
                             │
    ┌────────────────────────┼─────────────────────────┐
    ▼                        ▼                         ▼
[( PostgreSQL )]    [( TimescaleDB )]          [( Redis Cache )]
- Users & Profiles   - Heart Rate Stream        - Concurrency Lock
- Bookings & Courts  - Kinematic Accelerometer  - Live Leaderboards
- Orders & Inventory - Recovery Metrics         - Session State
```

### Rekomendasi Teknologi
- **Runtime**: Node.js (NestJS) atau Go (Golang).
- **Primary Database**: PostgreSQL 16+ dengan Prisma / Drizzle ORM.
- **Time-Series Sensor DB**: TimescaleDB untuk streaming detak jantung, kalori, dan akselerometer.
- **Cache & Concurrency**: Redis (penguncian slot booking anti double-booking, sesi, leaderboard).
- **Real-Time Communication**: Socket.io / Native WebSockets untuk skor langsung dan okupansi arena.
- **Payment Gateway**: Stripe & Midtrans / Xendit (Kartu Kredit, QRIS, Virtual Account, e-Wallet).
- **Storage**: AWS S3 / Cloudflare R2 untuk video analisis gerakan dan gambar produk.

---

## 3. Skema Database Relasional & Time-Series

### A. Tabel Pengguna & Autentikasi (`users`, `athlete_profiles`)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'ATHLETE', -- ATHLETE, COACH, REFEREE, ADMIN
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE athlete_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    membership_tier VARCHAR(50) DEFAULT 'STANDARD', -- STANDARD, PRO, OLYMPIC
    primary_sport VARCHAR(50),
    recovery_score INT DEFAULT 85,
    qr_access_token VARCHAR(255) UNIQUE,
    emergency_contact VARCHAR(100)
);
```

### B. Tabel Lapangan & Pemesanan (`facilities`, `court_slots`, `bookings`)
```sql
CREATE TABLE facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- HARDWOOD, CLAY, HYDRO, LAB
    hourly_rate DECIMAL(10,2) NOT NULL,
    capacity INT NOT NULL,
    status VARCHAR(30) DEFAULT 'ACTIVE'
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    facility_id UUID REFERENCES facilities(id),
    coach_id UUID REFERENCES users(id),
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, PAID, CANCELLED
    qr_pass_code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### C. Tabel E-Commerce Pro Shop (`products`, `orders`, `order_items`)
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    sport VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 5.0,
    images JSONB NOT NULL DEFAULT '[]',
    is_in_stock BOOLEAN DEFAULT true
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PROCESSING', -- PROCESSING, SHIPPED, DELIVERED
    shipping_address JSONB NOT NULL,
    tracking_number VARCHAR(100),
    payment_method VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### D. Tabel Time-Series Biometrik (`biometric_telemetry`)
```sql
CREATE TABLE biometric_telemetry (
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    athlete_id UUID NOT NULL,
    heart_rate INT,
    hr_zone VARCHAR(10), -- ZONE_1 to ZONE_5
    speed_kmh DECIMAL(4,1),
    calories_burned DECIMAL(6,1),
    active_sport VARCHAR(50)
);
SELECT create_hypertable('biometric_telemetry', 'time');
```

---

## 4. Rincian 7 Modul Fitur Backend

### 🎟️ 1. Booking & Reservation Engine
- **Distributed Concurrency Lock (Redis)**: Mencegah pemesanan ganda pada milidetik yang sama. Slot di-*hold* selama 10 menit selama checkout.
- **Dynamic Pricing**: Tarif otomatis berdasarkan jam sibuk (*Peak vs Off-Peak*).
- **Rotating QR Access Pass**: Kode QR terenkripsi yang diperbarui setiap 60 detik untuk akses pintu arena otomatis.

### 💓 2. Telemetry Ingestion & AI Biometrics
- **Wearable API**: Integrasi Apple HealthKit, Garmin, WHOOP, dan Polar.
- **AI Recovery Score**: Menghitung skor kesiapan otot (0-100) dan mendeteksi risiko cedera (*overtraining alert*).

### 🏆 3. Tournament, Brackets & Live Scoring
- **Automated Bracket Generator**: *Single/Double Elimination*, *Round Robin*, *Swiss System*.
- **Referee Tablet Dashboard**: Input skor wasit langsung tersinkronisasi ke penonton web dan layar LED arena via WebSocket (<50ms).
- **ELO Rating Leaderboard**: Peringkat komunitas atlet yang diperbarui otomatis pasca pertandingan.

### 🛍️ 4. Pro Shop E-Commerce & Multi-Gateway
- **Multi-variant Stock**: Kontrol stok presisi ukuran pakaian/sepatu.
- **Payment Gateways**: Kartu Kredit/Debit, QRIS, Virtual Account, Apple Pay, Stripe.
- **Shipping Logistics API**: Kalkulasi ongkir otomatis & pelacakan resi real-time.

### 📹 5. AI Computer Vision Kinematics
- Unggah video gerakan atlet (*shooting form* basket atau *serve/backhand* tenis).
- Deteksi sudut sendi dan estimasi pose menggunakan MediaPipe / AI Vision.
- Fitur anotasi gambar & *voice note* untuk pelatih.

### 👥 6. Authentication, RBAC & Digital Locker
- Peran berjenjang: `ATHLETE`, `COACH`, `REFEREE`, `ADMIN`.
- Keamanan: JWT dengan rotasi token, OAuth 2.0 (Google, Apple), dan 2FA.

### 🔔 7. Automated Omnichannel Notifications
- Pengingat booking otomatis via WhatsApp API & SMS 2 jam sebelum sesi.
- E-tiket dan struk belanja via Email Transaksional (Resend/SendGrid).
- Push Notifications (Firebase Cloud Messaging) untuk skor turnamen live.

---

## 5. Spesifikasi REST & WebSocket API

| Endpoint | Method | Keterangan |
| :--- | :--- | :--- |
| `/api/v1/auth/register` | `POST` | Pendaftaran atlet baru |
| `/api/v1/auth/login` | `POST` | Autentikasi dan penerbitan JWT token |
| `/api/v1/facilities/occupancy` | `GET` | Mengambil status okupansi real-time kampus |
| `/api/v1/bookings/slots` | `GET` | Pengecekan ketersediaan slot lapangan |
| `/api/v1/bookings/reserve` | `POST` | Mengunci slot dan memproses booking |
| `/api/v1/products` | `GET` | Katalog gear, suplemen & apparel |
| `/api/v1/orders/checkout` | `POST` | Pembayaran keranjang belanja Pro Shop |
| `/api/v1/events` | `GET` | Jadwal sirkuit turnamen dan turnamen terbuka |
| `/api/v1/events/:id/register` | `POST` | Pendaftaran tim / atlet ke turnamen |
| `/api/v1/telemetry/sync` | `POST` | Sinkronisasi data detak jantung & sensor |
| `ws://api.granger.com/live-score` | `WSS` | Stream skor pertandingan turnamen real-time |

---

## 6. Roadmap Implementasi Bertahap

```
[FASE 1: CORE REST API & AUTHENTICATION]
├── Setup NestJS / Go + PostgreSQL + Prisma ORM
├── Sistem Autentikasi JWT & Role-Based Access Control (Athlete, Coach, Admin)
└── API Booking Lapangan & Pelatih dengan Redis Lock

[FASE 2: PRO SHOP E-COMMERCE & NOTIFIKASI]
├── API Katalog Produk, Manajemen Stok, dan Keranjang
├── Integrasi Payment Gateway (Stripe / Midtrans / QRIS)
└── Integrasi Notifikasi WhatsApp & Email Transaksional

[FASE 3: TOURNAMENT ENGINE & LIVE IOT STREAMING]
├── WebSocket Server untuk Live Match Scoring & Okupansi
├── Automated Bracket Generator & Portal Wasit
└── TimescaleDB Setup & Wearable Health Integration

[FASE 4: AI KINEMATICS & ENTERPRISE ANALYTICS]
├── AI Biometric Readiness Score
├── Modul Analisis Video Gerakan Atlet
└── Executive Campus Analytics Dashboard
```

---
*Dokumen ini dibuat dan disimpan sebagai referensi arsitektur teknis resmi Granger Sportainment.*
