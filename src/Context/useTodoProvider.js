import { useContext } from "react";
import { TodoContext } from "./TodoDataProvider";

const useTodoProvider = () => {
    return useContext(TodoContext);
};

export default useTodoProvider;