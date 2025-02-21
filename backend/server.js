// const express = require('express');
// const connectDB = require('./config/db');
// const http = require('http');
// const socketIo = require('socket.io');
// const authRoutes = require('./routes/auth');
// const taskRoutes = require('./routes/task');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//       origin: 'http://localhost:3000', // Allow frontend to connect
//       methods: ['GET', 'POST'],
//     },
//   });
  
// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/task', taskRoutes);
  
// // Pass io to routes
// app.use((req, res, next) => {
//     req.io = io;
//     next();
//   });

// // Socket.IO connection
// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);
  
//     // Listen for task assignment
//     socket.on('assignTask', (data) => {
//       const { assignedTo, taskName } = data;
//       // Emit a notification to the assigned user
//       io.to(assignedTo).emit('taskAssigned', { taskName });
//     });
  
//     // Handle user joining their room
//     socket.on('joinRoom', (userId) => {
//       socket.join(userId); // Join a room with the user's ID
//       console.log(`User ${userId} joined room`);
//     });
  
//     // Handle disconnection
//     socket.on('disconnect', () => {
//       console.log('A user disconnected:', socket.id);
//     });
//   });
  

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');
// const taskRoutes = require('./routes/task');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);

// // Initialize Socket.IO
// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Allow frontend to connect
//     methods: ['GET', 'POST'],
//   },
// });

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Pass `io` to routes
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/task', taskRoutes);

// // Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Listen for task assignment
//   socket.on('assignTask', (data) => {
//     const { assignedTo, taskName } = data;
//     // Emit a notification to the assigned user
//     io.to(assignedTo).emit('taskAssigned', { taskName });
//   });

//   // Handle user joining their room
//   socket.on('joinRoom', (userId) => {
//     socket.join(userId); // Join a room with the user's ID
//     console.log(`User ${userId} joined room`);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('A user disconnected:', socket.id);
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow frontend to connect
    methods: ['GET', 'POST'],
  },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Pass `io` to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle user joining their room
  socket.on('joinRoom', (userId) => {
    if (!userId) {
      console.log('User ID is null or undefined');
      return;
    }
    socket.join(userId); // Join a room with the user's ID
    console.log(`User ${userId} joined room`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));