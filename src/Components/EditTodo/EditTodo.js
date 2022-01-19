import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTodoProvider from '../../Context/useTodoProvider';
import './EditTodo.css';
import moment from 'moment';



const EditTodo = () => {
    const [todoList, setTodoList] = useTodoProvider();
    const { register, handleSubmit, resetField, watch, formState: { errors } } = useForm();
    const [updatedTaskName, setUpdatedTaskName] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const { todoid } = useParams();
    const selectedTask = todoList.find((task) => task.id == todoid);

    const today = new Date();
    const currentDate = today.getFullYear() + '-' + ('0' + today.getMonth() + 1).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    console.log(todoList);

    const updateMomentRemainingDays = (dueTaskDate) => {
        const given = moment(dueTaskDate, "YYYY-MM-DD");
        var current = moment().startOf('day');
        //Difference in number of days
        let remainingDays = moment.duration(given.diff(current)).asDays();
        return remainingDays;

    }


    const onSubmit = data => {
        const updatedTask = {
            id: selectedTask?.id,
            taskName: updatedTaskName || selectedTask?.taskName,
            dueTaskDate: updatedDate || selectedTask?.dueTaskDate,
            status: updateStatus || selectedTask?.status,
            remainingDays: updateMomentRemainingDays(updatedDate || selectedTask?.dueTaskDate)
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





    return (
        <>
            {/* <Box>
            <h1><span style={{ color: '#61dafb' }}>Edit</span><span> Your Task</span> <span style={{ color: '#61dafb' }}>Here</span></h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input defaultValue={selectedTask.taskName} placeholder="Rename Task"{...register("taskName", { required: true })} onBlur={getUpdatedTask} />
                {errors.taskName && <span>This field is required</span>}

                <input defaultValue={selectedTask.dueTaskDate} type='date' min={currentDate} defaultValue={currentDate} {...register("dueTaskDate", { required: true })} onBlur={getDate} />

                {errors.dueTaskDate && <span>This field is required</span>}
                <input readOnly defaultValue="Incomplete" type="hidden" {...register("status", { required: true })} />
                <input type="submit" value="Update Task" />
            </form>
            <Button sx={{ backgroundColor: '#61dafb !important', color: 'black !important', fontWeight: 'bold', fontSize: '20px' }} variant='contained' onClick={returnHomeButton}>See ToDo List</Button>
        </Box> */}
        </>
    );
};

export default EditTodo;