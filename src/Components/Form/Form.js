import { Button } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTodoProvider from '../../Context/useTodoProvider';
import './Form.css';
import { getDatabase, push, ref, update } from "firebase/database";
import initializeAuthentication from '../Firebase/firebase.init';
import useAuth from '../Hooks/useAuth';


const Form = () => {
    const { user } = useAuth();
    const [todoList, setTodoList] = useTodoProvider();
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
        const db = getDatabase(initializeAuthentication());
        push(ref(db, 'todoList/' + user.uid), {
            ...data,
            status: false,
            currentDate,
            remainingDays: handleRemainingDays(data.dueTaskDate),
            email: user.email,
            uid: user.uid
        });
        resetField('taskName', 'dueTaskDate');

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
            taskName: data.taskName || selectedTask.taskName,
            dueTaskDate: data.dueTaskDate || selectedTask.dueTaskDate,
            remainingDays: handleRemainingDays(data.dueTaskDate) || selectedTask.remainingDays
        }
        Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })

        const updates = {};
        updates[`/todoList/${user.uid}/${todoid}/taskName`] = updatedTask.taskName;
        updates[`/todoList/${user.uid}/${todoid}/dueTaskDate`] = updatedTask.dueTaskDate;
        updates[`/todoList/${user.uid}/${todoid}/remainingDays`] = updatedTask.remainingDays;
        return update(ref(getDatabase(initializeAuthentication())), updates);

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