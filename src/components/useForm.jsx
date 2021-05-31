import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export const useForm = (
  initialValues,
  validateOnChange = false,
  validate,
  setErrors
) => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, setValues, handleInputChange, resetForm };
};

export const Form = (props) => {
  const classes = useStyles();

  const { children, onSubmit } = props;

  return (
    <form onSubmit={onSubmit} className={classes.root} autoComplete="off">
      {children}
    </form>
  );
};
