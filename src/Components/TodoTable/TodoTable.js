import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';
import AddTaskIcon from '@mui/icons-material/AddTask';
import '../../App.css';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';


const TodoTable = () => {
  const [todoList, setTodoList] = useTodoProvider();
  const [taskStatus, setTaskStatus] = useState(false);


  const checkBox = (id) => {

  }


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
        </Box>
      </Box>
      <Button sx={{ marginBottom: '30px', backgroundColor: '#61dafb !important' }} variant='contained'><Link to='addtodo'
        style={{
          color: 'black',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '20px'
        }}>
        Add Task
      </Link><AddTaskIcon sx={{ fontSize: '20px', marginLeft: '10px', color: 'black' }}></AddTaskIcon></Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <Checkbox align="center" sx={{ fontWeight: 'bold' }}>CheckBox</Checkbox>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Task Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Due Task Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Remaining Days</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.map((todo) => (
              <TableRow
                key={todo.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <Checkbox align="center" sx={{ fontWeight: 'bold' }} onClick={checkBox}></Checkbox>
                <TableCell component="th" scope="row" align="center">
                  {todo.taskName}
                </TableCell>
                <TableCell align="center">{todo.dueTaskDate}</TableCell>
                <TableCell align="center">{todo.remainingDays}</TableCell>
                <TableCell align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                  <Button sx={{ margin: '0px 20px', backgroundColor: 'white !important', '&:hover': { backgroundColor: '#333 !important' } }}><Link to={`/edittodo/${todo.id}`}><EditIcon sx={{ color: 'coral', fontSize: '40px' }}></EditIcon></Link></Button>



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