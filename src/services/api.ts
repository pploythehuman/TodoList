import axios from 'axios';

const baseURL =  "http://localhost:3001"

const getTasks = async() => {
  const response = await axios.get(`${baseURL}/todos`);
  return response.data;
}

const deleteTask = async(taskId: string) => {
  const response = await axios.delete(`${baseURL}/todos/${taskId}`);
  return response.data;
}

const createTask = async(title: string) => {
  let data = JSON.stringify({ title: title, completed: false })

  const response = await axios.post(`${baseURL}/todos`, data, {
    headers: {
        'Content-Type': 'application/json',
  }})
  return response.data;
}

const markTask = async(taskId: string, isChecked: boolean) => {
  let data = JSON.stringify({ completed: isChecked })
  
  const response = await axios.patch(`${baseURL}/todos/${taskId}`, data, {
    headers: {
      'Content-Type': 'application/json',
  }})
  return response.data;
}

const changeTaskTitle = async(taskId: string, newTitle: string) => {
  let data = JSON.stringify({ title: newTitle })

  const response = await axios.patch(`${baseURL}/todos/${taskId}`, data, {
    headers: {
      'Content-Type': 'application/json',
  }})
  return response.data;
}

export {
  getTasks, 
  deleteTask, 
  createTask, 
  markTask, 
  changeTaskTitle
}