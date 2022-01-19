import { Alert, Button, Container, Typography } from '@mui/material';
import { display } from '@mui/system';
import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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
    }
    return (
        <div>
            <Container

            >

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
                    <Button sx={{ marginTop: '20px' }} variant='contained' onClick={navigateRoute}>See Todo List</Button>
                </form>

                {isAdded &&
                    <Alert sx={{ mt: 2 }} severity="success" onClose={() => setIsAdded(false)}>Task Added <strong>check ToDo Table</strong>. </Alert>
                }
            </ Container>
        </div>
    );
};

export default Form;