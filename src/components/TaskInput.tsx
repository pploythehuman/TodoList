import React, { useState } from 'react';
import { PieChartOutlined } from '@ant-design/icons';

interface TaskInputProps {
  value: string;
  placeholder: string;
  onSubmit: Function;
}

const TaskInput: React.FC<TaskInputProps> = ({ value, placeholder, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = async(event: any) => {
    if (event.key === 'Enter') {
      await onSubmit(inputValue);
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