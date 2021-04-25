import {
  AppBar,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  useTheme,
} from "@material-ui/core";
import React, { useCallback, useState, useEffect } from "react";

import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { useLocation } from "react-router";
import { getCurrentUser } from "../../services/auth";
import UserControl from "./UserControl";
import EventSystem from "../../helpers/EventSystem";
import MenuList from "./MenuList";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    height: "100%",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Header() {
  const classes = useStyles();
  const location = useLocation();

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => {
    updateState({});
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    EventSystem.subscribe("USER_LOGIN", forceUpdate);
    EventSystem.subscribe("USER_LOGOUT", forceUpdate);

    return function cleanup() {
      EventSystem.unsubscribe("USER_LOGIN");
      EventSystem.unsubscribe("USER_LOGOUT");
    };
  });

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Grid container alignItems="center">
            {getCurrentUser() ? (
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            ) : null}

            <Grid item>
              <Typography
                style={{
                  color: "white",
                  width: "100%",
                  alignItems: "left",
                }}
                align="left"
                variant="h6"
              >
                Meu assistente
              </Typography>
            </Grid>
            <Grid item sm />
            <Grid item>
              <UserControl />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {getCurrentUser() ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <MenuList open={open} pathname={location.pathname} />
        </Drawer>
      ) : null}
    </div>
  );
}
