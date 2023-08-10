import React from 'react';
import {useNavigate} from 'react-router-dom';
import TodoForm from "../todoForm/TodoForm";
import {useDispatch, useSelector} from "react-redux";
import {getTodoName, getTodoTargetDate, setTodoName, setTodoTargetDate} from "../../features/TodoFormSlice";
import {handleTransactions, setTodo, TransactionType} from "../../features/TodosSlice";

const AddTodoForm = () =>{
    const todoName = useSelector(getTodoName);
    const todoTargetDate = useSelector(getTodoTargetDate)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = (e : any) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(setTodoName(''))
        // @ts-ignore
        dispatch(setTodoTargetDate(''))

        handleAdd().then();
    };

    const handleAdd  = async () =>{
        // @ts-ignore
        dispatch(handleTransactions([{name: todoName, targetDate: todoTargetDate}, TransactionType.Add]))
        navigate("/");
    }

    return(
        <React.Fragment>
            <TodoForm  title={"Add New Todo"}
                       handleSubmit={handleSubmit}
            />
        </React.Fragment>
    )
}

export default AddTodoForm