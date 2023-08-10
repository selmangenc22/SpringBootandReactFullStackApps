import {configureStore, applyMiddleware} from "@reduxjs/toolkit";
import messageReducer from './features/MessageSlice';
import todoReducer from './features/TodosSlice';
import todoFormReducer from './features/TodoFormSlice';

// @ts-ignore
export default configureStore({
    reducer: {
        message: messageReducer,
        todos: todoReducer,
        todoForm: todoFormReducer,
    },
})