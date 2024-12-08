# Aplikasi Microservices Manajemen SDM 
## Frontend
Ini adalah aplikasi frontend untuk **Aplikasi Microservices Manajemen SDM Sederhana**. Dibangun menggunakan **React.js** untuk mengelola antarmuka pengguna.

## 📋 Fitur
- **Autentikasi**: Login dan logout pengguna.
- **Dashboard**: Menampilkan informasi karyawan dan permohonan cuti.
- **Manajemen Karyawan**: CRUD data karyawan.
- **Manajemen Permohonan Cuti**: Membuat, mengelola, dan melihat status permohonan cuti.

## 🛠️ Teknologi yang Digunakan
- React.js
- Axios (untuk HTTP Request)
- React Router (untuk navigasi)
- TailwindCSS (Styling)

## ⚡ Cara Menjalankan Aplikasi
1. Clone repositori:
   ```bash
   git clone https://github.com/rizkinp/manajemen-sdm-test.git
   cd manajemen-sdm-test
   cd frontend
   ```
2. Install Dependensi
   ```bash
   npm install
   ```
3. Konfigurasi ENV
   - Buat file .env di root project
   - Tambahkan variabel berikut
   - ```bash
     REACT_APP_API_GATEWAY_URL=http://localhost:5000
     ```
4. Jalankan Aplikasi
   ```bash
   npm start
   ```
5. Aplikasi akan berjalan di http://localhost:5173.
6. Aplikasi frontend di-deploy menggunakan [Vercel](https://vercel.com/). Anda bisa mengakses aplikasi ini di
   ```bash
   https://manajemen-sdm-test.vercel.app/
   ```
   
-----------

## **Backend 
Backend untuk **Aplikasi Microservices Manajemen SDM Sederhana** terdiri dari beberapa layanan microservices:
1. **Gateway API**: Pintu masuk utama untuk semua request.
2. **Employee Service**: Layanan untuk mengelola data karyawan.
3. **Leave Service**: Layanan untuk mengelola permohonan cuti.

### 📋 Fitur
- **Gateway API**: Mengarahkan request ke layanan microservices terkait.
- **Employee Service**:
  - Login, Register. dan lihat data karyawan dengan JWT
- **Leave Service**:
  - Buat permohonan cuti.

### 🛠️ Teknologi yang Digunakan
- **Node.js** dan **Express.js**
- **MongoDB** dengan **Mongoose** untuk database
- **Docker** dan **Docker Compose** Untuk containerization
- dan beberapa libraru yang dibuuthkan

### ⚡ Cara Menjalankan Aplikasi
1. Clone repositori:
   ```bash
   git clone https://github.com/rizkinp/manajemen-sdm-test.git
   cd manajemen-sdm-test
   cd backend
   ```
2. Install Dependensi di setiap Layanan
   - Gateway
     ```bash
     cd gateway
     npm install
     ```
   - Employee Service
     ```bash
     cd ../employee-service
     npm install
   - Leave Service
     ```bash
     cd ../leave-service
     npm install
     ```
3. Konfigurasi ENV
   Buat file .env di setiap layanan (gateway, employee-service, dan leave-service).
   - gateway/.env
     ```bash
     PORT=5000
     EMPLOYEE_SERVICE_URL=http://localhost:5001
     LEAVE_SERVICE_URL=http://localhost:5002
     ```
   - employee-service/.env
     ```bash
     PORT=5001
     MONGO_URI=mongodb://localhost:27017/employeeDB
     JWT_SECRET=manajemen-sdm
     ```
   - leave-service/.env
     ```bash
     PORT=5002
     MONGO_URI=mongodb://localhost:27017/leaveDB
     JWT_SECRET=manajemen-sdm
4. Jalankan setiap layanan
   - Gateway
     ```bash
     cd gateway
     npm start
     ```
   - Employee Service
     ```bash
     cd employee-service
     npm start
     ```
   - Leave Service
     ```bash
     cd leave-service
     npm start
     ```
5. Dokementasi API
   ```bash
   ```
6. 🚀 Deployment
Aplikasi backend di-deploy menggunakan [Railway](https://railway.app/).
Endpoint Gateway API dapat diakses di:
```bash
https://gateway-production-2fb3.up.railway.app/
```


## 🐳 Cara menjalankan dengan Docker Compose
1. Clone repositori:
   ```bash
   git clone https://github.com/rizkinp/manajemen-sdm-test.git
   cd manajemen-sdm-test
   ```
2. Pastikan Anda memiliki Docker dan Docker Compose yang telah terinstall. Periksa dengan:
   ```bash
   docker --version
   docker-compose --version
   ```
3. Jalankan aplikasi dengan Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. Akses Layanan:
   - Frontend :  http://localhost:5173
   - Backend/gateway :  http://localhost:5000
   - Backend/employee-service :  http://localhost:5001
   - Backend/leave-service:  http://localhost:5002
   - MonggoDB   
