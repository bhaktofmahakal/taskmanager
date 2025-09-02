# 🚀 Deployment Guide

## Frontend Deployment on Vercel

### Method 1: Deploy Client Folder Directly (Recommended)

1. **Create separate repository for client:**
   ```bash
   # Create new repo and copy client folder contents
   cp -r client/* new-frontend-repo/
   ```

2. **Or deploy client folder on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - **Set Root Directory to: `client`**
   - **Framework Preset: Create React App**
   - Deploy

### Method 2: Deploy from Root (Using vercel.json)

The project already has `vercel.json` configured to build from client directory:

```json
{
  "buildCommand": "npm run client:build",
  "outputDirectory": "client/build"
}
```

### Environment Variables for Frontend

Add these environment variables in Vercel dashboard:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## Backend Deployment on Render ✅ READY

### Quick Deploy Steps:
1. **Go to [render.com](https://render.com)** 
2. **New Web Service** → Connect GitHub repo
3. **Configuration:**
   ```
   Name: task-manager-api
   Root Directory: server
   Build Command: npm install  
   Start Command: npm start
   Health Check Path: /api/health
   ```
4. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://vexocore:ToprVlwmtkl8ZrKA@vexocore.lmajm6l.mongodb.net/taskmanager
   JWT_SECRET=ultra-secure-jwt-secret-key-at-least-32-characters-long
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

**📋 Complete guide: See `RENDER_DEPLOYMENT.md` for detailed instructions.**

## Alternative: Railway Deployment

### Frontend on Railway
```bash
# In client directory
railway login
railway link
railway up
```

### Backend on Railway
```bash
# In server directory  
railway login
railway link
railway up
```

## Manual Deployment Steps

### 1. Build Frontend Locally
```bash
cd client
npm run build
# Upload build folder to static hosting (Netlify, Surge, etc.)
```

### 2. Deploy Backend
```bash
cd server
# Deploy to Heroku, Railway, or DigitalOcean
```

## Troubleshooting

### Vercel Build Issues
- Make sure `client/public/index.html` exists
- Check that `client/package.json` has `"build"` script
- Verify Node.js version compatibility

### CORS Issues
- Update backend CORS configuration
- Add frontend domain to allowed origins

### API Connection Issues  
- Verify `REACT_APP_API_URL` environment variable
- Check backend deployment URL
- Ensure MongoDB connection string is correct

## Quick Fix for Current Error

The error you're seeing happens because Vercel is looking in the wrong directory. 

**Solution:**
1. In Vercel dashboard, go to Project Settings
2. Set **Root Directory** to: `client`
3. Set **Framework Preset** to: `Create React App`
4. Redeploy

**Or create a new Vercel project:**
1. Create a new repo with just the `client` folder contents
2. Deploy that repo instead

This will resolve the "Could not find index.html" error immediately.