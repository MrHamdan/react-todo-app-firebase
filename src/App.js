import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddTodo from './Components/AddTask/AddTodo';
import TodoTable from './Components/TodoTable/TodoTable';
import TodoDataProvider from './Context/TodoDataProvider';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <TodoDataProvider>
          <Routes>
            <Route path="/" element={<TodoTable/>}/>
            <Route path="addtodo" element={<AddTodo/>} />
          </Routes>
        </TodoDataProvider>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
