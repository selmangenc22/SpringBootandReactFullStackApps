import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api/AxiosConfig";
import {MessageType, setMessage} from "./MessageSlice";

export enum Filter{
    None = 'All',
    Completed = 'Completed',
    Incomplete = 'Incomplete'
}

export enum TransactionType{
    Add,
    Update,
    SetCompleted,
    Delete
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos',
    async (filter: Filter) => {
    try{
        let response;

        switch(filter){
            case Filter.None:
                response = await api.get("/api/v1/todo");
                break;
            case Filter.Completed:
                response = await api.post("/api/v1/todo/filter",
               {
                        filterKey: "isCompleted",
                        operation: "eq",
                        value: true
                    }
                );
                break;
            case Filter.Incomplete:
                response = await api.post("/api/v1/todo/filter",
                    {
                        filterKey: "isCompleted",
                        operation: "eq",
                        value: false
                    }
                );
                break;
            default:
                response = await api.get("/api/v1/todo");
                break;
        }
        return [...response.data];
    }
    catch(err: any){
        return err.message;
    }
})

export const handleTransactions = createAsyncThunk('todos/handleTransactions',
    async(transactionData: any, thunkAPI) => {
        let response;
        let todo = transactionData[0];
        let transactionType = transactionData[1];

        console.log(transactionData)

        switch (transactionType){
            case TransactionType.Add:
                // @ts-ignore
                response = await thunkAPI.dispatch(addTodo(todo));
                break;
            case TransactionType.SetCompleted:
                // @ts-ignore
                response = await thunkAPI.dispatch(updateTodoState(todo));
                break;
            case TransactionType.Update:
                // @ts-ignore
                response = await thunkAPI.dispatch(updateTodo(todo));
                break;
            case TransactionType.Delete:
                // @ts-ignore
                response = await thunkAPI.dispatch(deleteTodo(todo));
                break;
        }
        // @ts-ignore
        thunkAPI.dispatch(fetchTodos())
        return response;
    })
export const addTodo = createAsyncThunk('todos/addTodo',
    async(todo: any, thunkAPI) => {
        let msg;
        try{
            const response = await api.post(`/api/v1/todo`, {name:todo.name, targetDate: todo.targetDate})

            msg = (`${response.data.name} added successfully`)
            thunkAPI.dispatch(setMessage([msg, MessageType.Success, true]));
        }catch(error){
            msg = ('There is an error occurred while adding todo, please try again later')
            thunkAPI.dispatch(setMessage([msg, MessageType.Error, true]));
            console.error('Error updating todo state', error);
        }
    })
export const updateTodoState = createAsyncThunk('todos/updateTodoState',
    async(todo: any) => {
    try{
        const response = await api.post(`/api/v1/todo/${todo.id}?isCompleted=${!todo.completed}`)
        console.log(response.data);
    }catch(error){
        console.error('Error updating todo state', error);
    }
})
export const updateTodo = createAsyncThunk('todos/updateTodo',
    async(todo: any, thunkAPI) => {
        try{
            const response = await api.put(`/api/v1/todo/${todo.id}`, {
                name: todo.name,
                targetDate: todo.targetDate
            });
            thunkAPI.dispatch(setMessage([`${todo.name} todo updated successfully`, MessageType.Success, true]))

        }catch(error){
            thunkAPI.dispatch(setMessage([`There is an error occurred when updating ${todo.name} todo`, MessageType.Error, true]))
        }
    })
export const deleteTodo = createAsyncThunk('todos/deleteTodo',
    async(todo: any, thunkAPI) => {
    let msg;
    try{
        const response = await api.delete(`/api/v1/todo/${todo.id}`)
        msg = `${todo.name} todo deleted successfully`;
        thunkAPI.dispatch(setMessage([msg, MessageType.Success, true]));
    }catch(error){
        msg = `There is an error occurred when deleting ${todo.name} todo`;
        thunkAPI.dispatch(setMessage([msg, MessageType.Error, true]));
        console.error('Error deleting todo', error);
    }
})
export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        currentTodo: undefined,
        status: 'idle',
        error: '',
    },
    reducers:{
        setTodo: (state, action) => {
            state.currentTodo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                action.error.message ?
                    state.error = action.error.message :
                    state.error = '';
            })
    },
})
export const selectAllTodos = (state: any) => state.todos.todos;
export const getTodosStatus = (state: any) => state.todos.status;
export const getTodosError = (state: any) => state.todos.error;
export const getCurrentTodo = (state: any) => state.todos.currentTodo;
export const {setTodo} = todosSlice.actions

export default todosSlice.reducer