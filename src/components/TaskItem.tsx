import React from 'react';

import EllipsisButton from './EllipsisButton';

interface TaskItemProps {
  title: string;
  isChecked: boolean;
  maxlength?: number;
}

const TaskItem:React.FC<TaskItemProps>= ({ title, isChecked, maxlength=50 }) => {
  return(
    <div className="task-item">
      <div className="task-item-checkbox">    
        <label>
          <input className="task-item-checkbox-input" type="checkbox" checked={isChecked} />
          <p>{title.length < maxlength? title : `${title.slice(0, maxlength)}...` }</p>
        </label>
      </div>  
      <EllipsisButton />
    </div>
  );
};

export default TaskItem;