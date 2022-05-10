import React, { useState, useEffect, useRef } from 'react';
// import TodoForm from './TodoForm';
// import Todo from './Todo';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import '../styles/TodoList.css'
import axios from 'axios';

import { useParams } from 'react-router-dom';

const  TodoList=()=>{
  let {name} = useParams();
  const [todos, setTodos] = useState([]);
  const [change,setChange]=useState(false)

  useEffect(()=>{
    const promise= axios.get(`http://localhost:3000/todo/${name}`)
    promise.then((response)=>{
      console.log(response.data)
      setTodos(response.data)
    })
  },[change])

  const addTodo = todo => {
    if (!todo.item || /^\s*$/.test(todo.item)) {
      return;
    }
    
    const promise=axios.post('http://localhost:3000/todo/',todo)
    promise.then((response)=>{console.log(response)})
    setChange(prevState=>!prevState)
    // const newTodos = [todo, ...todos];

    // setTodos(newTodos);
    // console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    // const removedArr = [...todos].filter(todo => todo.id !== id);

    // setTodos(removedArr);

    const promise = axios.delete(`http://localhost:3000/todo/${id}`)
    promise.then(response=>console.log(response))
    setChange(prevState=>!prevState)
  };

  const completeTodo = id => {
    // let updatedTodos = todos.map(todo => {
    //   if (todo.id === id) {
    //     todo.isComplete = !todo.isComplete;
    //   }
    //   return todo;
    // });
    // setTodos(updatedTodos);
    
    const promise=axios.post('http://localhost:3000/todo/',{_id:id})
    promise.then((response)=>{console.log(response)})
    setChange(prevState=>!prevState)
  };

  return (
    <div className='todo-app'>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

const TodoForm=(props)=>{
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  let {name} = useParams();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      uname:name,
      item: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo._id} onClick={() => completeTodo(todo._id)}>
        {todo.item}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo._id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.item })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};



export default TodoList;