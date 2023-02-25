import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Search from "@mui/icons-material/Search";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FaceOutlined from "@mui/icons-material/FaceOutlined";

const drawerWidth = 240;

const DrawerMenu = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        open={false}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FaceOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vikash Mishra" />
          <Search />
        </ListItem>
        <Divider />
        <List>
          {props.listObject1.map((obj) => (
            <ListItem key={obj.title}>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.title} />
              <div>{obj?.val}</div>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {props.listObject2.map((obj) => (
            <ListItem key={obj.title}>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.title} />
              <div>{obj.val}</div>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default DrawerMenu;
