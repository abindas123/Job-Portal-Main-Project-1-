Project Structure

Job_Portal
│
├── Client
│   └── client
│       └── src
│           ├── Api
│           ├── Components
│           │   ├── Navbar.jsx
│           │   ├── Layout.jsx
│           │   ├── ProtectedRoute.jsx
│           │   └── RoleRoute.jsx
│           ├── Context
│           │   └── Authcontext.jsx
│           ├── Pages
│           │   ├── Candidate
│           │   ├── Employer
│           │   ├── Login.jsx
│           │   ├── Register.jsx
│           │   └── Home.jsx
│           └── Routes
│               └── Approutes.jsx
│
├── Server
│   ├── Config
│   │   └── db.js
│   ├── Controllers
│   │   ├── Authcontroller.js
│   │   └── Jobcontroller.js
│   ├── Middleware
│   │   └── AuthMiddleware.js
│   ├── Models
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Application.js
│   ├── Routes
│   │   ├── Authroutes.js
│   │   ├── Jobroutes.js
│   │   └── ApplicationRoutes.js
│   └── server.js
│
└── docker-compose.yml
