import axios from 'axios';

const baseURL =  "http://localhost:3001"

const getTasks = async() => {
  const response = await axios.get(`${baseURL}/todos`);
  return response;
}

const deleteTask = async(taskId: string) => {
  const response = await axios.delete(`${baseURL}/todos/${taskId}`);
  return response;
}

const createTask = async(title: string) => {
  let data = JSON.stringify({ title: title, completed: false })

  const response = await axios.post(`${baseURL}/todos`, data, {
    headers: {
        'Content-Type': 'application/json',
  }})
  return response;
}

const markTask = async(taskId: string, isCompleted: boolean) => {
  let data = JSON.stringify({ completed: isCompleted })
  
  const response = await axios.patch(`${baseURL}/todos/${taskId}`, data, {
    headers: {
      'Content-Type': 'application/json',
  }})
  return response;
}

const changeTaskTitle = async(taskId: string, newTitle: string) => {
  let data = JSON.stringify({ title: newTitle })

  const response = await axios.patch(`${baseURL}/todos/${taskId}`, data, {
    headers: {
      'Content-Type': 'application/json',
  }})
  return response;
}

export {
  getTasks, 
  deleteTask, 
  createTask, 
  markTask, 
  changeTaskTitle
}