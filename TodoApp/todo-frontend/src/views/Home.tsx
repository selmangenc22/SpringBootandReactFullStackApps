import React from 'react';
import Header from '../components/header/Header';
import TodoTable from "../components/todo/TodoTable";

const Home = () => {
    return(
        <div>
            <Header></Header>
            <TodoTable></TodoTable>
        </div>
    )
}

export default Home