// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TaskList from '../Task/TaskList';

// const UserDashboard = () => {
//   const [tasks, setTasks] = useState([]);

//  // Fetch tasks assigned to the user
//  useEffect(() => {
//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:5000/api/task/assigned', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     }
//   };

//   fetchTasks();
// }, []);


//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       <TaskList tasks={tasks} />
//     </div>
//   );
// };

// export default UserDashboard;







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import TaskList from '../Task/TaskList';
// // import jwtDecode from 'jwt-decode'; // Install this package if not already installed
// import { jwtDecode } from "jwt-decode";

// const UserDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [notification, setNotification] = useState('');

//   // Fetch tasks assigned to the user
//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:5000/api/task/assigned', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     }
//   };

//   // Fetch tasks when the component mounts
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Initialize Socket.IO
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const decodedToken = jwtDecode(token); // Decode the token to get the user ID
//     const userId = decodedToken.id; // Assuming the token contains the user ID in the `id` field

//     const socket = io('http://localhost:5000'); // Connect to the backend

//     // Join the user's room
//     socket.emit('joinRoom', userId);
//     console.log(`User ${userId} joined room`);

//     // Listen for taskAssigned notifications
//     socket.on('taskAssigned', (data) => {
//       setNotification(`New task assigned: ${data.taskName}`);
//       // Fetch tasks again to update the list
//       fetchTasks();
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       {notification && <p style={{ color: 'green' }}>{notification}</p>}
//       <TaskList tasks={tasks} />
//     </div>
//   );
// };

// export default UserDashboard;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import TaskList from '../Task/TaskList';
// import { jwtDecode } from "jwt-decode";
// import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify components
// import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

// const UserDashboard = () => {
//   const [tasks, setTasks] = useState([]);

//   // Fetch tasks assigned to the user
//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:5000/api/task/assigned', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     }
//   };

//   // Fetch tasks when the component mounts
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Initialize Socket.IO
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const decodedToken = jwtDecode(token); // Decode the token to get the user ID
//     const userId = decodedToken.id; // Assuming the token contains the user ID in the `id` field

//     const socket = io('http://localhost:5000'); // Connect to the backend

//     // Join the user's room
//     socket.emit('joinRoom', userId);
//     console.log(`User ${userId} joined room`);

//     // Listen for taskAssigned notifications
//     socket.on('taskAssigned', (data) => {
//       // Show the notification
//       toast.success(`New task assigned: ${data.taskName}`);
//       // Fetch tasks again to update the list
//       fetchTasks();
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       {/* This container will show the notifications */}
//       <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop />
//       <TaskList tasks={tasks} />
//     </div>
//   );
// };

// export default UserDashboard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import TaskList from '../Task/TaskList';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Typography, Paper } from '@mui/material';

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/task/assigned', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const socket = io('http://localhost:5000');
    socket.emit('joinRoom', userId);

    socket.on('taskAssigned', (data) => {
      toast.success(`New task assigned: ${data.taskName}`);
      fetchTasks();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop />
      <Paper elevation={3} sx={{ padding: 3 }}>
        <TaskList tasks={tasks} />
      </Paper>
    </Container>
  );
};

export default UserDashboard;