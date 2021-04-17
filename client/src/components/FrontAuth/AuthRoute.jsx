import React from "react";
import { connect, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
    const isLogin = useSelector(state => state.loginReducer.isLogin)
    const isAdmin = useSelector(state => state.loginReducer.isAdmin)
    const { isAuthUser, type } = props;
    if (type === "guest" && isAuthUser) return <Redirect to="/home" />;
    else if (type === "private" && !isAuthUser) return <Redirect to="/" />;

    return <Route {...props} />;
};

const mapStateToProps = ({ isAuthUser }) => ({
  isAuthUser
});

export default connect(mapStateToProps)(AuthRoute);