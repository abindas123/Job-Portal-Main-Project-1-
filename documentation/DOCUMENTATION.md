Job Portal Application
Full Stack MERN Project Documentation

1. Introduction
The Job Portal Application is a full-stack web platform developed using the MERN Stack (MongoDB, Express, React, Node.js).
The application allows employers to post job opportunities and candidates to browse and apply for jobs. The system includes secure authentication, protected routes, job management, filtering, pagination, and RESTful APIs.
Docker is used to containerize the application, making it easy to run the project across different environments.

2. Screenshots

Add screenshots of your application here.

Examples:
Home Page
Login Page
Register Page
Job Listings
Job Filtering
Pagination
Employer Dashboard

3. Features

User Authentication using JWT
Protected Routes for secure access
Job Listings for available opportunities
Filtering jobs by role and location
Pagination for efficient data loading

CRUD operations for job postings
RESTful API communication
Dockerized application setup

4. Tech Stack
Frontend
React
Vite
React Router
Axios

Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Authentication
JSON Web Tokens (JWT)

DevOps
Docker
Docker Compose

5. Key Concepts Implemented
JWT Authentication & Authorization
JWT is used for secure authentication. When a user logs in, the server generates a token. This token is sent with each request to verify the user’s identity.
The backend middleware verifies the token before allowing access to protected routes.
Protected Routes
Protected routes restrict access to certain pages in the application.
Only authenticated users with a valid JWT token can access these routes. If a user is not authenticated, they are redirected to the login page.

Pagination
Pagination is used to load data in smaller chunks instead of loading all data at once.
Benefits:
Improves performance
Reduces page load time
Enhances user experience
Pagination is implemented using:
skip()
limit()
in MongoDB queries.

Filtering
Filtering allows users to search jobs based on criteria such as role or location.
Filtering is implemented using:
Query parameters
MongoDB regex for partial and case-insensitive matching

6. Installation
Step 1: Clone the repository
git clone https://github.com/abindas123/Job-Portal-Main-Project-1-.git
Step 2: Navigate to the project directory
cd Job-Portal-Main-Project-1-
Step 3: Run the application using Docker
docker-compose up --build

7. API Endpoints
Authentication APIs
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
Job APIs
Method	Endpoint	Description
GET	/api/jobs	Get all jobs
POST	/api/jobs	Create a job
PUT	/api/jobs/:id	Update job
DELETE	/api/jobs/:id	Delete job

8. Future Improvements
Save jobs feature
Job application tracking
Admin dashboard
Advanced search and sorting
Email notifications
Resume upload system

9. Author
Abindas
