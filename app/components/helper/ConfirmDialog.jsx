import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

export default function ConfirmDialog({
  open,
  title,
  message,
  handleOpen = () => {},
  handleClose = () => {},
}) {
  return (
    <>
      <Dialog open={open}>
        <h3 className="header-3 p-5">{title}</h3>
        {message && (
          <DialogContent>
            <DialogContentText
              className="px-5 py-3"
              id="alert-dialog-description"
            >
              {message}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => handleClose("Cancel")}>Cancel</Button>
          <Button onClick={() => handleClose("Confirm")} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
