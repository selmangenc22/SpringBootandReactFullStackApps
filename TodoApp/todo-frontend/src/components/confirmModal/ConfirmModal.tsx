import React from 'react';
import "./ConfirmModal.css";
import {Modal, Button, Typography, Grid, Paper, Stack} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #eee',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ConfirmModal = (props:{message: string,
                            onConfirm: any,
                            onCancel: any}) =>{
    return(
        <React.Fragment>
            <Modal open>
                <Grid direction={"column"} sx={{...style}} xs={6} component={Paper} padding={3} justifyContent={"flex-start"} alignItems={"stretched"} container>
                    <Grid item marginBottom={5}>
                        <Typography >
                            {props.message}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Stack justifyContent={"flex-end"} alignItems={"flex-start"} direction={"row"} spacing={1}>
                            <Button variant={"contained"} className={"btn-undo"} onClick={props.onCancel}>Cancel</Button>
                            <Button variant={"contained"} className={"btn-delete"} onClick={props.onConfirm}>Delete</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Modal>
        </React.Fragment>
    )
}

export default ConfirmModal