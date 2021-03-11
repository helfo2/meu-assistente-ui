import { Redirect, Route } from "react-router";
import authService from "services/auth-service";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authService.getCurrentUser() ? (
        <Component {...props}></Component>
      ) : (
        <Redirect to="/" />
      )
    }
  ></Route>
);

export default PrivateRoute;
