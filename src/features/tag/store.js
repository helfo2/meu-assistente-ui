// import create from "zustand";

// const compare = (a, b) => {
//   if (a.title < b.title) {
//     return -1;
//   }
//   if (a.title > b.title) {
//     return 1;
//   }
//   return 0;
// };

// export const tagStore = create((set) => ({
//   tags: [],
//   createTag: (tag) =>
//     set((state) => {
//       state.tags.push(tag);
//       state.tags.sort(compare);

//       return state;
//     }),
//   updateTag: (tag) =>
//     set((state) => {
//       const tagIndex = state.tags.findIndex((_tag) => _tag.id === tag.id);
//       const updatedTag = { ...state.tags[tagIndex], tag };

//       state.tags = [
//         ...state.tags.slice(0, tagIndex),
//         updatedTag,
//         ...state.tags.slice(tagIndex + 1),
//       ];

//       return state;
//     }),
// }));

import { EventEmitter } from "events";
import dispatcher from "../../appDispatcher";
import actionTypes from "../actionTypes";
import insertSorted from "../helpers/insertSorted";

const CHANGE_EVENT = "CHANGE_EVENT";

let tags = [];

class TagStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  // eslint-disable-next-line class-methods-use-this
  getTags() {
    return tags;
  }

  // eslint-disable-next-line class-methods-use-this
  getTagByTitle(title) {
    return tags.find((tag) => tag.title === title);
  }
}

const store = new TagStore();

dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_TAG:
      insertSorted(tags, action.tag, "title");
      store.emitChange();
      break;
    case actionTypes.UPDATE_TAG:
      tags = tags.map((tag) => (tag.id === action.tag.id ? action.tag : tag));
      store.emitChange();
      break;
    case actionTypes.DELETE_TAG:
      tags = tags.filter((tag) => tag.id !== action.tag.id);
      store.emitChange();
      break;
    case actionTypes.LOAD_TAGS:
      tags = action.tags;
      store.emitChange();
      break;
    default:
      break;
  }
});

export default store;
