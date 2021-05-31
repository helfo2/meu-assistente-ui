import dispatcher from "../../appDispatcher";
import * as tagApi from "./api";
import actionTypes from "../actionTypes";

export const loadTags = () =>
  tagApi
    .getAllTags()
    .then((tags) =>
      dispatcher.dispatch({ actionType: actionTypes.LOAD_TAGS, tags })
    );

export const saveTag = (tag) =>
  tagApi.saveTag(tag).then((savedTag) => {
    dispatcher.dispatch({
      actionType: tag.id ? actionTypes.UPDATE_TAG : actionTypes.CREATE_TAG,
      tag: savedTag,
    });
  });

export const deleteTag = (tagId) =>
  tagApi.removeTag(tagId).then((deletedTag) =>
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_TAG,
      tag: deletedTag,
    })
  );
