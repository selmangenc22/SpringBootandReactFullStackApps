import {createSlice} from "@reduxjs/toolkit";

export const todoFormSlice = createSlice({
    name: 'todoForm',
    initialState: {
        todoName: '',
        todoTargetDate: '',
    },
    reducers:{
        setTodoName: (state, action: any) => {
            state.todoName = action.payload;
        },
        setTodoTargetDate: (state, action: any) => {
            state.todoTargetDate = action.payload;
        },
    }
})

export const getTodoName = (state: any) => state.todoForm.todoName;
export const getTodoTargetDate = (state: any) => state.todoForm.todoTargetDate;
export const {setTodoName, setTodoTargetDate} = todoFormSlice.actions

export default todoFormSlice.reducer