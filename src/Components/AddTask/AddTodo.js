import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTodoProvider from '../../Context/useTodoProvider';




const AddTodo = () => {
    const [todoList, setTodoList] = useTodoProvider();
    const { register, handleSubmit, resetField, watch, formState: { errors } } = useForm();

    const today = new Date();
    const currentDate = today.getFullYear() + '-' + ('0' + today.getMonth() + 1).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    const remainingDays = () => {
        const remainingDays = Math.ceil((new Date(watch('dueTaskDate')).getTime() - today.getTime()) / (1000 * 3600 * 24));
        return remainingDays;
    }

    const onSubmit = data => {
        const newTask = {
            id: Math.random() * 5000,
            ...data,
            status: false,
            remainingDays: remainingDays()
        }
        const updatedTaskList = [...todoList, newTask];
        setTodoList(updatedTaskList);
        resetField("taskName", 'dueTaskDate');
        Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'Your New Task Has Been Listed',
            showConfirmButton: false,
            timer: 1500
        })
    };



    const returnHome = useNavigate();

    const returnHomeButton = () => {
        returnHome('/');
    }



    return (
        <Box>
            <h1><span style={{ color: '#61dafb' }}>Put Your</span><span> Task Name</span> <span style={{ color: '#61dafb' }}>Here</span></h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input placeholder="Task Name"{...register("taskName", { required: true })} />
                {errors.taskName && <span>This field is required</span>}

                <input type="date" min={currentDate} defaultValue={currentDate} {...register("dueTaskDate", { required: true })} />

                {errors.dueTaskDate && <span>This field is required</span>}
                <input type="submit" />
            </form>
            <Button sx={{ backgroundColor: '#61dafb !important', color: 'black !important', fontWeight: 'bold', fontSize: '20px' }} variant='contained' onClick={returnHomeButton}>See ToDo List</Button>
        </Box>
    );
};

export default AddTodo;