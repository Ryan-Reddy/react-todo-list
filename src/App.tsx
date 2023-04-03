import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY : string = 'todoApp.todos'
function App() {
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedTodos ? JSON.parse(storedTodos) : []
    })
    const todoNameRef = useRef();

    useEffect(() => {
        const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos))
        }
    }, [])
    useEffect(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
        }, [todos]
    )
    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }
    function addTodo(e) {
        const name = todoNameRef.current.value;
        if (name === '') return
        console.log(name)
        setTodos(prevTodos => {
            return [...prevTodos, {id: uuidv4(), name: name, complete:false}]
        })
        todoNameRef.current.value = null;

    }

    function handleClearTodos() {
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }
  return (
    <div className="App">
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoNameRef} type="text" />
        <button onClick={addTodo}>Add Todo</button>
        <button onClick={handleClearTodos}>Clear Complete</button>
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  )
}

export default App
