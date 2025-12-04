import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || '/api';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await axios.post(`${API_URL}/tasks`, { title: newTask });
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f0',
      padding: '20px',
      fontFamily: 'Georgia, serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        border: '2px solid #2c3e50',
        padding: '30px'
      }}>
        <h1 style={{
          color: '#2c3e50',
          fontSize: '28px',
          fontWeight: 'normal',
          textAlign: 'left',
          marginBottom: '25px',
          borderBottom: '3px solid #2c3e50',
          paddingBottom: '10px'
        }}>Task Manager</h1>
        
        <div style={{
          marginBottom: '25px',
          display: 'block'
        }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add new task..."
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '2px solid #2c3e50',
              backgroundColor: '#ffffff',
              marginBottom: '10px',
              fontFamily: 'Georgia, serif',
              color: '#2c3e50'
            }}
          />
          <button 
            onClick={addTask}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2c3e50',
              color: '#ffffff',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
              letterSpacing: '1px'
            }}
          >
            ADD TASK
          </button>
        </div>
        
        <div>
          {tasks.length === 0 ? (
            <div style={{
              color: '#7f8c8d',
              fontSize: '16px',
              padding: '20px 0',
              fontStyle: 'italic',
              textAlign: 'center'
            }}>
              No tasks yet.
            </div>
          ) : (
            tasks.map((task, index) => (
              <div key={task._id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 0',
                borderBottom: '1px solid #ecf0f1',
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    marginRight: '15px',
                    color: '#2c3e50',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    minWidth: '25px'
                  }}>
                    {index + 1}.
                  </span>
                  <span style={{
                    color: '#2c3e50',
                    fontSize: '16px',
                    fontFamily: 'Georgia, serif'
                  }}>
                    {task.title}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTask(task._id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#e74c3c',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '0.5px'
                  }}
                >
                  DELETE
                </button>
              </div>
            ))
          )}
        </div>
        
        <div style={{
          marginTop: '25px',
          textAlign: 'center',
          color: '#95a5a6',
          fontSize: '12px',
          fontFamily: 'Georgia, serif',
          letterSpacing: '2px'
        }}>
          
        </div>
      </div>
    </div>
  );
}

export default App;