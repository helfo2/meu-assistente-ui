import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import Controls from "./controls/Controls";

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;

  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="h6">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Controls.Button text="No" color="default" />
        <Controls.Button text="Yes" color="primary" />
      </DialogActions>
    </Dialog>
  );
}
