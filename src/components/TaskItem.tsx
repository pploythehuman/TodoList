import React, { useState, useEffect, useRef } from 'react';

import EllipsisButton from './EllipsisButton';

interface TaskItemProps {
  taskId: string;
  title: string;
  isChecked: boolean;
  maxlength?: number;
  onDelete: Function;
  onSave: Function;
  onMark: Function;
}

const TaskItem:React.FC<TaskItemProps>= ({ 
  taskId, 
  title, 
  isChecked, 
  maxlength=45, 
  onDelete,
  onSave,
  onMark
}) => {

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [checkValue, setCheckValue] = useState(isChecked);
  const [titleValue, setTitleValue] = useState(title);
  const [tempTitleValue, setTempTitleValue] = useState(title);

  const handleEdit = () => {
    setTempTitleValue(titleValue);
    setIsEditing(true)
  }

  const handleSave = () => {
    onSave(taskId, tempTitleValue);
    setTitleValue(tempTitleValue);
    setIsEditing(false)
  }

  const handleMark = () => {
    onMark(taskId, !checkValue)
    setCheckValue(!checkValue)
  }

  const handleDelete = () => {
    onDelete(taskId);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (containerRef.current && !containerRef?.current.contains(event.target) && isEditing) {
        const discard = window.confirm('Do you want to discard unsaved changes?');
        if (discard) {
          setIsEditing(false);
        }
      } 
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef, isEditing])

  return(
    <div className="task-item" ref={containerRef}>
      <div className="task-item-checkbox">    
        <label style={{ display: 'grid', gridTemplateColumns: 'auto 1fr'}}>
          <input type="checkbox" defaultChecked={checkValue} onChange={handleMark}/>
          <input 
            className={`task-item-title ${isChecked && !isEditing? 'strike-through' : '' }`}
            type="text" 
            value={isEditing ? tempTitleValue : (titleValue.length < maxlength ? titleValue : `${titleValue.slice(0, maxlength)}...`)}
            readOnly={!isEditing}
            onChange={(event: any)=>{ setTempTitleValue(event.target.value) }}
          />
        </label>
      </div>  

      {isEditing? (
        <button className="task-item-save-button" onClick={handleSave}>
          Save
        </button>
      ) : (
        <EllipsisButton onEdit={handleEdit} onDelete={handleDelete}/>
      )}
    </div>
  );
};

export default TaskItem;