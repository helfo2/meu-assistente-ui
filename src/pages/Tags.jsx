import {
  InputAdornment,
  makeStyles,
  TableBody,
  TableRow,
  Toolbar,
  TableCell,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LabelIcon from "@material-ui/icons/Label";
import Paper from "@material-ui/core/Paper";
// import Controls from "../components/controls/Controls";
import { Search } from "@material-ui/icons";
// import useTable from "../components/useTable";

import AddIcon from "@material-ui/icons/Add";
import { getAllTags } from "../features/tag/service";
import Controls from "../components/controls/Controls";
import PageHeader from "../components/PageHeader";
import useTable from "../components/useTable";

const headCells = [
  { id: "id", label: "ID" },
  { id: "title", label: "Nome" },
  { id: "color", label: "Cor" },
  { id: "description", label: "Descrição" },
  { id: "actions", label: "Ações", disableSorting: true },
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

export default function Tags() {
  const classes = useStyles();
  const allTags = getAllTags();

  const [filterFn, setFilterFn] = useState({ fn: (items) => items });
  const [tags, setTags] = useState([]);

  useEffect(async () => {
    setTags(await allTags);
  }, []);

  const handleSearch = (e) => {
    const { target } = e;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") {
          return items;
        }
        return items.filter((x) =>
          x.title.toLowerCase().includes(target.value.toLowerCase())
        );
      },
    });
  };

  const {
    TableContainer,
    TableHeader,
    TablePagination,
    recordsAfterPagingAndSorting,
  } = useTable(tags, headCells, filterFn);

  return (
    <>
      <PageHeader
        title="Etiquetas"
        subtitle="Gerencie suas etiquetas e organize suas solicitações"
        icon={<LabelIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Buscar etiquetas"
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
            text="Nova etiqueta"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
          />
        </Toolbar>
        <TableContainer>
          <TableHeader />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
        <TablePagination />
      </Paper>
    </>
  );
}
