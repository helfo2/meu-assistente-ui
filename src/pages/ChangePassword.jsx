import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { CircularProgress, List, ListItem } from "@material-ui/core";
import { changePassword } from "../services/auth";
import Toast from "../components/global/Toast";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const passwordErrorInfo = () => (
  <div>
    <Grid
      style={{
        display: "block !important",
        position: "relative",
        color: "red",
        fontSize: "12px",
      }}
    >
      <Typography component="h5">A senha deve conter:</Typography>
      <List dense>
        <ListItem>6 ou mais caracteres</ListItem>
        <ListItem>No mínimo um número</ListItem>
        <ListItem>No mínimo uma letra maiúscula</ListItem>
        <ListItem>No mínimo uma letra minúscula</ListItem>
      </List>
    </Grid>
  </div>
);

export default function ChangePassword() {
  const history = useHistory();
  const classes = useStyles();

  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [
    newPasswordConfirmationErrorText,
    setNewPasswordConfirmationErrorText,
  ] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeOldPassword = (e) => {
    const tempPassword = e.target.value;

    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );

    if (!mediumRegex.test(tempPassword)) {
      setOldPasswordError(true);
    } else {
      setOldPasswordError(false);
    }

    setOldPassword(tempPassword);
  };

  const onChangeNewPassword = (e) => {
    const tempPassword = e.target.value;

    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );

    if (!mediumRegex.test(tempPassword)) {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }

    setNewPassword(tempPassword);
  };

  const onChangeConfirmPassword = (e) => {
    const tempPassword = e.target.value;

    if (
      newPassword.length === 0 ||
      tempPassword.length === 0 ||
      newPassword !== tempPassword
    ) {
      setNewPasswordConfirmationErrorText("Senhas não coincidem");
    } else {
      setNewPasswordConfirmationErrorText("");
    }

    setNewPasswordConfirmation(tempPassword);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (
      oldPasswordError === true ||
      newPasswordError === true ||
      newPasswordConfirmationErrorText !== ""
    ) {
      return;
    }

    setMessage("");
    setLoading(true);

    changePassword(oldPassword, newPassword).then(
      () => {
        setLoading(false);
        history.push({
          pathname: "/dashboard",
          state: { fromChangePassword: true },
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "90vh" }}
    >
      <CssBaseline />
      <Grid item xs={3}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Mude sua senha
          </Typography>
          <form className={classes.form} onSubmit={handleChangePassword}>
            <Grid container spacing={2}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Senha"
                name="password"
                value={oldPassword}
                autoComplete="password"
                onChange={onChangeOldPassword}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Nova senha"
                name="password"
                value={newPassword}
                autoComplete="password"
                onChange={onChangeNewPassword}
                error={newPasswordError}
              />

              {newPasswordError ? passwordErrorInfo() : null}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="confirmPassword"
                label="Confirme a nova senha"
                name="confirmPassword"
                value={newPasswordConfirmation}
                autoComplete="confirmPassword"
                onChange={onChangeConfirmPassword}
                error={newPasswordConfirmationErrorText !== ""}
                helperText={newPasswordConfirmationErrorText}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  style={{
                    marginRight: 20,
                  }}
                />
              ) : (
                <span>Mudar senha</span>
              )}
            </Button>

            {message && <Toast isOpen type="error" message={message} />}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
