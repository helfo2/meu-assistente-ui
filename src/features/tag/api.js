import {
  create,
  remove,
  get,
  getAll,
  update,
} from "../../api/helpers/serviceBase";

const TAGS = "tags";

export const getAllTags = () => getAll(TAGS);

export const getTag = (tag) => get(TAGS, tag.id);

export const saveTag = (tag) => {
  if (tag.id === 0) return create(TAGS, tag);
  return update(TAGS, tag);
};

export const removeTag = (tagId) => remove(TAGS, tagId);
