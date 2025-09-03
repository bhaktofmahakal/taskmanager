# Task Manager - Full-Stack Web Application

A modern, responsive task management application built with React and Node.js. Experience seamless task organization with real-time updates and intuitive design.

## Live Demo

**Application**: https://task-manager-frontend-wine-eight.vercel.app/
**API**: https://taskmanager-39ib.onrender.com  
**GitHub**: https://github.com/bhaktofmahakal/taskmanager

## Features

- **Authentication**: JWT-based user registration and login with secure password hashing
- **Task Management**: Create, edit, delete, and toggle task status with ease
- **Advanced Filtering**: Filter tasks by status, priority, and search functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Instant UI updates after operations
- **Dashboard Analytics**: Visual statistics and task overview
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Secure**: Protected routes, input validation, and CORS security

## Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Context** - State management

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database service
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing library
- **Mongoose** - MongoDB object modeling

### DevOps & Deployment
- **Vercel** - Frontend hosting platform
- **Render** - Backend hosting platform
- **GitHub** - Version control and collaboration
- **Playwright** - End-to-end testing framework

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Install dependencies**
   ```bash
   npm run install:all
   ```

2. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:5000

## Manual Setup

If the quick start doesn't work, you can start servers manually:

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm start
```

## Demo Credentials

For testing the live application, you can use these demo accounts:

```bash
# Demo User 1
Email: john@example.com
Password: password123

# Demo User 2  
Email: jane@example.com
Password: password123
```

**Or create your own account** - registration is quick and easy!

## Testing

Run E2E tests with Playwright:
```bash
npm test
```

## How to Use

1. **Register**: Create a new account or use demo credentials
2. **Login**: Access your personal dashboard
3. **Create Tasks**: Add tasks with title, description, priority, and due date
4. **Manage Tasks**: Edit, complete, or delete tasks
5. **Filter & Search**: Find tasks quickly with built-in filters

## Deployment

This application is **already deployed and live**! But if you want to deploy your own version:

### Live Deployment URLs
- **Frontend**: https://task-manager-frontend-wine-eight.vercel.app
- **Backend API**: https://taskmanager-39ib.onrender.com
- **Health Check**: https://taskmanager-39ib.onrender.com/api/health

### Environment Variables

Create `.env` files in both `server/` and `client/` directories:

**server/.env**
```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://vexocore:ToprVlwmtkl8ZrKA@vexocore.lmajm6l.mongodb.net/taskmanager
JWT_SECRET=your-super-secure-jwt-secret-key-at-least-32-characters
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**client/.env**
```bash
REACT_APP_API_URL=https://taskmanager-39ib.onrender.com/api
REACT_APP_NAME=Task Manager
REACT_APP_VERSION=1.0.0
```

### Deploy Your Own Version

#### Frontend (Vercel)
```bash
npm install -g vercel
cd client
vercel --prod
```

#### Backend (Render)
1. Go to [render.com](https://render.com)
2. New Web Service
3. Connect your GitHub repository
4. Root Directory: `server`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables from above

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── services/       # API services
│   └── public/
├── server/                 # Express backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   └── utils/              # Helper functions
└── tests/                  # E2E tests
```

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting on auth endpoints
- CORS protection
- Input validation and sanitization

## API Endpoints

Base URL: `https://taskmanager-39ib.onrender.com/api`

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Tasks
- `GET /api/tasks` - Get user tasks (with query filters)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update existing task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion status

### Health Check
- `GET /api/health` - Server health status

## Screenshots & Features

### Authentication
- Secure login and registration system
- JWT-based session management
- Password strength validation

### Dashboard
- Task statistics and analytics
- Visual progress indicators
- Quick action buttons

### Task Management
- Create tasks with due dates and priorities
- Edit tasks inline
- Drag-and-drop functionality (coming soon)

### Advanced Filtering
- Filter by status (All, Pending, Completed)
- Search by task title/description
- Sort by priority and due date

## Performance Features

- **Fast Loading**: Optimized build with code splitting
- **Mobile First**: Responsive design for all devices  
- **Offline Support**: Service worker for offline functionality (coming soon)
- **SEO Optimized**: Meta tags and structured data

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Run tests**: `npm test`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Submit a pull request**

### Development Guidelines
- Follow existing code style and conventions
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed

## Bug Reports & Feature Requests

Found a bug or have an idea? We'd love to hear from you!

- **Bug Reports**: [Create an Issue](https://github.com/bhaktofmahakal/taskmanager/issues)
- **Feature Requests**: [Start a Discussion](https://github.com/bhaktofmahakal/taskmanager/discussions)
- **Contact**: Open an issue for any questions

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **React Team** for the amazing library
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the flexible database solution
- **Vercel & Render** for seamless deployment platforms

---

<div align="center">
  
**Built with React, Node.js, and modern web technologies**

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://task-manager-frontend-wine-eight.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge)](https://github.com/bhaktofmahakal/taskmanager)
[![API](https://img.shields.io/badge/API-Live-orange?style=for-the-badge)](https://taskmanager-39ib.onrender.com)

</div>