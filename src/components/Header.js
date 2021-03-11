import {
  AppBar,
  Avatar,
  Button,
  Link,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import EventSystem from "helpers/EventSystem";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import authService from "services/auth-service";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
  },
  appbar: {
    alignItems: "center",
  },
  buttons: {
    alignItems: "right",
    marginRight: 0,
  },
  myAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    fontSize: 14,
    cursor: "pointer",
  },
}));

const UserControls = (classes, history) => {
  if (authService.getCurrentUser()) {
    return PrivateControls(classes, history);
  }

  return PublicControls(classes, history);
};

const PrivateControls = (classes, history) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    authService.logout();
    history.push("/");
  };

  const handleChangePassword = () => {
    authService.logout();
    history.push("/");
  };

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar className={classes.buttons}>
      <Avatar onClick={handleAvatarClick} className={classes.myAvatar}>
        HF
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleChangePassword}>Trocar senha</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </Toolbar>
  );
};

const PublicControls = (classes, history) => (
  <Toolbar className={classes.buttons}>
    <Button color="inherit" href="/login">
      Login
    </Button>
    <Button color="inherit" href="/register">
      Cadastrar
    </Button>
  </Toolbar>
);

export default function Header() {
  const classes = useStyles();
  let history = useHistory();
  const [, updateState] = useState();

  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    EventSystem.subscribe("USER_LOGIN", forceUpdate);
    EventSystem.subscribe("USER_LOGOUT", forceUpdate);
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link
            style={{
              color: "white",
              width: "100%",
              alignItems: "left",
            }}
          >
            <Typography align="left" variant="h6">
              Meu assistente
            </Typography>
          </Link>
          {UserControls(classes, history)}
        </Toolbar>
      </AppBar>
    </div>
  );
}
