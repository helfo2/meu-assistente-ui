import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    "& .MuiButton-label": {
      color: theme.palette.primary.main,
    },
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    "& .MuiButton-label": {
      color: theme.palette.primary.light,
    },
    "& .MuiButton-label:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

export default function ActionButton(props) {
  const classes = useStyles();

  const { color, children, onClick } = props;

  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  );
}
