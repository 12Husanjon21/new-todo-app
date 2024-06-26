import React, { useReducer, useState } from 'react';
import './App.css';

// Define initial state
const initialState = {
  tasks: [
    { id: 911, name: "Task is done by using React", done: false },
    { id: 912, name: "Task is done by using React", done: false },
    { id: 913, name: "Task is done by using React", done: false },
    { id: 914, name: "Task is done by using React", done: false },
  ],
  completedTasks: [],
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'COMPLETE_TASK':
      const completedTask = state.tasks.find(task => task.id === action.payload);
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        completedTasks: [...state.completedTasks, { ...completedTask, done: true }],
      };
    case 'UNCOMPLETE_TASK':
      const uncompletedTask = state.completedTasks.find(task => task.id === action.payload);
      return {
        ...state,
        completedTasks: state.completedTasks.filter(task => task.id !== action.payload),
        tasks: [...state.tasks, { ...uncompletedTask, done: false }],
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const addNewTask = () => {
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      name: inputValue,
      done: false,
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    setInputValue('');
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const completeTask = (id) => {
    dispatch({ type: 'COMPLETE_TASK', payload: id });
  };

  const uncompleteTask = (id) => {
    dispatch({ type: 'UNCOMPLETE_TASK', payload: id });
  };

  return (
    <div className="min-h-screen bg-dark-col flex justify-center items-start pt-24 px-4">
      <div className="bg-dark-violet w-[475px] mx-auto rounded-2xl p-10">
        <div className="mb-12 grid grid-cols-[1fr_40px] gap-4">
          <input
            type="text"
            name="new-task"
            placeholder="Add a new task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-violet bg-dark-violet text-gray rounded-lg p-2.5"
          />
          <button className="add-button bg-violet text-light rounded-lg flex justify-center items-center" onClick={addNewTask}>
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        </div>

        <div className="mb-20">
          <h2 className="text-light text-lg font-light mb-4">
            Tasks to do - <span className="tasks-count">{state.tasks.length}</span>
          </h2>
          <ul className="tasks list-none text-violet">
            {state.tasks.map((task) => (
              <li key={task.id} className="task flex justify-between bg-darkest rounded-lg p-5 mb-4">
                <p>{task.name}</p>
                <div className="buttons-wrapper flex gap-2">
                  <button onClick={() => completeTask(task.id)} className="bg-transparent">
                    <span className="material-symbols-outlined text-2xl">done</span>
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="bg-transparent">
                    <span className="material-symbols-outlined text-2xl">delete</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-light text-lg font-light mb-4">
            Done - <span className="completed-tasks-count">{state.completedTasks.length}</span>
          </h2>
          <ul className="completed-tasks list-none">
            {state.completedTasks.map((task) => (
              <li key={task.id} className="task task--completed flex justify-between bg-darkest rounded-lg p-5 mb-4">
                <p className="text-green line-through">{task.name}</p>
                <button onClick={() => uncompleteTask(task.id)} className="bg-transparent">
                  <span className="material-symbols-outlined text-green text-2xl">close</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;


// 120, 207, 176