// import React, { useEffect, useState } from 'react';
// import TaskItem from './TaskItem';

// const TaskList = ({ tasks }) => {
//   const [taskList, setTaskList] = useState(tasks);

//   // Log the tasks for debugging
//   useEffect(() => {
//     console.log('Tasks from Backend:', tasks);
//     setTaskList(tasks);
//   }, [tasks]);

//   return (
//     <div>
//       <h2>Tasks</h2>
//       {taskList && taskList.length > 0 ? (
//         taskList.map((task) => (
//           <TaskItem
//             key={task._id}
//             task={task}
//             onTaskUpdate={(updatedTask) => {
//               setTaskList((prevTasks) =>
//                 prevTasks.map((t) =>
//                   t._id === updatedTask._id ? updatedTask : t
//                 )
//               );
//             }}
//           />
//         ))
//       ) : (
//         <p>No tasks found.</p>
//       )}
//     </div>
//   );
// };

// export default TaskList;


import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { Box, Typography } from '@mui/material';

const TaskList = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Tasks
      </Typography>
      {taskList && taskList.length > 0 ? (
        taskList.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onTaskUpdate={(updatedTask) => {
              setTaskList((prevTasks) =>
                prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
              );  // Add the closing parenthesis here
            }}
          />
        ))
      ) : (
        <Typography>No tasks found.</Typography>
      )}
    </Box>
  );
};

export default TaskList;
