import React from 'react';
import "./Header.css";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {AppBar, Button, Grid, Stack, Toolbar, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {setTodo} from "../../features/TodosSlice";
import {setTodoName, setTodoTargetDate} from "../../features/TodoFormSlice";
import {useDispatch} from "react-redux";

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const handleAdd = (todo: any) => {
        // @ts-ignore
        dispatch(setTodo(null))
        // @ts-ignore
        dispatch(setTodoName(''))
        // @ts-ignore
        dispatch(setTodoTargetDate(''))

        navigate('/addTodo');
    }

    return(
        <AppBar position={'static'} sx={{mb:3, backgroundColor: 'secondary.main'}}>
            <Toolbar>
                <Grid justifyContent={"space-between"} spacing={24} container>
                    <Grid item>
                        <Link to={"/"} className={"text-decoration-none"}>
                            <Typography variant={"h5"} color={"white"} component={"h1"} sx={{flexGrow: 1}} gutterBottom>
                                My Todo App
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        {location.pathname != '/addTodo' && (<Button startIcon={<AddIcon />} variant={"contained"} onClick={handleAdd}>
                            New todo
                        </Button>)}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header