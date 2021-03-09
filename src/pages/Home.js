import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main
  },
  appbar: {
    alignItems: 'center',
  },
  buttons: {
    alignItems: 'right',
    marginRight: 0
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography align="left" variant="h6" style={{width: "100%", alignItems: "left"}}>
            Meu assistente
          </Typography>
          <Toolbar className={classes.buttons}>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button color="inherit" href="/register">
              Cadastrar
            </Button>
          </Toolbar>
        </Toolbar>
      </AppBar>
    </div>
  );
}