import { Grid, makeStyles, Paper } from "@material-ui/core";
import Toast from "components/global/Toast";
import PageHeader from "components/PageHeader";
import React from "react";
import { useLocation } from "react-router";
import AdbIcon from "@material-ui/icons/Adb";
import EmployeeForm from "./EmployeeForm";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    magin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function Dashboard() {
  const location = useLocation();
  const classes = useStyles();
  return (
    // <Grid
    //   container
    //   spacing={0}
    //   // direction="column"
    //   // alignItems="center"
    //   // justify="center"
    //   style={{ minHeight: "100vh" }}
    // >
    //   {location.state && location.state.fromChangePassword === true && (
    //     <Toast
    //       isOpen={true}
    //       type="success"
    //       message="Senha alterada com sucesso!"
    //     />
    //   )}

    //   <h2>Dashboard</h2>
    // </Grid>
    <>
      <PageHeader
        title="Page Header Title"
        subtitle="Page Header description"
        icon={<AdbIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <EmployeeForm />
      </Paper>
    </>
  );
}
