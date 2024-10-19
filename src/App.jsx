import { TextField } from '@mui/material';
import './App.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleComplete } from './todoSlice';

function App() {
  const [display,setDisplay] = useState(0)
  const [todoText, setTodoText] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(addTodo({
        id: Date.now(),
        text: todoText,
        completed: false,
      }));
      setTodoText('');
      setDisplay(1)
    }
  };

  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <>
      <div className="container align-items-center justify-content-center text-center">
        <h1 className='mt-5 fw-bolder text-primary'>ADD YOUR TODOS</h1>
      </div>
      <div className="container text-center align-items-center">
        <TextField value={todoText} onChange={(e) => setTodoText(e.target.value)} id='textfield' variant="outlined" label="Input Your todo" type="text" className='w-75 mt-5' />
        <button onClick={handleAddTodo} className='btn btn-outline-primary fw-bolder' id='textbtn'>Add Todo</button>
      </div>
      <div id='added' className="container mt-5">
        {
          display == 1?
          <div className="row">
          <div className="col-6">
            <h2 className='text-danger mb-3'>Incomplete Todos</h2>
            {
              incompleteTodos.map((todo) => (
                <div className="todo-item d-flex align-items-center justify-content-between mb-2" key={todo.id}>
                  <h5>{todo.text}</h5>
                  <div>
                    <button onClick={() => dispatch(toggleComplete(todo.id))} className='btn btn-success ms-3'>Complete</button>
                    <button onClick={() => dispatch(deleteTodo(todo.id))} className='btn btn-danger ms-2'>Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="col-6">
            <h2 className='text-success mb-3'>Completed Todos</h2>
            {
              completedTodos.map((todo) => (
                <div className="todo-item d-flex align-items-center justify-content-between mb-2" key={todo.id}>
                  <h5>{todo.text}</h5>
                  <div>
                    <button onClick={() => dispatch(deleteTodo(todo.id))} className='btn btn-danger ms-3'>Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        :
        <div></div>
        }
       
      </div>
    </>
  );
}

export default App;
