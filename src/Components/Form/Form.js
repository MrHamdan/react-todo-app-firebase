import { Alert, Button, Container, Typography } from '@mui/material';
import { display } from '@mui/system';
import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTodoProvider from '../../Context/useTodoProvider';
import './Form.css';





const Form = () => {
    const [todoList, setTodoList] = useTodoProvider();
    const [updatedTaskName, setUpdatedTaskName] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    const { todoid } = useParams();
    const selectedTask = todoList.find((task) => task.id === todoid);
    const today = new Date();
    const currentDate = today.getFullYear() + '-' + ('0' + today.getMonth() + 1).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    const navigate = useNavigate();
    const navigateRoute = () => {
        navigate('/');
    }
    const { register, handleSubmit, resetField, formState: { errors } } = useForm();

    const handleRemainingDays = (dueTaskDate) => {
        const given = moment(dueTaskDate, "YYYY-MM-DD");
        var current = moment().startOf('day');
        //Difference in number of days
        let remainingDays = moment.duration(given.diff(current)).asDays();
        return remainingDays;
    }

    const handleAddData = data => {

        const newTask = {
            id: (Math.random() * 100).toString(),
            ...data,
            status: false,
            currentDate,
            remainingDays: handleRemainingDays(data.dueTaskDate)
        }
        const updatedtodoList = [...todoList, newTask];
        setTodoList(updatedtodoList);
        resetField("taskName", "dueTaskDate");
        setIsAdded('true');
        Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'Your New Task Has Been Listed',
            showConfirmButton: false,
            timer: 1500
        })

    }

    const handleUpdate = (data) => {
        console.log(data);
        const updatedTask = {
            id: selectedTask?.id,
            ...data,
            remainingDays: handleRemainingDays(data.dueTaskDate) || selectedTask.remainingDays
        }
        const updatedtodoList = [];
        updatedtodoList.push(updatedTask);
        const newtodoList = todoList.map(task => updatedtodoList.find(o => o.id === task.id) || task);
        setTodoList(newtodoList);
        navigate('/');
        Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    }
    return (
        <div>
                <div>
                    {
                        !todoid ? <h1><span style={{ color: '#61dafb' }}>Put Your</span><span> Task Name</span> <span style={{ color: '#61dafb' }}>Here</span></h1> : <h1><span style={{ color: '#61dafb' }}>Edit</span><span> Your Task</span> <span style={{ color: '#61dafb' }}>Here</span></h1>
                    }
                </div>
                <form form onSubmit={!todoid ? handleSubmit(handleAddData) : handleSubmit(handleUpdate)}>
                    <label >Task Name</label>

                    <input placeholder={!todoid ? 'Task' : ''} defaultValue={todoid && selectedTask?.taskName}
                        {...register("taskName", { required: true })} />


                    <label >Add Due Date</label>

                    <input type='date' defaultValue={!todoid ? currentDate : selectedTask?.dueTaskDate} min={currentDate} {...register("dueTaskDate", { required: true })} />

                    <input type="submit" />


                    {(errors.taskName || errors.dueTaskDate) && <span>This field is required</span>}
                    <Button sx={{ backgroundColor: '#61dafb !important', color: 'black !important', fontWeight: 'bold', fontSize: '20px' }} variant='contained' onClick={navigateRoute}>See ToDo List</Button>
                </form>
        </div>
    );
};

export default Form;