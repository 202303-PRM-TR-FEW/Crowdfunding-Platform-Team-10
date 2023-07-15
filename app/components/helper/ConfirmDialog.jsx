import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";

export default function ConfirmDialog({
  open,
  title,
  message,
  handleOpen = () => {},
  handleClose = () => {},
}) {
  return (
    <>
      <Dialog
        open={open}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <h3 className="header-3 p-5">{title}</h3>
        {message && (
          <DialogBody className="px-5 py-3" divider>
            {message}
          </DialogBody>
        )}
        <DialogFooter>
          <button
            onClick={() => handleClose("Cancel")}
            className="btn-secondary mx-2"
          >
            <span>Cancel</span>
          </button>
          <button
            className="btn-primary"
            onClick={() => handleClose("Confirm")}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
