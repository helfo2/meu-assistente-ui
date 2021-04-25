import {
  create,
  remove,
  get,
  getAll,
  update,
} from "../../api/helpers/serviceBase";

const entityType = "tags";

export const getAllTags = () => getAll(entityType);

export const getTag = (tag) => get(entityType, tag.id);

export const createTag = (tag) => create(entityType, tag);

export const updateTag = (tag) => update(entityType, tag);

export const removeTag = (tag) => remove(entityType, tag);
