import { useState } from "react";


const useTodo = () => {

    const [todoList,setTodoList] = useState([]);

    return [
        todoList,
        setTodoList,
    ];
};

export default useTodo;