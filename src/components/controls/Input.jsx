import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const {
    className,
    name,
    label,
    value,
    error = null,
    onChange,
    inputProps,
    style,
  } = props;

  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      InputProps={inputProps}
      style={style}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(error && { error: true, helperText: error })}
    />
  );
}
