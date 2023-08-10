import React from 'react';
import {useNavigate} from "react-router-dom";
import TodoForm from "../todoForm/TodoForm";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentTodo, handleTransactions, setTodo, TransactionType} from "../../features/TodosSlice";
import {getTodoName, getTodoTargetDate, setTodoName, setTodoTargetDate} from "../../features/TodoFormSlice";

const UpdateTodoForm = () =>{
    const todo = useSelector(getCurrentTodo);
    const todoName = useSelector(getTodoName)
    const todoTargetDate = useSelector(getTodoTargetDate)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // @ts-ignore
        dispatch(setTodoName(''));
        // @ts-ignore
        dispatch(setTodoTargetDate(''));

        handleUpdate()
    };

    const handleUpdate  = async () =>{
        // @ts-ignore
        dispatch(handleTransactions([{id: todo.id, name: todoName, targetDate: todoTargetDate}, TransactionType.Update]))
        navigate("/");
    }

    return(
        <TodoForm
            title={"Update Todo"}
            handleSubmit={handleSubmit}
        />
    )
}

export default UpdateTodoForm