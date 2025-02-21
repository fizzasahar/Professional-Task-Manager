

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TaskForm from '../Task/TaskForm';
// import TaskList from '../Task/TaskList';

// const AdminDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         // Fetch tasks assigned by the logged-in admin
//         const tasksRes = await axios.get('http://localhost:5000/api/task/all', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTasks(tasksRes.data);
//         console.log('Tasks:', tasksRes.data); // Verify tasks data in console

//         // Fetch all users
//         const usersRes = await axios.get('http://localhost:5000/api/auth/users', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(usersRes.data);
//       } catch (err) {
//         console.error(err.response?.data || err.message);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <TaskForm users={users} />
//       <TaskList tasks={tasks} />
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../Task/TaskForm';
import TaskList from '../Task/TaskList';
import { Container, Typography, Paper } from '@mui/material';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const tasksRes = await axios.get('http://localhost:5000/api/task/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasksRes.data);

        const usersRes = await axios.get('http://localhost:5000/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <TaskForm users={users} />
      </Paper>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <TaskList tasks={tasks} />
      </Paper>
    </Container>
  );
};

export default AdminDashboard;