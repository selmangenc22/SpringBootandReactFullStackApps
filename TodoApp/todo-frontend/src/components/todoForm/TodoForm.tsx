import React from 'react';
import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getTodoName, getTodoTargetDate, setTodoName, setTodoTargetDate} from "../../features/TodoFormSlice";
import {getCurrentTodo} from "../../features/TodosSlice";

const TodoForm = (props:{title: string, handleSubmit: any}) => {
    const dispatch = useDispatch()
    const todo = useSelector(getCurrentTodo);
    const todoName = useSelector(getTodoName);
    const todoTargetDate = useSelector(getTodoTargetDate);

    return(
        <form onSubmit={props.handleSubmit}>
            <Grid item margin={"auto"} xs={5} justifySelf={"center"} alignSelf={"center"} justifyContent={"flex-start"} alignItems={"stretch"} rowGap={4} padding={3} component={Paper} direction={"column"} container>
                <Grid item xs={7}>
                    <Typography component={"h5"} variant={"h5"}>
                        {props.title}
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <TextField label={"Name"} fullWidth margin={"none"} variant={"filled"} defaultValue={todo?.name} onChange={(e: any) => dispatch(setTodoName(e.target.value))}/>
                </Grid>
                <Grid item xs={7}>
                    <TextField label={"Target Date"} fullWidth margin={"none"} variant={"filled"} type={"date"} defaultValue={todo?.targetDate} onChange={(e:any) => dispatch(setTodoTargetDate(e.target.value))}/>
                </Grid>
                <Grid item xs={7}>
                    <Button disabled={todoName == '' || todoTargetDate == ''} size={"large"} fullWidth type="submit" variant="contained" color={"primary"}>{props.title}</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default TodoForm