# TaskMaster Deployment Guide

Step-by-step instructions for deploying this MERN app to Render with MongoDB Atlas.

## Part 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster (free tier M0 is fine)
3. Click "Browse Collections" and create a database called `taskmaster`
4. Create a collection called `tasks`
5. Go to "Database Access" and create a database user with read/write permissions
6. Go to "Network Access" and add `0.0.0.0/0` to allow connections from anywhere
7. Go back to "Database" and click "Connect" > "Connect your application"
8. Copy the connection string - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
9. Replace `<username>` and `<password>` with your database user credentials
10. Add the database name to the URI: `mongodb+srv://...mongodb.net/taskmaster?retryWrites=true&w=majority`

## Part 2: Deploy Backend to Render

1. Go to [Render](https://render.com) and sign up/login with GitHub
2. Click "New" > "Web Service"
3. Connect your GitHub repository (Vierbytes/simple-mern)
4. Configure the service:
   - **Name**: taskmaster-backend (or whatever you prefer)
   - **Region**: Choose one close to you
   - **Branch**: master
   - **Root Directory**: (leave empty - uses repo root)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start:prod`
5. Add Environment Variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string from Part 1
6. Click "Create Web Service"
7. Wait for deployment to complete
8. Note your backend URL (e.g., `https://taskmaster-backend.onrender.com`)

## Part 3: Deploy Frontend to Render

1. In Render, click "New" > "Static Site"
2. Connect the same GitHub repository
3. Configure the static site:
   - **Name**: taskmaster-frontend
   - **Branch**: master
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Add Environment Variable:
   - Key: `REACT_APP_API_URL`
   - Value: Your backend URL from Part 2 (e.g., `https://taskmaster-backend.onrender.com`)
5. Click "Create Static Site"
6. Wait for deployment to complete

## Part 4: Testing

1. Open your frontend URL in a browser
2. Try adding a new task - it should appear in the list
3. Try checking/unchecking tasks
4. Try deleting a task
5. Refresh the page - tasks should persist (they're saved in MongoDB)

## Troubleshooting

- **Tasks not loading**: Check browser console for CORS errors. Make sure backend has CORS enabled.
- **Can't connect to MongoDB**: Verify your connection string and that Network Access allows 0.0.0.0/0
- **Frontend can't reach backend**: Make sure REACT_APP_API_URL is set correctly (no trailing slash)
- **Build failing**: Check the Render logs for specific error messages

## Submission URLs

After deployment, submit these URLs:
- Frontend: https://[your-frontend-name].onrender.com
- Backend: https://[your-backend-name].onrender.com
