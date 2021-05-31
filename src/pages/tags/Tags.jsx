import React, { useEffect, useState } from "react";
import {
  // InputAdornment,
  makeStyles,
  // TableBody,
  // TableRow,
  // Toolbar,
  // TableCell,
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import Paper from "@material-ui/core/Paper";
// import Controls from "../components/controls/Controls";
// import { Search } from "@material-ui/icons";
// import useTable from "../components/useTable";

// import { getAllTags } from "../features/tag/api";
// import Controls from "../../components/controls/Controls";
import PageHeader from "../../components/PageHeader";
// import useTable from "../../components/useTable";
import Popup from "../../components/Popup";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";

import tagStore from "../../features/tag/store";
import { deleteTag, loadTags, saveTag } from "../../features/tag/actions";
import TagsCrud from "./TagsCrud";
import TagsForm from "./TagsForm";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    magin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const Tags = () => {
  const classes = useStyles();

  const initialValues = {
    id: 0,
    title: "",
    description: "",
    color: "#ff0000",
  };

  const [currentTag, setCurrentTag] = useState(initialValues);
  const [openPopup, setOpenPopup] = useState(false);
  const [tags, setTags] = useState(tagStore.getTags());
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

  const onChange = () => {
    setTags(tagStore.getTags());
  };

  useEffect(() => {
    tagStore.addChangeListener(onChange);
    if (tagStore.getTags().length === 0) {
      loadTags();
      console.log("chamei action");
    }
    return () => tagStore.removeChangeListener(onChange);
  }, []);

  const openInPopup = (item) => {
    console.log(item);
    setCurrentTag(item);
    setOpenPopup(true);
  };

  const removeTag = (tagId) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    deleteTag(tagId);

    setNotify({
      isOpen: true,
      message: "Etiqueta removida com sucesso",
      type: "success",
    });
  };

  const addOrEditTag = (tag, resetForm) => {
    resetForm();
    setCurrentTag(initialValues);
    setOpenPopup(false);
    saveTag(tag);

    if (tag.id === 0) {
      setNotify({
        isOpen: true,
        message: "Etiqueta criada com sucesso",
        type: "success",
      });
    } else {
      setNotify({
        isOpen: true,
        message: "Etiqueta alterada com sucesso",
        type: "success",
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Etiquetas"
        subtitle="Gerencie suas etiquetas e organize suas solicitações"
        icon={<LabelIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <TagsCrud
          tags={tags}
          openInPopup={openInPopup}
          onDelete={removeTag}
          currentTag={currentTag}
          setConfirmDialog={setConfirmDialog}
          setCurrentTag={setCurrentTag}
          setOpenPopup={setOpenPopup}
        />
      </Paper>
      <Popup title="Etiqueta" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <TagsForm currentTag={currentTag} addOrEdit={addOrEditTag} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Tags;
