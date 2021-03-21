import * as actions from "./actionTypes";

export const createTag = (title, description) => ({
  type: actions.TAG_CREATED,
  payload: {
    title,
    description,
  },
});
