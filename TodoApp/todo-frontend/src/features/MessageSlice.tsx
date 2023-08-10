import {createSlice} from '@reduxjs/toolkit'

export enum MessageType{
    None,
    Success,
    Error,
}

export const messageSlice = createSlice({
    name: 'message',
    initialState:{
        message : '',
        messageType: MessageType,
        showMessage: false,
    },
    reducers:{
        setMessage: (state, action) =>{
            state.message = action.payload[0];
            state.messageType = action.payload[1];
            state.showMessage = action.payload[2];
        }
    }
})

export const {setMessage} = messageSlice.actions

export default messageSlice.reducer