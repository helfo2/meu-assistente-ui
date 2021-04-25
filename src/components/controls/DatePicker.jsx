import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export default function DatePicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefaultEvent = (_name, _value) => ({
    target: {
      _name,
      _value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="MMM/dd/yyyy"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefaultEvent(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
