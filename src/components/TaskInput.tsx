import React, { useState } from 'react';
import { PieChartOutlined } from '@ant-design/icons';
import { 
  getTasks, 
  deleteTask, 
  createTask, 
  markTask, 
  changeTaskTitle 
} from '../services/api';

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

  const handleSubmit = async(event: any) => {
    if (event.key === 'Enter') {
      const result = await getTasks();
      // const result = await deleteTask('f619466c-a016-4281-b584-7db2795d103d');
      // const result = await createTask("fake title");
      // const result = await markTask("ZG_Ly6K", true);
      // const result = await markTask("5fe3f4ca-193c-4170-83c1-cb5a19908601", false);
      // const result = await changeTaskTitle("ZG_Ly6K", "new title Z")

      console.log("result", result);

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