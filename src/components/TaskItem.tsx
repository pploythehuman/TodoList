import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

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
          <input className="task-item-checkbox-input" type="checkbox" />
        </label>
      </div>  
      <p>{title.length < maxlength? title : `${title.slice(0, maxlength)}...` }</p>
    </div>
  );
};

export default TaskItem;