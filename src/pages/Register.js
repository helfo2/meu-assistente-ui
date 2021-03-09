import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
import { useState } from 'react';
import AuthService from '../services/auth-service';
import Toast from 'components/global/toast.component';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  let history = useHistory();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [emailErrorText, setEmailErrorText] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameErrorText, setFirstNameErrorText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeEmail = (e) => {
    const tempEmail = e.target.value;
    
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    
    if (!pattern.test(tempEmail)) {
      setEmailErrorText('Entre com um e-mail válido');
    } 
    else {
      setEmailErrorText('');
    }

    setEmail(tempEmail);
  }

  const onChangeFirstName = (e) => {
    const tempFirstName = e.target.value;
    const pattern = /^[a-zA-Z ]{2,30}$/;

    if (tempFirstName.length < 3 || !pattern.test(tempFirstName)) {
      setFirstNameErrorText('Entre com um nome válido');
    } 
    else {
      setFirstNameErrorText('');
    }

    setFirstName(tempFirstName);
  }

  const onChangePassword = (e) => {
    const tempPassword = e.target.value;
    
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if (!mediumRegex.test(tempPassword)) {
      setPasswordErrorText(`A senha deve conter:\n\t6 ou mais caracteres\n\tNo mínimo um número\n\tNo mínimo uma letra maiúscula\n\tNo mínimo uma letra minúscula`);
    }
    else {
      setPasswordErrorText('');
    }

    setPassword(tempPassword);
  }

  const onChangeConfirmPassword = (e) => {
    const tempPassword = e.target.value;
    
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if (!mediumRegex.test(tempPassword)) {
      setConfirmPasswordErrorText('A senha deve conter:\n\t6 ou mais caracteres\n\nNo mínimo um número\n\tNo mínimo uma letra maiúscula\n\tNo mínimo uma letra minúscula');
    }
    else if (password.length === 0 || tempPassword.length === 0 || password !== tempPassword) {
      setConfirmPasswordErrorText('Senhas não coincidem');
    }
    else {
      setConfirmPasswordErrorText('');
    }

    setConfirmPassword(tempPassword);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    if (!(firstNameErrorText === '' && emailErrorText === '' && passwordErrorText === '' && confirmPasswordErrorText === '')) {
      return;
    }

    setMessage("");
    setLoading(true);

    AuthService.register(firstName, email, password).then(
      () => {
        setLoading(false);
        history.push('/login');
      },
      error => {
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
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <form 
          className={classes.form}
          onSubmit={handleRegister}>
          <Grid container spacing={2}>

            <TextField 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Nome"
              name="firstName"
              value={firstName} 
              autoFocus
              onChange={onChangeFirstName}
              error={firstNameErrorText !== ''} 
              helperText={firstNameErrorText}
            />

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
              onChange={onChangeEmail}
              error={emailErrorText !== ''} 
              helperText={emailErrorText}
            />
            
            <TextField 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="Senha"
              name="password"
              value={password} 
              autoComplete="password"
              onChange={onChangePassword}
              error={passwordErrorText !== ''} 
              helperText={passwordErrorText}
            />

            <TextField 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="confirmPassword"
              label="Confirme a senha"
              name="confirmPassword"
              value={confirmPassword} 
              autoComplete="confirmPassword"
              onChange={onChangeConfirmPassword}
              error={confirmPasswordErrorText !== ''} 
              helperText={confirmPasswordErrorText}
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
            {loading && (
                  <CircularProgress></CircularProgress>
                )}
            Cadastrar
          </Button>

          {message && (
            <Toast isOpen={true} type="error" message={message} />
          )}
        
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Já tem uma conta? Entre
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}