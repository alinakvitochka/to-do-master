import React, { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTaskCompletion, deleteTask, editTask } from './reducers/taskReducer';
import { selectTasks } from './reducers/taskReducer';
import store from './store';

const AddTask = () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (task.trim() !== '') {
      dispatch(addTask(task));
      setTask('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Новая задача"
      />
      <button onClick={handleSubmit}>Добавить</button>
    </div>
  );
};

const TaskList = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newText, setNewText] = useState('');

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setNewText(task.text);
  };

  const handleSave = (id) => {
    if (newText.trim() !== '') {
      dispatch(editTask({ id, newText }));
      setEditingTaskId(null);
      setNewText('');
    }
  };

  return (
    <ul>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
            ) : (
              <span>{task.text}</span>
            )}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTaskCompletion(task.id))}
            />
            {editingTaskId === task.id ? (
              <button onClick={() => handleSave(task.id)}>Сохранить</button>
            ) : (
              <button onClick={() => handleEdit(task)}>Редактировать</button>
            )}
            <button onClick={() => dispatch(deleteTask(task.id))}>Удалить</button>
          </li>
        ))
      ) : (
        <p>Список задач пуст</p>
      )}
    </ul>
  );
};

const App = () => {
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <AddTask />
      <TaskList />
    </div>
  );
};

export default App;
