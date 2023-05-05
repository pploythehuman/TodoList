import React, { useState } from 'react';
import { PieChartOutlined } from '@ant-design/icons';

//placeholder, value, onChange, maxlength?
interface TaskInputProps {
  value: string;
  placeholder: string;
  onChange: Function;
  maxlength?: number;
}

const TaskInput: React.FC<TaskInputProps> = ({ value, placeholder, onChange, maxlength }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = (event: any) => {
    if (event.key === 'Enter') {
      alert(inputValue);
      setInputValue('');
    }
  }
  return (
    <input 
      className="task-input" 
      type="text" 
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
};

export default TaskInput;