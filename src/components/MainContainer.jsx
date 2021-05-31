import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import React from "react";
import Header from "./Header/index";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/PageNotFound";
import { getCurrentUser } from "../services/auth";
import ChangePassword from "../pages/ChangePassword";
import Tags from "../pages/tags/Tags";

function requireAuth(nextState, replace, next) {
  if (!getCurrentUser()) {
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname },
    });
  }
  next();
}

const useStyles = makeStyles((theme) => ({
  appMain: {
    marginLeft: theme.spacing(20) + 1,
    marginRight: theme.spacing(10) + 1,
    marginTop: theme.spacing(5) + 1,
  },
}));

const MainContainer = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Header />
      <div className={classes.appMain}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Login} />
          <Route
            exact
            path="/dashboard"
            component={Dashboard}
            onEnter={requireAuth}
          />
          <Route
            exact
            path="/change-password"
            component={ChangePassword}
            onEnter={requireAuth}
          />
          <Route exact path="/tags" component={Tags} onEnter={requireAuth} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default MainContainer;
