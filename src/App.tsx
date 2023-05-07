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
  const [selectedSortingOption, setSelectedSortingOption] = useState('All');

  const getCompletedTasksCount = (tasks: ITask[]) => tasks.filter(task => task.completed).length

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

  const handleMarkTask = async(taskId: string, isChecked: boolean) => {
    await markTask(taskId, isChecked);
    setTasks((prevTask) => 
      prevTask.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: isChecked}
        }
        return task;
      })
    );
  }

  const handleDeleteTask = async(taskId: string) => {
    await deleteTask(taskId);
    setTasks((prevTask) => prevTask.filter((task) => task.id !== taskId));
  }

  const filterTasks = (tasks: ITask[], selectedOption: string) => {
    if (selectedOption == 'Done') {
      return tasks.filter(tasks => tasks.completed)
    } else if (selectedOption == 'Undone') {
      return tasks.filter(tasks => !tasks.completed)
    } else {
      return tasks
    }
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
        <ProgressBar completeAmount={getCompletedTasksCount(tasks)} totalAmount={tasks.length}/>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: '10px' }}>
          <h3 style={{ margin: "0px" }}>Tasks</h3>
          <SortingSelect selectedValue={selectedSortingOption} onSelectedValueChange={setSelectedSortingOption} />
        </div>

        <div className="tasks-container"> 
          {filterTasks(tasks, selectedSortingOption).map((taskItem: ITask) =>{
            return(
              <TaskItem 
              key={taskItem.id}
              taskId={taskItem.id}
              title={taskItem.title}
              isChecked={taskItem.completed}
              onDelete={handleDeleteTask}
              onSave={handleChangeTaskTitle}
              onMark={handleMarkTask}
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
