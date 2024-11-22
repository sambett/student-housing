# 🏠 Student Housing Management System

A modern full-stack application for managing student accommodations, featuring a powerful Java backend and sleek React frontend. Built with performance and user experience in mind.

**🎯 Learning Focus: REST Web Services**  

> 🚀 This project was developed as part of my journey learning RESTful Web Services, demonstrating practical implementation of REST principles in a real-world application.
## ⚡ Tech Stack

### 🔧 Backend 
- Java 21
- Apache Tomcat 8.5.96
- Jersey 2.34 (JAX-RS implementation)
- MySQL 8.0.27
- Maven 3.9.9
- IDE: Visual Studio Code

### 🎨 Frontend 
- React 18
- TypeScript 5
- Tailwind CSS 3
- Vite 5.0
- Node.js 18.17.0
- npm 9.6.7
- Lucide Icons
- ShadCN UI Components

## 🏗️ Architecture

```
Backend (Java REST API) ←→ MySQL Database ←→ React Frontend
```

## 📊 Database Structure

```sql
CREATE TABLE properties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    rooms INT NOT NULL,
    address VARCHAR(200) NOT NULL,
    neighborhood VARCHAR(100),
    contact_phone VARCHAR(20)
);
```

## 🔌 API Endpoints

```
GET    /api/properties         → List all properties
POST   /api/properties        → Create property
GET    /api/properties/{id}    → Get property details
PUT    /api/properties/{id}    → Update property
DELETE /api/properties/{id}    → Delete property
GET    /api/properties/search  → Search with filters
```

## 📁 Project Structure

```
student-housing/
├── java-app/                # Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── housing/
│   │       │           ├── config/      # Jersey & DB configs
│   │       │           ├── dao/         # Data access
│   │       │           ├── model/       # Property entity
│   │       │           └── resources/   # REST endpoints
│   │       └── webapp/
│   │           └── WEB-INF/
│   └── pom.xml
│
└── student-housing-client/   # Frontend
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── pages/          # Main views
    │   ├── services/       # API communication
    │   └── types/         # TypeScript interfaces
    ├── package.json
    └── vite.config.ts
```

## 🚀 Features

### Property Management
- 📝 Create and modify property listings
- 🔍 Advanced search functionality
- 📱 Responsive design
- ✨ Real-time form validation

### Search Capabilities
- 💰 Price range filtering
- 🛏️ Room number filtering
- 📍 Neighborhood search
- 🔄 Real-time results

## ⚙️ Setup Guide

### Backend Configuration

1. Configure MySQL:
```sql
CREATE DATABASE student_housing;
USE student_housing;
```

2. Update `DatabaseConfig.java`:
```java
private static final String URL = "jdbc:mysql://localhost:3306/student_housing";
private static final String USER = "your_username";
private static final String PASSWORD = "your_password";
```

3. Deploy:
```bash
cd java-app
mvn clean install
# Deploy WAR to Tomcat 8.5.96
```

### Frontend Setup

```bash
cd student-housing-client
npm install
npm run dev
```

Access the application at:
- Frontend: http://localhost:5174
- Backend: http://localhost:8080/student-housing-1.0-SNAPSHOT/api

---

## 🤝 Contributing
This is a learning project focused on REST web services. Suggestions and improvements are welcome

## 📜 License
This project is open source and available for other students learning REST web services.

---