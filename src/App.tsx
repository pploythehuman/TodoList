import React, { useState, useEffect } from 'react';
import './index.scss'
import TaskInput from '../src/components/TaskInput';
import TaskItem from '../src/components/TaskItem';
import ProgressBar from '../src/components/ProgressBar';
import SortingSelect from '../src/components/SortingSelect';
import { 
  getTasks, 
  deleteTask, 
  createTask, 
  markTask, 
  changeTaskTitle 
} from '../src/services/api';

interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  // const result = await getTasks();
  // const result = await deleteTask('f619466c-a016-4281-b584-7db2795d103d');
  // const result = await createTask("fake title");
  // const result = await markTask("ZG_Ly6K", true);
  // const result = await markTask("5fe3f4ca-193c-4170-83c1-cb5a19908601", false);
  // const result = await changeTaskTitle("ZG_Ly6K", "new title Z")

  const handleCreateTask = async(title: string) => {
    const newTask = await createTask(title);
    setTasks((prevTask) => [newTask, ...prevTask]);
  }

  const handleChangeTaskTitle = async(taskId: string, newTitle: string) => {
    await changeTaskTitle(taskId, newTitle);
    setTasks((prevTask) => 
      prevTask.map((task) => {
        if (task.id === taskId) {
          return { ...task, title: newTitle}
        }
        return task;
      })
    );
  }

  const handleDeleteTask = async(taskId: string) => {
    await deleteTask(taskId);
    setTasks((prevTask) => prevTask.filter((task) => task.id !== taskId));
  }

  useEffect(() => {
    const fetchTaskData = async() => {
      const result = await getTasks();
      setTasks(result.reverse());
    }
    fetchTaskData();
  }, [])

  return (
    <div className="app-container">
      <div className="main-container">
        <ProgressBar completeAmount={12} totalAmount={20}/>

        <div className="tasks-container"> 
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: '10px' }}>
            <h3 style={{ margin: "0px" }}>Tasks</h3>
            <SortingSelect />
          </div>
          {tasks.map((taskItem: ITask) =>{
            return(
              <TaskItem 
              key={taskItem.id}
              taskId={taskItem.id}
              title={taskItem.title}
              isChecked={taskItem.completed}
              onDelete={handleDeleteTask}
            />
          )})}
        </div>
        
        <TaskInput 
          value="Add" 
          placeholder="Add your todo..." 
          onSubmit={handleCreateTask}
        />
      </div>
    </div>
  );
}

export default App;
