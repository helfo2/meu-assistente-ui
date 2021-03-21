import Header from "components/Header/index";
import Login from "pages/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "pages/Register";
import Dashboard from "pages/Dashboard";
import NotFound from "pages/PageNotFound";
import authService from "services/auth-service";
import ChangePassword from "pages/ChangePassword";
import Tags from "pages/Tags";
import PageHeader from "components/PageHeader";
import AdbIcon from "@material-ui/icons/Adb";
import { makeStyles } from "@material-ui/core";

function requireAuth(nextState, replace, next) {
  if (!authService.getCurrentUser()) {
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname },
    });
  }
  next();
}

const useStyles = makeStyles((theme) => ({
  appMain: {
    flexGrow: 1,
    padding: 0,
  },
}));

const MainContainer = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Header />
      <div className={classes.appMain}>
        <PageHeader
          title="Page Header Title"
          subtitle="Page Header description"
          icon={<AdbIcon fontSize="large" />}
        />
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
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default MainContainer;
