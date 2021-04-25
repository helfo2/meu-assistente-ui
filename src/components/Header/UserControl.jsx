import {
  Avatar,
  makeStyles,
  Menu,
  MenuItem,
  Grid,
  Button,
  IconButton,
  Badge,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import {
  logout,
  getCurrentUser,
  getCurrentUserName,
} from "../../services/auth";

const useStyles = makeStyles((theme) => ({
  myAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    fontSize: 14,
    cursor: "pointer",
  },
}));

export default function UserControl() {
  const history = useHistory();
  const classes = useStyles();
  const toolbarRef = useRef();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    history.push("/");
  };

  const handleChangePassword = () => {
    setAnchorEl(null);
    history.push("/change-password");
  };

  const handleAvatarClick = () => {
    setAnchorEl(toolbarRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {getCurrentUser() ? (
        <Grid container alignItems="center">
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <Badge badgeContent={3} color="secondary">
                <ChatBubbleIcon />
              </Badge>
            </IconButton>
          </Grid>
          <Grid item ref={toolbarRef}>
            <IconButton onClick={handleAvatarClick}>
              <Avatar className={classes.myAvatar}>
                {getCurrentUserName()}
              </Avatar>
            </IconButton>
          </Grid>
          <Grid item>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleChangePassword}>Trocar senha</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item>
            <Button color="inherit" href="/login">
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" href="/register">
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
