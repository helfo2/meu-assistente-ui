import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Controls from "../components/controls/Controls";
import { useForm, Form } from "../components/useForm";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const departmentCollection = [
  { id: "1", title: "Development" },
  { id: "2", title: "Marketing" },
  { id: "3", title: "Accounting" },
  { id: "4", title: "HR" },
];

const initialValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

export default function EmployeeForm(props) {
  const { recordForEdit, addOrEdit } = props;

  const [errors, setErrors] = useState({});

  const validate = (fieldValues) => {
    const temp = { ...errors };

    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required";

    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid";

    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum of 10 numbers required";

    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length !== 0 ? "" : "This field is required";

    setErrors({
      ...temp,
    });

    // if (fieldValues === values)
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, resetForm } = useForm(
    initialValues,
    true,
    validate,
    setErrors
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({ ...recordForEdit });
    }
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid column xs={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            label="Email"
            name="email"
            onChange={handleInputChange}
            value={values.email}
            error={errors.email}
          />
          <Controls.Input
            label="Mobile"
            name="mobile"
            onChange={handleInputChange}
            value={values.mobile}
            error={errors.mobile}
          />
          <Controls.Input
            label="City"
            name="city"
            onChange={handleInputChange}
            value={values.city}
          />
        </Grid>
        <Grid column xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            onChange={handleInputChange}
            value={values.gender}
            items={genderItems}
          />
          <Controls.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={departmentCollection}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            name="hireDate"
            label="Hire Date"
            onChange={handleInputChange}
            value={values.hireDate}
          />
          <Controls.Checkbox
            name="isPermanent"
            label="Is Permanent"
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button text="Submit" type="submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
