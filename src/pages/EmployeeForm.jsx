import { Grid } from "@material-ui/core";
import Controls from "components/controls/Controls";
import { useForm, Form } from "components/useForm";

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

export default function EmployeeForm() {
  const { values, setValues, handleInputChange } = useForm(initialValues);

  return (
    <Form>
      <Grid container>
        <Grid column xs={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Email"
            name="email"
            onChange={handleInputChange}
            value={values.email}
          />
          <Controls.Input
            label="Mobile"
            name="mobile"
            onChange={handleInputChange}
            value={values.mobile}
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
            <Controls.Button text="Reset" color="default" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
