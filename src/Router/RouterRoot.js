import React from 'react';
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import Login  from "../pages/Login";
import LayoutComponent  from "../layout/Layout";
import ProtectedRoutes from "./ProtectedRoutes";

function RouterRoot() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <ProtectedRoutes exact path="/" component={LayoutComponent}/>
                </Switch>
            </Router>
        </>
    );
}

export default RouterRoot;