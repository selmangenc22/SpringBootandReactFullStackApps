import React, {useEffect, useState} from 'react';
import "./TodoTable.css";
import {Link} from 'react-router-dom';
import ConfirmModal from "../confirmModal/ConfirmModal";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import {styled} from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchTodos,
    Filter,
    getCurrentTodo,
    getTodosError,
    getTodosStatus,
    handleTransactions,
    selectAllTodos,
    setTodo,
    TransactionType
} from "../../features/TodosSlice";
import AddIcon from "@mui/icons-material/Add";
import {setTodoName, setTodoTargetDate} from "../../features/TodoFormSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.common.white,
        border: '0.1px solid #555',
        textAlign: 'center',
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        color: '#333',
        border: '0.1px solid #eee',
        textAlign: 'center',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {

    },
}));

const TodoTable = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const dispatch = useDispatch();
    const currentTodo = useSelector(getCurrentTodo);
    const todos = useSelector(selectAllTodos);
    const todoStatus = useSelector(getTodosStatus);
    const error = useSelector(getTodosError);

    useEffect(() => {
        if(todoStatus === 'idle'){
            // @ts-ignore
            dispatch(fetchTodos(selectedFilter))
        }
    }, [todoStatus, dispatch]);

    const handleComplete  = async (todo: any) =>{
            // @ts-ignore
            dispatch(handleTransactions([todo, TransactionType.SetCompleted]));
    }

    const handleEdit = (todo: any) => {
        dispatch(setTodo(todo))
        dispatch(setTodoName(todo.name))
        dispatch(setTodoTargetDate(todo.targetDate))
    }

    const handleCancel = () => {
        setShowConfirmModal(false);
    }

    const handleFilter = (event: SelectChangeEvent) => {
        setSelectedFilter(event.target.value)
        // @ts-ignore
        dispatch(fetchTodos(event.target.value));
    }

    const handleDelete  = async () =>{
        // @ts-ignore
        dispatch(handleTransactions([currentTodo, TransactionType.Delete]));
        setShowConfirmModal(false);
        dispatch(setTodo(null));
    }

    const confirmDeleteTodo = (todo: any) => {
        dispatch(setTodo(todo))
        setShowConfirmModal(true);
    }

    return(
        <div className="">
            <Grid xs={10} justifyContent={"end"} margin={"auto"} container item>
                <Grid item>
                    <FormControl size={"small"} variant={"filled"} sx={{m:1, minWidth: 120}}>
                        <InputLabel id={"select-filter-label"}>
                            Show
                        </InputLabel>
                        <Select labelId={"select-filter-label"} id={"select-filter"} value={selectedFilter} onChange={handleFilter}>
                            <MenuItem selected value={Filter.None}>All</MenuItem>
                            <MenuItem value={Filter.Completed}>Completed</MenuItem>
                            <MenuItem value={Filter.Incomplete}>Incomplete</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid xs={10} container margin={"auto"} item>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label={"customized table"}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Todo</StyledTableCell>
                            <StyledTableCell>Target Date</StyledTableCell>
                            <StyledTableCell>State</StyledTableCell>
                            <StyledTableCell>Complete</StyledTableCell>
                            <StyledTableCell>Update</StyledTableCell>
                            <StyledTableCell>Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        todos.length == 0 && selectedFilter == Filter.None && (
                            <StyledTableRow style={{backgroundColor:'#fff'}}>
                                <StyledTableCell colSpan={6} style={{height: '50vh', fontSize:"large", fontWeight: "bold"}}>
                                    <Stack direction={"column"} spacing={3}>
                                        <Typography variant={'h5'} component={'span'}>
                                            Looks like there is nothing to do
                                        </Typography>
                                        <Link to={"/addTodo"}>
                                            <Button startIcon={<AddIcon />} variant={"contained"}>
                                                New todo
                                            </Button>
                                        </Link>
                                    </Stack>
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                        {

                        Array.isArray(todos) &&
                        todos?.map((
                            (todo: any) =>
                                <StyledTableRow style={{backgroundColor:`${todo.completed ? "#e6ffeb" : ""}`}} key={todo.id}>
                                    <StyledTableCell>{todo.name}</StyledTableCell>
                                    <StyledTableCell>{todo.targetDate}</StyledTableCell>
                                    <StyledTableCell>{todo.completed ? "Done" : "Not done"}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button variant={"contained"} type={"button"} onClick={() => handleComplete(todo)} className={todo.completed ? "btn btn-undo" : "btn btn-complete"}>
                                            {todo.completed ? "Undo" : "Complete"}
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Link to={"/updateTodo"}>
                                            <Button variant={"contained"} type={"button"} onClick={() => handleEdit(todo)} className="btn btn-edit">
                                                Edit
                                            </Button>
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Button variant={"contained"} onClick={() => confirmDeleteTodo(todo)} type={"button"} className="btn btn-delete">
                                            Delete
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            </Grid>
            {
                showConfirmModal && (
                    <ConfirmModal
                        message={`Are you sure you want to delete "${currentTodo.name}" todo`}
                        onConfirm={handleDelete}
                        onCancel={handleCancel}
                    />
                )
            }
        </div>
    );
}

export default TodoTable