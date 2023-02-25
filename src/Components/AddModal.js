import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const AddModal = (props) => {
  const [errorState, setErrorState] = useState({
    isTitleValid: false,
    isCategoryValid: false,
    isTitleChanged: false,
    isCategoryChanged: false,
  });

  const [note, setNote] = useState({
    title: "",
    category: "",
    isDone: false,
  });
  const handleSubmit = () => {
    props.onSubmit(note.title, note.category);
    setNote({ title: "", category: "" });
    props.handleClose();
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
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add New To-Do Item</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setNote({ ...note, title: e.target.value })}
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
            error={errorState.isTitleChanged && !errorState.isTitleValid}
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
              setErrorState({ ...errorState, isCategoryChanged: true })
            }
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            error={errorState.isCategoryChanged && !errorState.isCategoryValid}
            helperText={
              errorState.isCategoryChanged && !errorState.isCategoryValid
                ? "Category can't be empty"
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!errorState.isTitleValid || !errorState.isCategoryValid}
          >
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddModal;
