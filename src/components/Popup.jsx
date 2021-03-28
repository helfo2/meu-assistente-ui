import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Controls from "./controls/Controls";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: 0,
    paddingTop: 0,
  },
  dialogTypography: {
    flexGrow: 1,
  },
}));

export default function Popup(props) {
  const classes = useStyles();

  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            className={classes.dialogTypography}
          >
            {title}
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
