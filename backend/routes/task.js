const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');


// Assign Task
// router.post('/assign', auth, async (req, res) => {
//   const { taskName, details, time, date, assignedTo } = req.body;

//   try {
//     const task = new Task({
//       taskName,
//       details,
//       time,
//       date,
//       assignedTo,
//       assignedBy: req.user.id, // Include the logged-in admin's ID
//     });
//     await task.save();
    
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Assign Task
// router.post('/assign', auth, async (req, res) => {
//   const { taskName, details, time, date, assignedTo } = req.body;

//   try {
//     const task = new Task({
//       taskName,
//       details,
//       time,
//       date,
//       assignedTo,
//       assignedBy: req.user.id, // Include the logged-in admin's ID
//     });
//     await task.save();

//     // Emit a notification to the assigned user
//     req.io.to(assignedTo).emit('taskAssigned', { taskName });

//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Assign Task
router.post('/assign', auth, async (req, res) => {
  const { taskName, details, time, date, assignedTo } = req.body;

  try {
    const task = new Task({
      taskName,
      details,
      time,
      date,
      assignedTo,
      assignedBy: req.user.id, // Include the logged-in admin's ID
    });
    await task.save();

    // Emit a notification to the assigned user
    req.io.to(assignedTo).emit('taskAssigned', { taskName });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add Comment
router.post('/comment/:id', auth, async (req, res) => {
  const { text } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    task.comments.push({ text, postedBy: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get all tasks assigned by the logged-in admin
router.get('/all', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedBy: req.user.id })
      .populate('assignedTo', 'name') // Populate assignedTo with user's name
      .populate('comments.postedBy', 'name'); // Populate comments.postedBy with user's name
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
  
  // Get assigned tasks (for user)
  // router.get('/assigned', auth, async (req, res) => {
  //   try {
  //     const tasks = await Task.find({ assignedTo: req.user.id })
  //       .populate('assignedTo', 'name') // Populate assignedTo with user's name
  //       .populate('comments.postedBy', 'name'); // Populate comments.postedBy with user's name
  //     res.json(tasks);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });

  // Get assigned tasks (for user)
// router.get('/assigned', auth, async (req, res) => {
//   try {
//     const tasks = await Task.find({ assignedTo: req.user.id })
//       .populate('assignedTo', 'name') // Populate assignedTo with user's name
//       .populate('comments.postedBy', 'name'); // Populate comments.postedBy with user's name

//     // Calculate remaining time and add isLate flag
//     const tasksWithRemainingTime = tasks.map((task) => {
//       const taskDateTime = new Date(`${task.date}T${task.time}`);
//       const currentDateTime = new Date();
//       const remainingTime = taskDateTime - currentDateTime;

//       const isLate = remainingTime < 0;

//       return {
//         ...task.toObject(),
//         remainingTime: isLate ? 0 : remainingTime, // If late, set remaining time to 0
//         isLate,
//       };
//     });

//     res.json(tasksWithRemainingTime);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Get assigned tasks (for user)
// Get assigned tasks (for user)
// router.get('/assigned', auth, async (req, res) => {
//   try {
//     const tasks = await Task.find({ assignedTo: req.user.id })
//       .populate('assignedTo', 'name') // Populate assignedTo with user's name
//       .populate('comments.postedBy', 'name'); // Populate comments.postedBy with user's name

//     const currentDateTime = new Date(); // Current date and time

//     // Calculate remaining time and add isLate flag
//     const tasksWithRemainingTime = tasks.map((task) => {
//       // Extract date and time from the task
//       const taskDate = new Date(task.date).toISOString().split('T')[0]; // Get YYYY-MM-DD
//       const taskTime = task.time.padEnd(5, ':00'); // Ensure time is in HH:MM format (e.g., "8" -> "8:00")

//       // Combine date and time into a single datetime object
//       const taskDateTime = new Date(`${taskDate}T${taskTime}:00`); // Add ":00" for seconds

//       // Log taskDateTime and currentDateTime for debugging
//       console.log('Task DateTime:', taskDateTime);
//       console.log('Current DateTime:', currentDateTime);

//       const remainingTime = taskDateTime - currentDateTime; // Remaining time in milliseconds

//       // Log remainingTime for debugging
//       console.log('Remaining Time (ms):', remainingTime);

//       const isLate = remainingTime < 0;

//       return {
//         ...task.toObject(),
//         remainingTime: isLate ? 0 : remainingTime, // If late, set remaining time to 0
//         isLate,
//       };
//     });

//     // Log the tasks with remaining time for debugging
//     console.log('Tasks with Remaining Time:', tasksWithRemainingTime);

//     res.json(tasksWithRemainingTime);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Get assigned tasks (for user)
router.get('/assigned', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate('assignedTo', 'name') // Populate assignedTo with user's name
      .populate('comments.postedBy', 'name'); // Populate comments.postedBy with user's name

    const currentDateTime = new Date(); // Current date and time

    // Calculate remaining time and add isLate flag
    const tasksWithRemainingTime = tasks.map((task) => {
      // Extract date and time from the task
      const taskDate = new Date(task.date).toISOString().split('T')[0]; // Get YYYY-MM-DD
      const taskTime = task.time.padEnd(5, ':00'); // Ensure time is in HH:MM format (e.g., "8" -> "8:00")

      // Combine date and time into a single datetime object
      const taskDateTime = new Date(`${taskDate}T${taskTime}:00`); // Add ":00" for seconds

      // Log taskDateTime and currentDateTime for debugging
      console.log('Task DateTime:', taskDateTime);
      console.log('Current DateTime:', currentDateTime);

      const remainingTime = taskDateTime - currentDateTime; // Remaining time in milliseconds

      // Log remainingTime for debugging
      console.log('Remaining Time (ms):', remainingTime);

      const isLate = remainingTime < 0;

      return {
        ...task.toObject(),
        remainingTime: isLate ? 0 : remainingTime, // If late, set remaining time to 0
        isLate,
      };
    });

    // Log the tasks with remaining time for debugging
    console.log('Tasks with Remaining Time:', tasksWithRemainingTime);

    res.json(tasksWithRemainingTime);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  // Mark task as completed
router.put('/complete/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true }, // Set completed to true
      { new: true } // Return the updated task
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;