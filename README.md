Job Portal Application
A full-stack Job Portal Application built using the MERN Stack (MongoDB, Express, React, Node.js).
The platform allows employers to post jobs and candidates to apply for them with secure authentication and protected routes


Tech Stack
Frontend
React
Vite
React Router
Axios
Context API

Backend
Node.js
Express.js
JWT Authentication
REST API Architecture

Database
MongoDB
Mongoose

DevOps
Docker
Docker Compose

Features
Authentication
User Registration
User Login
JWT Token Authentication
Secure Password Handling

Protected Routes
Only authenticated users can access certain pages
Unauthorized users are redirected to login
Implemented using ProtectedRoute component

Role Based Access
Two types of users:
Candidate
View job listings
Apply for jobs
View applied jobs

Employer
Post jobs
Edit jobs
Delete jobs
View applicants
Role-based routing is implemented using RoleRoute component.

Job Management
Employers can:
Create jobs
Update jobs
Delete jobs
View their posted jobs
Applications System

Candidates can:
Apply for jobs
View their applications
Employers can:
View applicants for their jobs

Filtering
Users can filter jobs based on:
Role
Keywords
Filtering is implemented using query parameters in API requests.

Pagination
Pagination is used to load job listings in smaller chunks instead of loading all jobs at once.
This improves performance and user experience.
Implemented using:
skip()
limit()
in MongoDB queries.

RESTful APIs
Backend follows REST API design principles.

Example endpoints:
POST /api/auth/register
POST /api/auth/login
GET /api/jobs
POST /api/jobs
PUT /api/jobs/:id
DELETE /api/jobs/:id
POST /api/applications
GET /api/applications

Dockerized Setup
The project is containerized using Docker for easy setup and deployment.


Installation
Clone the repository
git clone https://github.com/your-username/job-portal.git
Navigate to the project folder
cd job_portal
Run Docker
docker-compose up --build

Access
Frontend: http://localhost:5173
Backend: http://localhost:5001

Environment Variables
Create a .env file and add:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000

Key Concepts Implemented
JWT Authentication
JWT tokens are generated during login and used to authenticate users for protected routes.

Protected Routes
Frontend routes are protected using a ProtectedRoute component which checks if a valid token exists before allowing access.

Role-Based Authorization
Access control is implemented using a RoleRoute component that restricts certain pages based on user roles (Employer or Candidate).

React Context API
Authentication state is managed globally using AuthContext.

RESTful API Architecture
The backend follows REST principles with separate controllers, routes, and middleware.

Middleware Authentication
Custom Express middleware verifies JWT tokens before allowing access to protected endpoints.

MongoDB Data Modeling
Separate models are used for:
Users
Jobs
Applications
Pagination & Filtering
Jobs can be filtered and paginated using MongoDB queries to improve performance.

Author
Abindas
