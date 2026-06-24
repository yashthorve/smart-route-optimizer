# 🚚 Smart Route Optimizer

A full-stack logistics management platform that helps delivery companies optimize multi-stop delivery routes using **Google OR-Tools**. The application uses a **microservice architecture**, separating the backend API from the route optimization engine to ensure scalability and better performance.

## 🌐 Live Demo

https://smart-route-optimizer-delta.vercel.app

---

## 📖 Overview

Smart Route Optimizer allows users to:

- Create an account and securely log in
- Add delivery destinations using addresses
- Automatically convert addresses into geographic coordinates
- Optimize delivery routes using Google's OR-Tools
- Track delivery status
- View optimized routes through a modern React dashboard

The optimization engine solves the **Travelling Salesperson Problem (TSP)** to generate the shortest possible delivery route.

---

## 🏗 Architecture

```
React Frontend
       │
       ▼
Node.js + Express API
       │
       ├──────── PostgreSQL (Neon)
       │
       ├──────── OpenStreetMap Nominatim API
       │
       ▼
Python Flask Optimization Service
       │
       ▼
Google OR-Tools
```

The application follows a microservice architecture where:

- React handles the user interface
- Express manages authentication and business logic
- Flask performs computationally intensive route optimization
- PostgreSQL stores application data
- Google OR-Tools computes the optimized delivery sequence

---

## ✨ Features

### Authentication

- JWT Authentication
- Password hashing using bcrypt
- Protected API routes
- User-specific delivery data

### Route Management

- Add delivery locations
- Edit destinations
- Delete destinations
- Track package status

### Route Optimization

- Google OR-Tools integration
- Solves Travelling Salesperson Problem (TSP)
- Generates shortest delivery path
- Dynamic distance matrix generation

### Geolocation

- Address autocomplete
- Forward geocoding
- Latitude & Longitude generation
- OpenStreetMap Nominatim API integration

### Dashboard

- Responsive UI
- Logistics dashboard
- Route visualization
- Delivery management

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- CSS3
- Axios

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt

## Optimization Service

- Python
- Flask
- Google OR-Tools

## Database

- PostgreSQL
- Neon Database

## APIs

- OpenStreetMap Nominatim API

## Deployment

- Vercel
- Render
- Neon

---

# 📂 Project Structure

```
smart-route-optimizer/

│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── server.js
│
├── optimizer-service/
│   ├── app.py
│   ├── solver.py
│   └── requirements.txt
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/smart-route-optimizer.git

cd smart-route-optimizer
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Python Optimization Service

```bash
cd optimizer-service

pip install -r requirements.txt

python app.py
```

---

# 🔐 Environment Variables

Backend

```
PORT=

DATABASE_URL=

JWT_SECRET=

PYTHON_SERVICE_URL=
```

Frontend

```
VITE_API_URL=
```

Python Service

```
PORT=
```

---

# 📷 Screenshots

Add screenshots here:

- Login Page
- Dashboard
- Route Optimization
- Delivery Management

---

# 📈 Future Improvements

- Google Maps integration
- Live traffic optimization
- Vehicle capacity optimization
- Driver assignment
- Multiple warehouse support
- ETA prediction
- Real-time GPS tracking
- Delivery analytics dashboard

---

# 🧠 What I Learned

During this project I gained practical experience with:

- Designing REST APIs
- JWT Authentication
- Microservice Architecture
- PostgreSQL Database Design
- Google OR-Tools
- Python & Flask Integration
- Full Stack Deployment
- API Integration
- Backend System Design
- Cloud Deployment

---

# 👨‍💻 Author

**Yash Thorve**

Backend-Focused Full Stack Developer

GitHub:
https://github.com/yashthorve

LinkedIn:
https://linkedin.com/in/YOUR-LINKEDIN

Email:
yashthorve96@gmail.com

---

## ⭐ If you found this project useful, consider giving it a Star!