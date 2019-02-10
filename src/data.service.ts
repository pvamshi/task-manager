function fetchTasks() {
  return fetch('http://localhost:3001/tasks');
}

export { fetchTasks };
