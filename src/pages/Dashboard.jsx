import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import AdbIcon from "@material-ui/icons/Adb";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import React, { useState } from "react";
// import { useLocation } from "react-router";
import Notification from "../components/Notification";
import PageHeader from "../components/PageHeader";
import ConfirmDialog from "../components/ConfirmDialog";
import Controls from "../components/controls/Controls";
import Popup from "../components/Popup";
import useTable from "../components/useTable";
import EmployeeForm from "../forms/EmployeeForm";

let employees = [
  {
    id: 0,
    fullName: "Amanco",
    email: "test@test.com",
    mobile: "1234567890",
    city: "Test City",
    gender: "male",
    departmentId: "1",
    hireDate: new Date(),
    isPermanent: false,
  },
  {
    id: 1,
    fullName: "Test FullName 2",
    email: "test2@test.com",
    mobile: "2345678901",
    city: "Test City 2",
    gender: "male",
    departmentId: "2",
    hireDate: new Date(),
    isPermanent: false,
  },
  {
    id: 2,
    fullName: "Test FullName 3",
    email: "test3@test.com",
    mobile: "3456789012",
    city: "Test City 3",
    gender: "male",
    departmentId: "2",
    hireDate: new Date(),
    isPermanent: false,
  },
  {
    id: 3,
    fullName: "Test FullName 4",
    email: "test4@test.com",
    mobile: "4567890123",
    city: "Test City 4",
    gender: "male",
    departmentId: "2",
    hireDate: new Date(),
    isPermanent: false,
  },
  {
    id: 4,
    fullName: "Test FullName 5",
    email: "test5@test.com",
    mobile: "5678901234",
    city: "Test City 5",
    gender: "male",
    departmentId: "1",
    hireDate: new Date(),
    isPermanent: false,
  },
  {
    id: 5,
    fullName: "Test FullName 6",
    email: "test5@test.com",
    mobile: "6789012345",
    city: "Test City 6",
    gender: "male",
    departmentId: "2",
    hireDate: new Date(),
    isPermanent: false,
  },
];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    magin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "fullName", label: "Employee name" },
  { id: "email", label: "Email" },
  { id: "mobile", label: "Mobile" },
  { id: "department", label: "Department" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Dashboard() {
  // const location = useLocation();
  const classes = useStyles();

  const departmentCollection = [
    { id: "1", title: "Development" },
    { id: "2", title: "Marketing" },
    { id: "3", title: "Accounting" },
    { id: "4", title: "HR" },
  ];

  const [records, setRecords] = useState(
    employees.map((employee) => ({
      ...employee,
      department: departmentCollection[employee.departmentId - 1],
    }))
  );

  const [filterFn, setFilterFn] = useState({ fn: (items) => items });
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const {
    TableContainer,
    TableHeader,
    TablePagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    const { target } = e;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") {
          return items;
        }
        return items.filter((x) =>
          x.fullName.toLowerCase().includes(target.value.toLowerCase())
        );
      },
    });
  };

  const addOrEdit = (employee, resetForm) => {
    if (employee.id === 0) {
      window.alert("INSERT");
    } else {
      window.alert("UPDATE");
    }

    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    employees.push(employee);

    setRecords(
      employees.map((_employee) => ({
        ..._employee,
        department: departmentCollection[_employee.departmentId - 1],
      }))
    );

    setNotify({
      isOpen: true,
      message: "Submitted succesfull",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });

    employees = employees.filter((x) => x.id !== id);
    setRecords(
      employees.map((employee) => ({
        ...employee,
        department: departmentCollection[employee.departmentId - 1],
      }))
    );

    setNotify({
      isOpen: true,
      message: "Delete succesfull",
      type: "error",
    });
  };

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
        <Toolbar>
          <Controls.Input
            label="Search employees"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add new"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setRecordForEdit(null);
              setOpenPopup(true);
            }}
          />
        </Toolbar>
        <TableContainer>
          <TableHeader />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department.title}</TableCell>
                <TableCell>
                  <Controls.ActionButton color="primary">
                    <EditOutlinedIcon
                      fontSize="small"
                      onClick={() => openInPopup(item)}
                    />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() =>
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure?",
                        subTitle: "This operation can't be undone",
                        onConfirm: () => onDelete(item.id),
                      })
                    }
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
        <TablePagination />
      </Paper>
      <Popup
        title="Employee form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
