import {Outlet} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import TodoSnackbar from "../components/snackbar/TodoSnackbar";

const Layout = () => {
    const showMessage = useSelector((state: any) => state.message.showMessage)

    return(
        <main>
            <Outlet/>
            {
                showMessage && (
                    <TodoSnackbar/>
                )
            }
        </main>
    )
}

export default Layout