import React from 'react';

import './index.scss'
import TaskInput from '../src/components/TaskInput';
import TaskItem from '../src/components/TaskItem';
import ProgressBar from '../src/components/ProgressBar';
import SortingSelect from '../src/components/SortingSelect';

function App() {
  return (
    <div className="app-container">
      <div className="main-container">
        <ProgressBar completeAmount={12} totalAmount={20}/>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <h3 style={{ margin: "0px" }}>Tasks</h3>
          <SortingSelect />
        </div>
        
        <TaskInput 
          value="Add" 
          placeholder="Add your todo..." 
          onChange={()=>{}}
        />
        <TaskItem 
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
          isChecked={false}
        />
      </div>
    </div>
  );
}

export default App;
