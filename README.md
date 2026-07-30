# 💼 FullStack Job Posting App

A full-stack **Job Board** application built with **Spring Boot** (backend) and **React + Vite** (frontend).

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=flat-square&logo=vite)

---

## 📁 Project Structure

```
FullStack Job posting app/
├── Backend/          ← Spring Boot REST API (port 5000)
└── frontend/         ← React + Vite UI (port 5173)
```

---

## ✨ Features

- 📋 Browse all job listings
- 🔍 Search jobs by keyword or tech stack
- ➕ Post new job listings
- ✏️ Edit existing job posts
- 🗑️ Delete job posts
- ⚡ Load sample data with one click
- 🌙 Premium dark glassmorphism UI

---

## 🛠️ Tech Stack

### Backend
- Java 21 + Spring Boot 3.2.1
- Spring Data JPA + Hibernate
- MySQL 8.0
- Lombok
- Maven

### Frontend
- React 18 + Vite
- React Router v6
- Axios
- Vanilla CSS (Dark Glassmorphism Design)
- Google Fonts (Inter)

---

## 🚀 Getting Started

### Prerequisites
- Java 21+
- Maven
- MySQL 8.0
- Node.js 18+

### 1. Setup Database

Open MySQL and create the database:
```sql
CREATE DATABASE job;
```

### 2. Configure Backend

Edit `Backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/job
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### 3. Run the Backend

```bash
cd Backend
./mvnw spring-boot:run
```
Backend runs on → **http://localhost:5000**

### 4. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```
Frontend runs on → **http://localhost:5173**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/jobPosts` | Get all job posts |
| GET | `/jobPost/{id}` | Get job by ID |
| GET | `/jobPosts/keyword/{keyword}` | Search by keyword |
| POST | `/jobPost` | Create a new job post |
| PUT | `/jobPost` | Update a job post |
| DELETE | `/jobPost/{id}` | Delete a job post |
| GET | `/load` | Load sample data |

---

## 📸 Screenshots

> Browse Jobs • Add a Job • Job Detail View

---

## 👨‍💻 Author

**Adarsh Singh** — [GitHub](https://github.com/Adarshsingh99)
