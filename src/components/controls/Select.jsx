import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";

export default function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;

  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        {...(error && { error: true })}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
