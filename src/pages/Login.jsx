import {
  Avatar,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "../services/auth";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeEmail = (e) => {
    const tempEmail = e.target.value;

    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (!pattern.test(tempEmail)) {
      setEmailErrorText("Entre com um e-mail válido");
    } else {
      setEmailErrorText("");
    }

    setEmail(tempEmail);
  };

  const onChangePassword = (e) => {
    const tempPassword = e.target.value;

    if (!(tempPassword.length >= 3)) {
      setPasswordErrorText("A senha deve conter no mínimo 3 caracteres");
    } else {
      setPasswordErrorText("");
    }

    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!(emailErrorText === "" && passwordErrorText === "")) {
      return;
    }

    setMessage("");
    setLoading(true);

    login(email, password).then(
      () => {
        setLoading(false);
        history.push("/dashboard");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if (error.code === "ECONNABORTED") {
          setMessage("Tente novamente");
        } else {
          setMessage(resMessage);
        }
        setLoading(false);
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
        {location.state && location.state.fromRegister === true && (
          <Toast
            isOpen
            type="success"
            message="Cadastro efetuado com sucesso! Por favor, faça login"
            duration={10000}
          />
        )}

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Login
          </Typography>
        </div>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de e-mail"
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={onChangeEmail}
            error={emailErrorText !== ""}
            helperText={emailErrorText}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            name="password"
            label="Senha"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={onChangePassword}
            error={passwordErrorText !== ""}
            helperText={passwordErrorText}
          />
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
              <span>Entrar</span>
            )}
          </Button>

          {message && <Toast isOpen type="error" message={message} />}

          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Não tem uma conta? Cadastre-se
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
