import React, { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [list, setList]= useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      list
    };
    
    onAdd(newTask);
    setTitle('');
    setDescription('');
  };

  const handleSelect = (e) => {
    setList(e.target.value);
  };
  return (
    <div>
      <h1>Add Task To Lists</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{fontWeight: "700"}}>Title</label><br />
          <input
           style={{width: '100%' }}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br/>
        <div>
          <label  style={{fontWeight: "700"}}>Description</label>
          <br/>
          <textarea
          style={{ width: '100%' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div><br/>
          <label  style={{fontWeight: "700"}}>Select List to Add Task</label><br />
        <select   className="list124" id="list" onChange={handleSelect}>
        <option value="selectList">Select a List</option>
  <option value="list1">List1</option>
  <option value="list2">List2</option>
  <option value="list3">List3</option>
</select>
        </div><br/>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
