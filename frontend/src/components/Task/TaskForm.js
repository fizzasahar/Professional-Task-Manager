


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';


// const TaskForm = ({ users }) => {
//   const [taskName, setTaskName] = useState('');
//   const [details, setDetails] = useState('');
//   const [time, setTime] = useState('');
//   const [date, setDate] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');


// // Initialize Socket.IO
// useEffect(() => {
//   const socket = io('http://localhost:5000'); // Connect to the backend

//   // Cleanup on unmount
//   return () => {
//     socket.disconnect();
//   };
// }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate if a user is selected
//     if (!assignedTo) {
//       alert('Please select a user to assign the task.');
//       return;
//     }

//     // Validate if date and time are selected
//     if (!date || !time) {
//       alert('Please select a date and time for the task.');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         'http://localhost:5000/api/task/assign',
//         { taskName, details, time, date, assignedTo },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert('Task assigned successfully!');

//       // Clear the form after successful submission
//       setTaskName('');
//       setDetails('');
//       setTime('');
//       setDate('');
//       setAssignedTo('');
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Assign Task</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Task Name */}
//         <input
//           type="text"
//           value={taskName}
//           onChange={(e) => setTaskName(e.target.value)}
//           placeholder="Task Name"
//           required
//         />

//         {/* Task Details */}
//         <input
//           type="text"
//           value={details}
//           onChange={(e) => setDetails(e.target.value)}
//           placeholder="Details"
//           required
//         />

//         {/* Date Picker */}
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />

//         {/* Time Picker */}
//         <input
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           required
//         />

//         {/* User Selection Dropdown */}
//         <select
//           value={assignedTo}
//           onChange={(e) => setAssignedTo(e.target.value)}
//           required
//         >
//           <option value="">Select User</option>
//           {users.map((user) => (
//             <option key={user._id} value={user._id}>
//               {user.name}
//             </option>
//           ))}
//         </select>

//         {/* Submit Button */}
//         <button type="submit">Assign Task</button>
//       </form>
//     </div>
//   );
// };

// export default TaskForm;

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const TaskForm = ({ users }) => {
  const [taskName, setTaskName] = useState('');
  const [details, setDetails] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assignedTo || !date || !time) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/task/assign',
        { taskName, details, time, date, assignedTo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Task assigned successfully!');
      setTaskName('');
      setDetails('');
      setTime('');
      setDate('');
      setAssignedTo('');
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Assign To</InputLabel>
        <Select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
          <MenuItem value="">Select User</MenuItem>
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Assign Task
      </Button>
    </Box>
  );
};

export default TaskForm;