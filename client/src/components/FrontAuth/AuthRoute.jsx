import React from "react";
import { connect, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function AuthRoute (props){
    const isLogin = useSelector(state => state.loginReducer.isLogin)
    const isAdmin = useSelector(state => state.loginReducer.isAdmin)
    const { type } = props;
    if (type === 'admin' && !isAdmin) return <Redirect to="/" />;
    else if (type === 'user' && !isLogin) return <Redirect to="/user/login" />;

    return <Route {...props} />;
};

export default AuthRoute;
