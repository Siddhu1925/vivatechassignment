import React, { useState } from 'react';

const TaskCard = ({ task, onDelete, onEdit, onListChange }) => {
  const [edit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleDelete = () => {
    onDelete(task.id);
  };


  
  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    setIsEdit(false);
    onEdit(task.id, {
      title,
      description,
    });

  };

  
  const handleSelect = (e) => {
    onListChange(e.target.value, task.id);
  };
  return (
    <div className='taskdisplay' style={{fontSize:"24px"}}>
      { edit ? <>
        <input
           type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /><br/><br/>
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /><br/><br/>
      <button className='' onClick={handleSave}>Save</button>
      </> :  <>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div><button className="edit" onClick={handleEdit}>
         Edit
     </button>&nbsp;&nbsp;&nbsp;&nbsp;<button className='delete' onClick={handleDelete}>Delete</button></div><br/>
      <div><b>Move To</b>  <select className="list123" id="list" onChange={handleSelect}>
      <option value="selectList">Select a List</option>
  <option value="list1">List1</option>
  <option value="list2">List2</option>
  <option value="list3">List3</option>
</select></div>
      </> }
    </div>
  );
};

export default TaskCard;

