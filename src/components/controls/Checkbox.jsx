import React from "react";
import {
  FormControl,
  Checkbox as MuiCheckbox,
  FormControlLabel,
} from "@material-ui/core";

export default function Checkbox(props) {
  const { name, label, value, onChange } = props;

  const convertToDefaultEvent = (_name, _value) => ({
    target: {
      _name,
      _value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefaultEvent(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}
