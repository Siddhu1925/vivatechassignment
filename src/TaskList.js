import React, { useState } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ taskList, tasks, onDelete, onEdit, onListChange }) => {
  const handleDeleteTask = (taskId) => {
    onDelete(taskId);
  };

  const handleEditTask = (taskId, {title, description}) => {
    onEdit(taskId, {title, description});
  };
  return (
    <div className='task-list'>
      <h1>Task {tasks[0]? tasks[0].list : taskList}</h1>
      {tasks.map((task) => (
        <>
        {/* <h1>Task {task.list}</h1> */}
        <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} onEdit={handleEditTask} onListChange={onListChange} />
        </>
//         <TaskCard
//   key={task.id}
//   task={task} // Make sure `task` is defined and has a valid value
//   onDelete={handleDeleteTask}
//   onEdit={handleEditTask}
// />
      ))}
    </div>
  );
};

export default TaskList;
