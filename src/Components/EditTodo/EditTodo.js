import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTodoProvider from '../../Context/useTodoProvider';
import './EditTodo.css';



const EditTodo = () => {
    const [todoList, setTodoList] = useTodoProvider();
    const { register, handleSubmit, resetField, watch, formState: { errors } } = useForm();
    const [updatedTaskName, setUpdatedTaskName] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const { todoid } = useParams();
    const selectedTask = todoList.find((task) => task.id == todoid);

    console.log(todoList);

    const onSubmit = data => {
        const updatedTask = {
            id: selectedTask?.id,
            remainingTask: updatedTaskName || selectedTask?.remainingTask,
            dueTaskDate: updatedDate || selectedTask?.dueTaskDate,
            status: updateStatus || selectedTask?.status,
        }
        const updatedTaskList = [];
        updatedTaskList.push(updatedTask);
        const newTaskList = todoList.map(task => updatedTaskList.find(o => o.id === task.id) || task);
        setTodoList(newTaskList);
        Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
    };



    const returnHome = useNavigate();

    const returnHomeButton = () => {
        returnHome('/');
    }


    const getUpdatedTask = (e) => {
        setUpdatedTaskName(e.target.value);
    }
    const getDate = (e) => {
        setUpdatedDate(e.target.value)
    }
    const updateHandler = () => {
        
    }




    return (
        <Box>
            <h1><span style={{color:'#61dafb'}}>Edit</span><span> Your Task</span> <span style={{color:'#61dafb'}}>Here</span></h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <input defaultValue={selectedTask.remainingTask}  placeholder="Rename Task"{...register("remainingTask",{required:true})} onBlur={getUpdatedTask}/>
                {errors.remainingTask && <span>This field is required</span>}
                
                <input defaultValue={selectedTask.dueTaskDate} type='date' {...register("dueTaskDate", { required: true })} onBlur={getDate}/>
                
                {errors.dueTaskDate && <span>This field is required</span>}
                <input readOnly defaultValue="Incomplete" type="hidden" {...register("status", { required: true })} />
                <input type="submit" value="Update Task"/>
            </form>
            <Button sx={{backgroundColor:'#61dafb !important', color:'black !important',fontWeight:'bold', fontSize:'20px'}} variant='contained' onClick={returnHomeButton}>See ToDo List</Button>
        </Box>
    );
};

export default EditTodo;