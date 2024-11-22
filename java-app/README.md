# 🏠 Student Housing Project
> **🎯 Learning Focus: REST Web Services**  
> 🚀 This project was developed as part of my journey learning RESTful Web Services, demonstrating practical implementation of REST principles in a real-world application.

## 📚 Learning REST Architecture
This project helped me understand core REST concepts:
- 🔄 RESTful API design and implementation
- 🌐 HTTP methods (GET, POST) for CRUD operations
- 🛣️ Resource-based URL structuring
- ⚡ Stateless communication
- 📦 JSON data formatting
- 🔒 Cross-Origin Resource Sharing (CORS)

## 🎨 Project Overview
Built as a practical exercise in REST web services, this system consists of two main applications:
- **🔙 Java Backend**: 
  - ⚙️ Implements REST API endpoints using Jersey
  - 📡 Demonstrates REST resource handling
  - ✅ Shows proper HTTP status code usage
  - 🔄 Implements proper request/response cycles
- **🖥️ Python Frontend**: 
  - 🌐 Consumes REST APIs
  - 🔌 Shows client-side integration with REST services

### 🛠️ Technologies Used
#### 🏗️ Backend (Java)
- ☕ Java 11+
- 🚀 Jersey framework for REST implementation
- 🎯 Maven for dependency management
- 💾 MySQL database
- 🌐 Tomcat 8.5.92 server

#### 🎨 Frontend (Python)
- 🐍 Python 3.8+
- 🌶️ Flask web framework
- 🔌 REST client implementation

## ⭐ REST API Features
### 🔥 Implemented REST Endpoints
```
🔍 GET    /api/properties     - List all properties (Collection resource)
➕ POST   /api/properties     - Create new property
🎯 GET    /api/properties/{id} - Get specific property (Individual resource)
```

### 🏆 REST Design Principles Applied
- 🎯 Resource-based URLs
- 🔄 Proper HTTP method usage
- ⚡ Stateless communication
- 📦 JSON response formatting
- ✅ Appropriate status codes
- 🔒 CORS handling

## ⚙️ Setup Instructions

### 1️⃣ Database Setup
```sql
CREATE DATABASE student_housing;
USE student_housing;
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

### 2️⃣ REST Backend Setup
1. 💻 Install Java 11+ and Maven
2. 📂 Clone the repository
3. 🔑 Update database credentials in `DatabaseConfig.java`
4. 🚀 Run `mvn clean install`
5. 📤 Deploy the WAR file to Tomcat

### 3️⃣ Frontend Setup
1. 🐍 Install Python 3.8+
2. 🌶️ Install Flask: `pip install flask`
3. 🚀 Run the Flask application: `python app.py`

## 📁 Project Structure
```
student-housing/
├── java-app/          # 🔙 REST Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── housing/
│   │       │           ├── resources/    # 🎯 REST endpoints
│   │       │           ├── model/        # 📦 Data models
│   │       │           └── config/       # ⚙️ REST configuration
│   └── pom.xml
└── python-app/        # 🖥️ REST Client
    ├── app.py
    ├── templates/
    └── static/
```

## 🎓 Learning Outcomes
Through this REST-focused project, I learned:
- 📚 REST architectural principles and constraints
- ⚡ Building RESTful APIs with Java and Jersey
- 🔌 Consuming REST services in a Python client
- 🌐 HTTP protocol and proper status code usage
- 📝 API documentation and testing
- 🔒 Cross-Origin Resource Sharing (CORS)
- 💾 Database integration with REST services
- 🏗️ Client-server separation in REST architecture

## 📚 Key Resources Used
- 📖 Jersey REST framework documentation
- 🎯 RESTful Web Services tutorials
- 🌐 HTTP protocol specifications
- ⭐ REST API design guidelines
- 🔧 Postman for API testing

## 🤝 Contributing
This is a learning project focused on REST web services. Suggestions and improvements are welcome! Feel free to:
1. 🍴 Fork the repository
2. 🌿 Create a feature branch
3. 🎯 Submit a pull request

## 📬 Contact
If you have questions about REST implementation or this project, feel free to reach out!

---

## 📜 License
This project is open source and available for other students learning REST web services.

---

