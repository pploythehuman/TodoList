import React from 'react';

import './index.scss'
import TaskInput from '../src/components/TaskInput';

function App() {
  return (
    <div className="app-container">
      <div className="main-container">
        <div style={{ width: '550px' }}>
          <TaskInput 
            value="Add" 
            placeholder="Add your todo..." 
            onChange={()=>{}}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
