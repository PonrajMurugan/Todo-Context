import logo from './logo.svg';
import './App.css';
import { useReducer } from 'react';
import { intialState, reducerTodoFunction, TodoContext } from './feature/context';
import ToDoCreation from './pages/creation';

function App() {
  const [state,dispatch] = useReducer(reducerTodoFunction,intialState)
  return (
    <TodoContext.Provider
     value={{state,dispatch}}
     >
     <ToDoCreation />

     </TodoContext.Provider>
  );
}

export default App;
