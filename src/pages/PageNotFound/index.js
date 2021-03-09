import { Container, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "./404.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    alignItems: 'center',
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img style={{ maxHeight: '50%' }} src={logo} alt="logo" />
        <Typography component="h1" variant="h5" className={classes.paper}>
          Página não encontrada
        </Typography>
        <Link href="/home">Voltar para home</Link>
      </div>
    </Container>
  );
}