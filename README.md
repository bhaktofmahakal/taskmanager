# Task Manager App

A full-stack task management application built with React and Node.js.

## 🚀 Features

- **Authentication**: JWT-based user registration and login
- **Task Management**: Create, edit, delete, and toggle task status
- **Filtering**: Filter tasks by status, priority, and search
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Instant UI updates after operations

## 🛠️ Tech Stack

### Frontend
- React 18
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- bcrypt

## 📦 Installation

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

## 🔧 Manual Setup

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

## 🎯 Demo Credentials

```
Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123
```

## 🧪 Testing

Run E2E tests with Playwright:
```bash
npm test
```

## 📱 How to Use

1. **Register**: Create a new account or use demo credentials
2. **Login**: Access your personal dashboard
3. **Create Tasks**: Add tasks with title, description, priority, and due date
4. **Manage Tasks**: Edit, complete, or delete tasks
5. **Filter & Search**: Find tasks quickly with built-in filters

## 🌐 Deployment

### Environment Variables

Create `.env` files in both `server/` and `client/` directories:

**server/.env**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
PORT=5000
```

**client/.env**
```
REACT_APP_API_URL=your_backend_url
```

### Deploy to Production

- **Frontend**: Vercel, Netlify
- **Backend**: Render, Railway, Heroku
- **Database**: MongoDB Atlas (already configured)

## 📁 Project Structure

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

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting on auth endpoints
- CORS protection
- Input validation and sanitization

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using React and Node.js