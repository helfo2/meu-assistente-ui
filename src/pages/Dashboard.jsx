import { Grid } from "@material-ui/core";
import Toast from "components/global/Toast";
import React from "react";
import { useLocation } from "react-router";

export default function Dashboard() {
  const location = useLocation();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      {location.state && location.state.fromChangePassword === true && (
        <Toast
          isOpen={true}
          type="success"
          message="Senha alterada com sucesso!"
        />
      )}

      <h2>Dashboard</h2>
    </Grid>
  );
}
