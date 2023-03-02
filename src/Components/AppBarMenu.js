/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/joy/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";

import DrawerMenu from "./DrawerMenu";
import AddModal from "./AddModal";

const AppBarMenu = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    id: "",
    title: "",
    category: "",
    isDone: false,
  });
  const [errorState, setErrorState] = useState({
    isTitleValid: false,
    isCategoryValid: false,
    isTitleChanged: false,
    isCategoryChanged: false,
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({
    id: "",
  });
  const [editOpen, setEditOpen] = useState(false);

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
  const handleEditNote = (id, title, category) => {
    for (let index = 0; index < notes.length; index++) {
      let element = notes[index];
      if (element.id === id) {
        notes[index].title = title;
        notes[index].category = category;
        break;
      }
    }
    setNotes(notes);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    const newNoteData = notes.filter((item) => item.id !== id);
    setNotes(newNoteData);
    setDeleteOpen(false);
    setDeletedItem({
      ...deletedItem,
      id: "",
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDeleteClickOpen = (id) => {
    setDeleteOpen(true);
    setDeletedItem({ ...deletedItem, id: id });
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const handleEditClickOpen = (id) => {
    setEditOpen(true);
    setNote({ ...note, id: id });
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleEditSubmit = () => {
    handleEditNote(note.id, note.title, note.category);
    setNote({ id: "", title: "", category: "" });
    handleEditClose();
  };

  useEffect(() => {
    setErrorState({
      ...errorState,
      isTitleValid: note.title.length !== 0,
      isCategoryValid: note.category.length !== 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${props.drawerWidth}px)` },
          ml: { sm: `${props.drawerWidth}px` },
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
              {props.currWeekDay +
                " " +
                props.currMonth +
                " " +
                props.currDay +
                " " +
                props.currYear}
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
            width: props.drawerWidth,
          },
        }}
      >
        <DrawerMenu
          listObject1={props.listObject1}
          listObject2={props.listObject2}
        />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
        open
      >
        <DrawerMenu
          listObject1={props.listObject1}
          listObject2={props.listObject2}
        />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${props.drawerWidth}px)` },
          ml: { sm: `${props.drawerWidth}px` },
        }}
      >
        <Toolbar />
        {notes.map((obj) => (
          <Box key={obj.id}>
            <Grid container>
              <Grid item xs={0.5}>
                <FormControlLabel
                  value={obj.id}
                  control={
                    <Checkbox
                      checked={obj.isDone}
                      onChange={(event) => {
                        checkHandler(event, obj.id);
                      }}
                      inputprops={{ "aria-label": "primary checkbox" }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={10.5}>
                <Typography
                  style={{
                    textDecoration: obj.isDone ? "line-through" : "none",
                  }}
                  variant="h6"
                  component="span"
                >
                  {obj.title}
                </Typography>
                <Typography variant="subtitle1" component="p">
                  {obj.category}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditClickOpen(obj.id)}
                >
                  <EditIcon />
                </IconButton>
                <Dialog open={editOpen} onClose={handleEditClose}>
                  <DialogTitle>Edit Form</DialogTitle>
                  <DialogContent>
                    <TextField
                      onChange={(e) =>
                        setNote({ ...note, title: e.target.value })
                      }
                      onClick={() =>
                        setErrorState({
                          ...errorState,
                          isTitleChanged: true,
                        })
                      }
                      autoFocus
                      margin="dense"
                      id="title"
                      label="To-do"
                      type="text"
                      fullWidth
                      variant="standard"
                      error={
                        errorState.isTitleChanged && !errorState.isTitleValid
                      }
                      helperText={
                        errorState.isTitleChanged && !errorState.isTitleValid
                          ? "Title can't be empty"
                          : ""
                      }
                    />
                    <TextField
                      onChange={(e) =>
                        setNote({
                          ...note,
                          category: e.target.value,
                        })
                      }
                      onClick={() =>
                        setErrorState({
                          ...errorState,
                          isCategoryChanged: true,
                        })
                      }
                      autoFocus
                      margin="dense"
                      id="category"
                      label="Category"
                      type="text"
                      fullWidth
                      variant="standard"
                      error={
                        errorState.isCategoryChanged &&
                        !errorState.isCategoryValid
                      }
                      helperText={
                        errorState.isCategoryChanged &&
                        !errorState.isCategoryValid
                          ? "Category can't be empty"
                          : ""
                      }
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button
                      onClick={handleEditSubmit}
                      disabled={
                        !errorState.isTitleValid || !errorState.isCategoryValid
                      }
                    >
                      Edit
                    </Button>
                  </DialogActions>
                </Dialog>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteClickOpen(obj.id)}
                >
                  <DeleteIcon />
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
                    <Button onClick={handleDeleteClose}>NO</Button>
                    <Button
                      autoFocus
                      onClick={() => handleDelete(deletedItem.id)}
                    >
                      YES
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <Divider />
          </Box>
        ))}
        <ListItemButton onClick={handleClickOpen}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New To-do" />
        </ListItemButton>
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
