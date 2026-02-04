// Main server file for the TaskMaster backend
// This sets up Express server, connects to MongoDB, and defines API routes
// I learned that Express is a popular Node.js framework for building APIs

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Import the tasks route handler
const routeTasks = require('./src/routes/tasks');

// CORS middleware - allows requests from different origins
// This is needed because frontend and backend are deployed separately on Render
// Without this, the browser would block requests from the frontend to the backend
app.use((req, res, next) => {
  // Allow requests from any origin (in production, you might want to restrict this)
  res.header('Access-Control-Allow-Origin', '*');
  // Allow these HTTP methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Allow these headers in requests
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Handle preflight OPTIONS requests (browser sends these before actual request)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve static files from the React build folder (for production)
app.use(express.static(path.join(__dirname, 'client/build')));

// Parse JSON request bodies so we can access req.body
app.use(bodyParser.json());

// Mount the tasks API routes at /api/tasks
app.use('/api/tasks', routeTasks, (req, res) => res.sendStatus(401));

// Catch-all route - serves React app for any non-API routes
// This allows React Router to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Start the server on the port from environment variable (Render sets this)
// Falls back to 5000 for local development
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server running on port ${port}`);
