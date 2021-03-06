import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Fab, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles({
  addLocationStyle: {
    zIndex: 500,
    position: "absolute !important",
    bottom: "120px",
    right: "25px",
  },
});

export default function AddLocationModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [position, setPosition] = React.useState(null);
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setPosition(props.globalPosition);
  }, [props.globalPosition]);

  //Handling open/close add location modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const submitLocationHandler = () => {
    if (description !== "") {
      props.addLocation(description);
      setDescription("");
      handleClose();
    } else {
      alert("Please add a short description");
    }
  };

  return (
    <>
      <Fab
        className={classes.addLocationStyle}
        onClick={() => {
          handleClickOpen();
        }}
      >
        <Add />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Location</DialogTitle>
        <DialogContent>
          <DialogContentText>Please add short description.</DialogContentText>
          <TextField
            margin="dense"
            id="globalPosition"
            label={"Location"}
            value={position}
            disabled={true}
            fullWidth
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitLocationHandler} color="primary" type="submit">
            Add Location
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
