import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddTodo from './Components/AddTask/AddTodo';
import EditTodo from './Components/EditTodo/EditTodo';
import TodoTable from './Components/TodoTable/TodoTable';
import TodoDataProvider from './Context/TodoDataProvider';
import TodoFormShower from './Components/TodoFormShower/TodoFormShower';
import AuthProvider from './Context/AuthProvider';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
          <TodoDataProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<TodoTable />} />
                <Route path="addtodo" element={<TodoFormShower />} />
                <Route path="edittodo/:todoid" element={<TodoFormShower />} />
              </Routes>
            </BrowserRouter>
          </TodoDataProvider>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
