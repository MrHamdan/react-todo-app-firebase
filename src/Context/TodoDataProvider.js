import React, { createContext } from 'react';
import useTodo from './useTodo';

export const TodoContext = createContext();

const TodoDataProvider = ({children}) => {

    const allContext = useTodo();

    return (
        <TodoContext.Provider value={allContext}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoDataProvider;