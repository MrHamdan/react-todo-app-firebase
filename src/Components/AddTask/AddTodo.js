import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import useTodoProvider from '../../Context/useTodoProvider';
import './AddTodo.css';


const AddTodo = () => {
    const [todoList, setTodoList] = useTodoProvider();
    const { register, handleSubmit, resetField, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const newTask = {
            id: Math.random() * 5000,
            ...data,
        }
        const updatedTaskList = [...todoList, newTask];
        setTodoList(updatedTaskList);
        resetField("remainingTask", 'dueTaskDate');
    };
    const { pathname } = useLocation();



    const returnHome = useNavigate();

    const returnHomeButton = () => {
        returnHome('/');
    }


    return (
        <Box>
            <h1>Put Your Task Name Here</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input  placeholder="Task Name"{...register("remainingTask",{required:true})}/>
                {errors.remainingTask && <span>This field is required</span>}
                {/* include validation with required or other standard HTML validation rules */}
                <input type='date' {...register("dueTaskDate", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.dueTaskDate && <span>This field is required</span>}

                <input type="submit" />
            </form>
            <Button variant='contained' onClick={returnHomeButton}>Return Home</Button>
        </Box>
    );
};

export default AddTodo;