# 🏠 GetSomeHelp

**GetSomeHelp** adalah aplikasi **platform pencarian freelancer home service** seperti **plumbing, electrician, AC service, cleaning, dan layanan rumah lainnya**.

Project ini menggunakan arsitektur **Fullstack Modern** dengan:

- **React + Vite** sebagai Frontend
- **Laravel 12** sebagai Backend (REST API)

## 🎯 Fitur Utama

- 🔍 Cari freelancer berdasarkan layanan
- ⭐ Rating & review freelancer
- 📍 Lokasi & ketersediaan
- 📅 Booking jasa
- 🔐 Autentikasi user & freelancer

## ⚙️ Tech Stack

### Frontend

- ⚛️ React
- ⚡ Vite
- 🌐 Axios
- 🎨 Tailwind CSS
- 🎨 MUI

### Backend

- 🔥 Laravel 12
- 🐘 PHP 8.2+
- 🗄️ SQLite
- 📦 Composer

## 🛠️ Prerequisites

Pastikan sudah terinstall:

- Node.js ≥ 20
- NPM / Yarn / PNPM
- PHP ≥ 8.2
- Composer
- Git

# ▶️ Menjalankan Project di Local

## 1️⃣ Backend — Laravel 12 API

### Masuk folder backend

```bash
cd backend
```

### Install dependency

```bash
composer install
```

### Copy File Environment

```bash
cp .env.example .env
```

### Konfigurasi `.env` Backend

```bash
APP_NAME=GetSomeHelp
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=sqlite

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

VITE_APP_NAME="${APP_NAME}"
```

### Setup Database

```bash
touch database/database.sqlite
php artisan migrate --seed
```

### Jalankan Backend

```bash
composer run dev
```

## 2️⃣ Frontend — React + Vite

### Masuk folder frontend

```bash
cd frontend
```

### Install dependency

```bash
npm install
```

### Buat file `.env`

```bash
touch .env
```

### Konfigurasi `.env` Frontend

```bash
VITE_API_URL=http://localhost:8000/api
VITE_BACKEND_URL=http://localhost:8000
```

> ⚠️ Semua environment variable Vite harus diawali VITE\_

### Jalankan Frontend

```bash
npm run dev
```

> Frontend berjalan di http://localhost:5174

✨ GetSomeHelp — Solusi cepat untuk semua kebutuhan home service Anda.
