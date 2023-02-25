import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import WbSunnyOutlined from "@mui/icons-material/WbSunnyOutlined";
import LocalGroceryStore from "@mui/icons-material/LocalGroceryStore";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
import FlightTakeoff from "@mui/icons-material/FlightTakeoff";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import WorkOutline from "@mui/icons-material/WorkOutline";
import Add from "@mui/icons-material/Add";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/joy/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import DrawerMenu from "./DrawerMenu";
import AddModal from "./AddModal";

let date = new Date();

let listObject1 = [
  {
    icon: <WbSunnyOutlined />,
    title: "My Day",
    val: 4,
  },
  {
    icon: <HomeOutlined />,
    title: "Important",
    val: 6,
  },
  {
    icon: <WbSunnyOutlined />,
    title: "To-Do",
    val: 4,
  },
];
let listObject2 = [
  {
    icon: <LocalGroceryStore />,
    title: "Groceries",
    val: 3,
  },
  {
    icon: <FormatListBulleted />,
    title: "Home",
    val: 5,
  },
  {
    icon: <FlightTakeoff />,
    title: "Europe Trip",
    val: 6,
  },
  {
    icon: <WorkOutline />,
    title: "Work",
    val: 2,
  },
  {
    icon: <Add />,
    title: "NewList",
  },
];

const drawerWidth = 240;

const AppBarMenu = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const checkHandler = (event, id) => {
    const newNotes = [...notes];
    let index = -1;
    newNotes.map((obj, i) => {
      if (obj.id === id) index = i;
    });
    newNotes[index].isDone = !newNotes[index].isDone;
    setNotes(newNotes);
  };

  const handleAddNote = (title, category) => {
    const newNote = {
      id: Math.random(),
      title: title,
      category: category,
      isDone: false,
    };
    const newNoteData = notes.concat(newNote);
    setNotes(newNoteData);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = (id) => {
    const newNoteData = notes.filter((item) => item.id !== id);
    setNotes(newNoteData);
    setDeleteOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            My Day
            <Typography variant="subtitle2">
              {date.toLocaleString("default", { weekday: "short" }) +
                " " +
                date.toLocaleString("default", { month: "short" }) +
                " " +
                date.toLocaleString("default", { day: "numeric" }) +
                " " +
                date.toLocaleString("default", { year: "numeric" })}
            </Typography>
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <DrawerMenu listObject1={listObject1} listObject2={listObject2} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <DrawerMenu listObject1={listObject1} listObject2={listObject2} />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        {notes.map((obj) => (
          <>
            <Grid container key={obj.id}>
              <Grid item xs={0.5}>
                <FormControlLabel
                  value={obj.id}
                  control={
                    <Checkbox
                      checked={obj.isDone}
                      onChange={(event) => {
                        checkHandler(event, obj.id);
                      }}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={11}>
                <Typography>
                  <span
                    style={{
                      textDecoration: obj.isDone ? "line-through" : "none",
                    }}
                    variant="h6"
                  >
                    {obj.title}
                  </span>
                  <Typography variant="subtitle1">{obj.category}</Typography>
                </Typography>
              </Grid>
              <Grid item xs={0.5}>
                {/* <DeleteIcon onClick={() => handleDelete(obj.id)} /> */}
                <IconButton aria-label="delete">
                  <DeleteIcon onClick={handleDeleteClickOpen} />
                </IconButton>
                <Dialog
                  open={deleteOpen}
                  onClose={handleDeleteClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to DELETE ?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleDeleteClose}>Disagree</Button>
                    <Button onClick={() => handleDelete(obj.id)}>Agree</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <Divider />
          </>
        ))}
        <Button
          variant="text"
          sx={{
            flexGrow: 1,
            p: 1,
            width: { sm: `calc(100%)` },
          }}
          startIcon={<Add />}
          onClick={handleClickOpen}
        >
          New To-do
        </Button>
        <AddModal
          open={open}
          handleClose={handleClose}
          onSubmit={handleAddNote}
        />
        <Divider />
      </Box>
    </Box>
  );
};
AppBarMenu.propTypes = {
  window: PropTypes.func,
};

export default AppBarMenu;
