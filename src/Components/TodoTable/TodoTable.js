import React, { useEffect, useState } from 'react';
import useTodoProvider from '../../Context/useTodoProvider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import logo from '../../logo.svg';
import { Link, unstable_HistoryRouter, useLocation, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';
import AddTaskIcon from '@mui/icons-material/AddTask';
import '../../App.css';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { child, get, getDatabase, ref } from 'firebase/database';
import initializeAuthentication from '../Firebase/firebase.init';
import useAuth from '../Hooks/useAuth';


const TodoTable = () => {
  const [todoList, setTodoList] = useTodoProvider();



  const { handleRegistration, handleEmailChange, handlePasswordChange, error, toggleLogin, isLogin, handleResetPassword, handleNameChange, handleGoogleSignIn, user, logOut } = useAuth();
  const location = useLocation();

  const history = useNavigate();

  const redirect_uri = location.state?.from || '/';

  const signInUsingGoogle = () => {
    handleGoogleSignIn()
      .then(result => {
        if (result.user) {
          history(redirect_uri);
        }
      })
  }







  let arr = [];

  const checkBoxHandler = (e) => {
    if (e.target.checked) {

      const find = todoList.find(task => task.id === e.target.value)
      arr.push(find)
      console.log(arr);
    }
    if (!e.target.checked) {
      const unChecked = arr.find(a => a.id === e.target.value)
      arr.splice(arr.indexOf(unChecked), 1)
      console.log('Spliced Array', arr);
    }

  }

  const deleteMultipleTask = () => {
    const filteredArray = todoList.filter((task) => {
      return arr.indexOf(task) < 0;

    });

    setTodoList(filteredArray);
  }






  useEffect(() => {
    if (user) {
      const dbRef = ref(getDatabase(initializeAuthentication()));
      get(child(dbRef, `todoList/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const todos = snapshot.val();
          const todoList = [];
          for (let id in todos) {
            todoList.push(todos[id])
          }
          setTodoList(todoList);
        } else {
          alert("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [user]);









  const handleDelete = id => {
    const newTodoList = todoList.filter((todo) => todo.id !== id)

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        setTodoList(newTodoList);
      }
    })
  }

  const handleToogle = id => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.status = !todo.status;
      }
      return todo;
    })
    setTodoList(newTodoList);
  }

  return (
    <>
      <Box>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <h1><span style={{ color: '#61dafb' }}>React</span>ToDo<span style={{ color: '#61dafb' }}>App</span></h1>
          </Box>
          <Box>
            <img style={{ width: '300px' }} src={logo} alt="" />
          </Box>
          <h5 style={{ color: '#61dafb' }}>{user.email}</h5>
        </Box>
      </Box>
      <Link to='addtodo'
        style={{
          color: 'black',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '20px'
        }}>
        <Button sx={{ marginBottom: '30px', backgroundColor: '#61dafb !important', color: 'black !important', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }} variant='contained'>Add Task<AddTaskIcon sx={{ fontSize: '20px', marginLeft: '10px', color: 'black' }}></AddTaskIcon></Button></Link>
      <Button variant="contained" color="warning" sx={{ mb: 2 }} onClick={deleteMultipleTask}>Delete</Button>
      {user?.email ?
        <Button variant="contained" color="secondary" sx={{ mb: 2 }} onClick={logOut}>Log Out</Button>
        :
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={signInUsingGoogle}>Google Sign In</Button>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>CheckBox</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Task Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Due Task Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Remaining Days</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.map((todo, index) => (
              <TableRow
                key={todo.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <Checkbox onChange={checkBoxHandler} value={todo.id} />
                <TableCell component="th" scope="row" align="center">
                  {todo.taskName}
                </TableCell>
                <TableCell align="center">{todo.dueTaskDate}</TableCell>
                <TableCell align="center">{todo.remainingDays}</TableCell>
                <TableCell align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {!todo.status &&
                    <Button sx={{ margin: '0px 20px', backgroundColor: 'white !important', '&:hover': { backgroundColor: '#333 !important' } }}><Link to={`/edittodo/${todo.id}`}><EditIcon sx={{ color: 'coral', fontSize: '40px' }}></EditIcon></Link></Button>
                  }


                  {
                    todo.status ?

                      <Typography sx={{ color: 'green', display: 'flex', alignItems: 'center' }}>Completed

                        <Button sx={{ margin: '0px 20px', backgroundColor: 'white !important', '&:hover': { backgroundColor: '#333 !important' } }} onClick={() => handleToogle(todo.id)}><ThumbUpOffAltIcon sx={{ color: 'green', fontSize: '40px' }} >

                        </ThumbUpOffAltIcon>
                        </Button>
                      </Typography>
                      :
                      <Typography sx={{ color: 'red', display: 'flex', alignItems: 'center' }}>Incomplete
                        <Button sx={{ margin: '0px 20px', backgroundColor: 'white !important', '&:hover': { backgroundColor: '#333 !important' } }} onClick={() => handleToogle(todo.id)}><ThumbDownOffAltIcon sx={{ color: 'red', fontSize: '40px' }} >

                        </ThumbDownOffAltIcon></Button>

                      </Typography>
                  }



                  <Button sx={{ margin: '0px 20px', backgroundColor: 'white !important', '&:hover': { backgroundColor: '#333 !important' } }} onClick={() => handleDelete(todo.id)}><HighlightOffIcon sx={{ color: 'red', fontSize: '40px' }} ></HighlightOffIcon></Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TodoTable;