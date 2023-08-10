import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {useSelector, useDispatch} from "react-redux";
import {setMessage, MessageType} from "../../features/MessageSlice";
import {Alert} from "@mui/material";

const TodoSnackbar = () =>{
    const message = useSelector((state: any) => state.message.message)
    const showMessage = useSelector((state: any) => state.message.showMessage)
    const messageType = useSelector((state: any) => state.message.messageType)
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) =>{
        if(reason === "clickaway"){
            return;
        }

        dispatch(setMessage(["", false]))
    }

    return(
        <div>
            <Snackbar open = {showMessage} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity={messageType == MessageType.Success ? "success" : "error"} sx={{ width: '100%', color: 'white' }} variant={"filled"}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default TodoSnackbar