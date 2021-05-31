import React, { useState } from "react";
import {
  InputAdornment,
  makeStyles,
  Toolbar,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";

import { ColorButton } from "material-ui-color";
import Controls from "../../components/controls/Controls";
import useTable from "../../components/useTable";

const useStyles = makeStyles({
  searchInput: {
    width: "75%",
  },
});

const TagsCrud = ({
  tags,
  openInPopup,
  onDelete,
  setConfirmDialog,
  currentTag,
  setCurrentTag,
  setOpenPopup,
}) => {
  const classes = useStyles();

  const [filterFn, setFilterFn] = useState({ fn: (items) => items });

  const header = [
    { id: "title", label: "Nome" },
    { id: "color", label: "Cor" },
    { id: "description", label: "Descrição" },
    { id: "actions", label: "Ações", disableSorting: true },
  ];

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
  } = useTable(tags, header, filterFn);

  return (
    <>
      <Toolbar>
        <Box flexGrow={1}>
          <Controls.Input
            label="Buscar etiquetas"
            className={classes.searchInput}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Box>
        <Box>
          <Controls.Button
            text="Nova etiqueta"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setCurrentTag(currentTag);
              setOpenPopup(true);
            }}
          />
        </Box>
      </Toolbar>
      <TableContainer>
        <TableHeader />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <ColorButton color={item.color} />
              </TableCell>
              <TableCell>{item.description}</TableCell>
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
                      title: "Tem certeza?",
                      text: "Essa etiqueta não poderá ser recuperada",
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
    </>
  );
};

export default TagsCrud;
