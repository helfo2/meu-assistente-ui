import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import logo from "./404.svg";

const useStyles = makeStyles((theme) => ({
  appbar: {
    alignItems: "center",
  },
  message: {
    marginTop: theme.spacing(5),
    color: "#8a8e94",
    cursor: "default",
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item xs={3}>
        <img style={{ maxHeight: "50%" }} src={logo} alt="logo" />
        <Typography component="h1" variant="h5" className={classes.message}>
          Página não encontrada
        </Typography>
      </Grid>
    </Grid>
  );
}
