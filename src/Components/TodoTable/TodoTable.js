import React from 'react';
import useTodoProvider from '../../Context/useTodoProvider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button } from '@mui/material';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const TodoTable = () => {
    const [todoList, setTodoList] = useTodoProvider();
    console.log(todoList);


    const handleDeleteButton = id => {
        const newTodoList = todoList.filter((todo) => todo.id !== id)
        setTodoList(newTodoList);
    }

    return (
        <>
        <Box>
        <Box style={{display:'flex', alignItems: 'center'}}>
            <Box>
                <h1><span style={{color:'#61dafb'}}>React</span>ToDo<span style={{color:'#61dafb'}}>App</span></h1>
            </Box>
            <Box>
                <img style={{width:'100%'}} src={logo} alt="" />
            </Box>
        </Box>
        </Box>
        <Button sx={{marginBottom:'30px', backgroundColor:'#61dafb'}} variant='contained'><Link to='addtodo'
                    style={{
                        color: 'white',
                        textDecoration: 'none'
                    }}>
                    Add Task
                </Link></Button>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Remaining Task</TableCell>
            <TableCell align="center">Due Task Date</TableCell>
            <TableCell align="center">Task Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoList.map((todo) => (
            <TableRow
              key={todo.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {todo.remainingTask}
              </TableCell>
              <TableCell align="center">{todo.dueTaskDate}</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell  align="center" sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <EditIcon sx={{color:'coral' , fontSize:'40px',marginLeft:'10px'}}></EditIcon>
                  <CheckCircleOutlineIcon sx={{color:'green', fontSize:'40px',marginLeft:'10px'}}></CheckCircleOutlineIcon>
                  <HighlightOffIcon sx={{color:'red', fontSize:'40px',marginLeft:'10px'}} onClick={() => handleDeleteButton(todo.id)}></HighlightOffIcon>
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