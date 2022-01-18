import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTodoProvider from '../../Context/useTodoProvider';


function checkDate() {
    var selectedText = document.getElementById('datepicker').value;
    var selectedDate = new Date(selectedText);
    var now = new Date();
    if (selectedDate < now) {
        alert("Date must be in the future");
    }
}


const AddTodo = () => {
    const [todoList, setTodoList] = useTodoProvider();
    const { register, handleSubmit, resetField, watch, formState: { errors } } = useForm();




    const onSubmit = data => {
        const newTask = {
            id: Math.random() * 5000,
            ...data,
            status: false,
        }
        const updatedTaskList = [...todoList, newTask];
        setTodoList(updatedTaskList);
        resetField("remainingTask", 'dueTaskDate');
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

                <input placeholder="Task Name"{...register("remainingTask", { required: true })} />
                {errors.remainingTask && <span>This field is required</span>}

                <input id="datepicker" onChange="checkDate()" required className="datepicker-input" type="date" data-date-format="yyyy-mm-dd" {...register("dueTaskDate", { required: true })} />

                {errors.dueTaskDate && <span>This field is required</span>}
                <input type="submit" />
            </form>
            <Button sx={{ backgroundColor: '#61dafb !important', color: 'black !important', fontWeight: 'bold', fontSize: '20px' }} variant='contained' onClick={returnHomeButton}>See ToDo List</Button>
        </Box>
    );
};

export default AddTodo;