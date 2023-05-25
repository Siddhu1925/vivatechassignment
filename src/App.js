import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css';
import * as XLSX from 'xlsx';


const App = () => {
  const [tasks, setTasks] = useState([]);
  // const [lists, setLists] = useState([]);
  const handleAddTask = (newTask) => {
    console.log(newTask,'newer');
    if (newTask.title.trim() !== '' && newTask.description.trim() !== '' && newTask.list.trim() !== '') {
      setTasks([...tasks, newTask]);
    }
  };
  // const handleAddTask = (newTask) => {
  //   const { title, description } = newTask;
  
  //   if (title.trim() !== '' && description.trim() !== '') {
  //     setTasks([...tasks, newTask]);
  //   }
  // };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  
  const handleEditTask = (taskId,{ title, description}) => {
    const taskIndex = tasks.findIndex(task=> task.id == taskId);
    tasks[taskIndex].title = title;
    tasks[taskIndex].description = description;
    setTasks([...tasks]);
  };

  const handleListChange = (value, taskId)=>{
    const taskIndex = tasks.findIndex(task=> task.id == taskId);
    tasks[taskIndex].list = value;
    setTasks([...tasks]);
    // setTasks(tasks.filter((task) => task.id !== taskId),()=>{
    //   setTasks([...tasks, tasks.filter((task) => task.id == taskId)[0].list = value]);
    // });
  };

  const exportToExcel = () => {
    const exportData = tasks.map((task) => ({
      Title: task.title,
      Description: task.description,
      List: task.list,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

    saveExcelFile(excelBuffer, 'tasks.xlsx');
  };

  const saveExcelFile = (buffer, fileName) => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='color'>
      <h1 style={{color: "aliceblue"}}><b>VIVA TECH ASSIGNMENT</b></h1>
      <h1>Task Management App</h1>
      <TaskForm onAdd={handleAddTask} />
      {/* <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} /> */}


      {/* <div style={{display: 'flex', justifyContent:'space-between', marginTop: '4rem', paddingBottom: '1rem'}}> */}
      <div className='list-items'>
      <TaskList taskList='list1' tasks={tasks.filter((task) => task.list == 'list1')} onDelete={handleDeleteTask} onEdit={handleEditTask} onListChange={handleListChange} />
      <TaskList taskList='list2' tasks={tasks.filter((task) => task.list == 'list2')} onDelete={handleDeleteTask} onEdit={handleEditTask} onListChange={handleListChange}/>
      <TaskList taskList='list3' tasks={tasks.filter((task) => task.list == 'list3')} onDelete={handleDeleteTask} onEdit={handleEditTask} onListChange={handleListChange}/>
      </div>
      <div style={{display: 'flex',justifyContent: 'center', paddingBottom: '2rem'}}><button style={{backgroundColor: 'skyblue'}} onClick={exportToExcel}>Export to Excel</button></div>
     
    </div>
  );
};

export default App;
