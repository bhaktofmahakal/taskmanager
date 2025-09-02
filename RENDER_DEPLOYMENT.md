# 🚀 RENDER DEPLOYMENT GUIDE

## Step-by-Step Render Deployment

### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub account

### 2. Deploy Backend API

#### Option A: Quick Deploy (Recommended)
1. Click **"New +"** → **"Web Service"**
2. **Connect GitHub repository**
3. **Configure Service:**
   ```
   Name: task-manager-api
   Runtime: Node
   Region: Oregon (US West)
   Branch: main
   Root Directory: server
   Build Command: npm install
   Start Command: npm start
   ```

#### Option B: Using render.yaml (Auto-deployment)
1. Render will auto-detect `render.yaml` in your repo
2. Just connect repo and deploy

### 3. Environment Variables (CRITICAL)

In Render Dashboard → Environment tab, add:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://vexocore:ToprVlwmtkl8ZrKA@vexocore.lmajm6l.mongodb.net/taskmanager
JWT_SECRET=ultra-secure-jwt-secret-key-at-least-32-characters-long-for-production-security
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 4. Health Check
- **Health Check Path:** `/api/health`
- Render will ping this endpoint to verify deployment

### 5. Deployment Process
1. **Build logs** will show npm install progress
2. **Deploy logs** will show server startup
3. **Service URL** will be: `https://task-manager-api.onrender.com`

## ✅ Files Configured for Render

### Server Ready:
- ✅ `server/package.json` - Proper start scripts
- ✅ `server/server.js` - Production CORS & environment handling  
- ✅ `server/.env.example` - Environment variable template
- ✅ `render.yaml` - Auto-deployment configuration
- ✅ Health check endpoint: `/api/health`

## 🔧 Troubleshooting

### Common Issues & Solutions:

#### ❌ **Build fails**
**Solution:** Check `server/package.json` has correct scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "echo 'No build step required'"
  }
}
```

#### ❌ **Can't connect to MongoDB**
**Solution:** Verify `MONGODB_URI` environment variable:
```
MONGODB_URI=mongodb+srv://vexocore:ToprVlwmtkl8ZrKA@vexocore.lmajm6l.mongodb.net/taskmanager
```

#### ❌ **CORS errors from frontend**
**Solution:** Add frontend URL to environment variables:
```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

#### ❌ **JWT errors**
**Solution:** Set long JWT_SECRET:
```
JWT_SECRET=your-super-secure-32-plus-character-secret-key-here
```

## 🎯 Expected Results

### Successful Deployment:
1. **Build logs show:** `npm install` completes successfully
2. **Deploy logs show:** `Server running in production mode on port 10000`
3. **Health check passes:** GET `/api/health` returns 200 OK
4. **API endpoints work:** All `/api/*` routes respond correctly

### Test Your Deployment:
```bash
# Test health check
curl https://your-app.onrender.com/api/health

# Expected response:
{
  "success": true,
  "message": "Task Manager API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

## 🔄 Auto-Deploy Setup

After initial deployment:
1. **Auto-deploy on push** is enabled by default
2. Every `git push` to main branch will redeploy
3. **Build time:** ~2-3 minutes
4. **Cold start:** ~30 seconds (free tier)

## 💡 Production Tips

### Performance:
- Free tier has **cold starts** (~30s delay if inactive)
- Consider paid tier for zero downtime
- Use **keep-alive** services to prevent sleeping

### Security:
- All environment variables are automatically encrypted
- SSL/HTTPS enabled by default
- Use strong JWT secrets (32+ characters)

### Monitoring:
- Check **Logs tab** for runtime errors
- **Metrics tab** shows performance data
- Set up **Alerts** for downtime

---

## 🎉 READY TO DEPLOY!

Your server is **100% configured** for Render deployment. Just follow the steps above and your Task Manager API will be live at:

**`https://task-manager-api.onrender.com`**

All files are properly configured with production settings, error handling, and security measures.