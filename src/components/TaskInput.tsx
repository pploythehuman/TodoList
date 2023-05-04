import React from 'react';
import { PieChartOutlined } from '@ant-design/icons';

//placeholder, value, onChange, maxlength?
interface TaskInputProps {
  value: string;
  placeholder: string;
  onChange: Function;
  maxlength?: number;
}

const TaskInput: React.FC<TaskInputProps> = ({ value, placeholder, onChange, maxlength }) => {

  const handleSubmit = (event: any) => {
    if (event.key === 'Enter') {
      alert('hello');
    }
  }
  return (
    <input 
      className="task-input" 
      type="text" 
      placeholder={placeholder}
      onKeyDown={handleSubmit}
    />
  );
};

export default TaskInput;