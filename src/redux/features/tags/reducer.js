import * as actionTypes from "./actionTypes";

const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.TAG_CREATED:
      return [
        ...state,
        {
          title: action.payload.title,
          description: action.payload.description,
        },
      ];
    default:
      return state;
  }
};

export default tagsReducer;
