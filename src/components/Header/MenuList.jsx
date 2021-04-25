import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatIcon from "@material-ui/icons/Chat";
import LabelIcon from "@material-ui/icons/Label";
import ContactsIcon from "@material-ui/icons/Contacts";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GroupIcon from "@material-ui/icons/Group";
import React from "react";

import {
  Tooltip,
  withStyles,
  List,
  Divider,
  Typography,
  ListItem,
  Link,
} from "@material-ui/core";

import menuItems from "./assets/menuItems.json";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#757575",
    color: "#ffffff",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const MenuList = ({ open, pathname }) => {
  const menuIcons = {
    dashboard: <DashboardIcon key="DashboardIcon" />,
    contacts: <ContactsIcon key="ContactsIcon" />,
    solicitations: <ChatIcon key="ChatIcon" />,
    alerts: <NotificationImportantIcon key="NotificationImportantIcon" />,
    tags: <LabelIcon key="LabelIcon" />,
    users: <GroupIcon key="GroupIcon" />,
    leave: <ExitToAppIcon key="ExitToAppIcon" />,
  };

  if (open === true) {
    return (
      <List key="list">
        {menuItems.items.map((item, index) => (
          <div key={item.key}>
            {index === 5 ? <Divider key="divider" /> : null}
            <ListItem
              button
              selected={pathname.includes(item.link)}
              component={Link}
              href={item.link}
              style={{ color: "#757575" }}
            >
              <ListItemIcon>{menuIcons[item.key]}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </div>
        ))}
      </List>
    );
  }

  return (
    <List key="list">
      {menuItems.items.map((item, index) => (
        <div key={item.key}>
          {index === 5 ? <Divider /> : null}
          <HtmlTooltip
            title={
              <>
                <Typography color="inherit">{item.title}</Typography>
              </>
            }
            placement="right"
          >
            <ListItem
              button
              selected={pathname.includes(item.link)}
              component={Link}
              href={item.link}
              style={{ color: "#757575" }}
            >
              <ListItemIcon>{menuIcons[item.key]}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </HtmlTooltip>
        </div>
      ))}
    </List>
  );
};

export default MenuList;
