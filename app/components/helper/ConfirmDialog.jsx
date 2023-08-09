import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useTranslations } from "next-intl"

export default function ConfirmDialog({
  open,
  title,
  message,
  handleOpen = () => {},
  handleClose = () => {},
}) {
  const t = useTranslations ("Helper")
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
          <Button onClick={() => handleClose("Cancel")}>{t("cncl")}</Button>
          <Button onClick={() => handleClose("Confirm")} autoFocus>
          {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
