// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TaskItem = ({ task, onTaskUpdate }) => {
//   const [comment, setComment] = useState('');
//   const [remainingTime, setRemainingTime] = useState(task.remainingTime || 0);
//   const [isLate, setIsLate] = useState(task.isLate || false);

//   // Log the task for debugging
//   useEffect(() => {
//     console.log(task);
//   }, [task]);

//   // Update remaining time every second
//   useEffect(() => {
//     if (!isLate && remainingTime > 0) {
//       const interval = setInterval(() => {
//         setRemainingTime((prevTime) => prevTime - 1000); // Subtract 1 second
//       }, 1000);

//       return () => clearInterval(interval);
//     }

//     else if (remainingTime <= 0) {
//       setIsLate(true); // Mark the task as late if remaining time is <= 0
//     }




//   }, [isLate, remainingTime]);

//   const formatTime = (milliseconds) => {
//     const totalSeconds = Math.floor(milliseconds / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     return `${hours}h ${minutes}m ${seconds}s`;
//   };


//   const handleComplete = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.put(
//         `http://localhost:5000/api/task/complete/${task._id}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (onTaskUpdate) {
//         onTaskUpdate(res.data);
//       }

//       alert('Task marked as completed!');
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     }
//   };

//   const handleComment = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         `http://localhost:5000/api/task/comment/${task._id}`,
//         { text: comment },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert('Comment added!');
//       setComment('');
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     }
//   };

//   return (
//     <div>
//       <h3>{task.taskName}</h3>
//       <p>{task.details}</p>
//       <p>Time: {task.time}</p>
//       <p>Date: {new Date(task.date).toLocaleDateString()}</p>
//       <p>Assigned To: {task.assignedTo ? task.assignedTo.name : 'Unassigned'}</p>


//        {/* Display Remaining Time or "Late" Label */}
//        {isLate ? (
//         <p style={{ color: 'red' }}>Late</p>
//       ) : (
//         <p>Remaining Time: {formatTime(remainingTime)}</p>
//       )}
//       {/* Mark as Completed button */}
//       {!task.completed && (
//         <button onClick={handleComplete}>Mark as Completed</button>
//       )}

//       {/* Add Comment Section */}
//       <div>
//         <input
//           type="text"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder="Add a comment"
//         />
//         <button onClick={handleComment}>Add Comment</button>
//       </div>

//       {/* Display Comments */}
//       <div>
//         <h4>Comments:</h4>
//         {task.comments.map((comment, index) => (
//           <div key={index}>
//             <strong>{comment.postedBy ? comment.postedBy.name : 'Unknown User'}:</strong> {comment.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskItem;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, TextField, Box, Paper } from '@mui/material';

const TaskItem = ({ task, onTaskUpdate }) => {
  const [comment, setComment] = useState('');
  const [remainingTime, setRemainingTime] = useState(task.remainingTime || 0);
  const [isLate, setIsLate] = useState(task.isLate || false);

  useEffect(() => {
    if (!isLate && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);
      return () => clearInterval(interval);
    } else if (remainingTime <= 0) {
      setIsLate(true);
    }
  }, [isLate, remainingTime]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/task/complete/${task._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onTaskUpdate) onTaskUpdate(res.data);
      alert('Task marked as completed!');
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleComment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/task/comment/${task._id}`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Comment added!');
      setComment('');
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6">{task.taskName}</Typography>
      <Typography>{task.details}</Typography>
      <Typography>Time: {task.time}</Typography>
      <Typography>Date: {new Date(task.date).toLocaleDateString()}</Typography>
      <Typography>Assigned To: {task.assignedTo ? task.assignedTo.name : 'Unassigned'}</Typography>
      {isLate ? (
        <Typography color="error">Late</Typography>
      ) : (
        <Typography>Remaining Time: {formatTime(remainingTime)}</Typography>
      )}
      {!task.completed && (
        <Button variant="contained" onClick={handleComplete} sx={{ mt: 1 }}>
          Mark as Completed
        </Button>
      )}
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleComment} sx={{ mt: 1 }}>
          Add Comment
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Comments:</Typography>
        {task.comments.map((comment, index) => (
          <Typography key={index}>
            <strong>{comment.postedBy ? comment.postedBy.name : 'Unknown User'}:</strong> {comment.text}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default TaskItem;