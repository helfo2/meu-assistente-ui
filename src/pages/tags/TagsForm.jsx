import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { ColorPicker } from "material-ui-color";
import React, { useEffect, useState } from "react";
import Controls from "../../components/controls/Controls";
import { Form, useForm } from "../../components/useForm";

const useStyles = makeStyles((theme) => ({
  colorForm: {
    color: theme.palette.secondary.light,
  },
}));

export default function TagsForm(props) {
  const classes = useStyles();

  const { currentTag, addOrEdit } = props;

  const [errors, setErrors] = useState({});
  const [color, setColor] = useState(currentTag.color);

  const validateOnChange = true;

  const validate = (fieldValues) => {
    const temp = { ...errors };

    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : "Nome é obrigatório";

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, resetForm } = useForm(
    currentTag,
    validateOnChange,
    validate,
    setErrors
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (color.css) values.color = color.css.backgroundColor;
    else values.color = color;

    if (validate(values)) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (currentTag != null) {
      setValues({ ...currentTag });
    }
  }, [currentTag]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid style={{ width: "75%" }}>
          <Controls.Input
            name="title"
            label="Nome"
            value={values.title}
            onChange={handleInputChange}
            error={errors.title}
            style={{ width: "90%" }}
          />
          <Controls.Input
            name="description"
            label="Descrição"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
            style={{ width: "90%" }}
          />
        </Grid>
        <Grid>
          <FormControl variant="outlined">
            <FormControlLabel
              label="Cor"
              labelPlacement="top"
              className={classes.colorForm}
              control={
                <ColorPicker
                  name="color"
                  value={color}
                  onChange={setColor}
                  defaultValue="#ff0000"
                  hideTextfield
                  disableAlpha
                  disablePlainColor
                />
              }
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 30 }}
      >
        <Controls.Button text="Salvar" type="submit" />
      </Box>
    </Form>
  );
}
