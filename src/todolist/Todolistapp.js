// src/TodoList.js
import React, { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {
        if (inputValue) {
            setTodos([...todos, { text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const toggleTodo = (index) => {
        const newTodos = todos.map((todo, i) => 
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    const removeTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Todo List</h2>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new todo"
                style={{ 
                    width: '70%', 
                    padding: '10px', 
                    fontSize: '1rem', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    marginBottom: '10px' 
                }}
            />
            <button 
                onClick={addTodo} 
                style={{ 
                    padding: '10px 15px', 
                    fontSize: '1rem', 
                    backgroundColor: '#007BFF', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                }}
            >
                Add
            </button>
            <ul style={{ listStyleType: 'none', padding: '0', marginTop: '20px' }}>
                {todos.map((todo, index) => (
                    <li key={index} style={{ 
                        textDecoration: todo.completed ? 'line-through' : 'none', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '10px', 
                        borderBottom: '1px solid #eee' 
                    }}>
                        <span 
                            onClick={() => toggleTodo(index)} 
                            style={{ cursor: 'pointer', flex: 1 }}
                        >
                            {todo.text}
                        </span>
                        <button 
                            onClick={() => removeTodo(index)} 
                            style={{ 
                                marginLeft: '10px', 
                                padding: '5px 10px', 
                                backgroundColor: 'red', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px', 
                                cursor: 'pointer' 
                            }}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default TodoList;
