import create from "zustand";

const compare = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

export const tagStore = create((set) => ({
  tags: [],
  createTag: (tag) =>
    set((state) => {
      state.tags.push(tag);
      state.tags.sort(compare);

      return state;
    }),
  updateTag: (tag) =>
    set((state) => {
      const tagIndex = state.tags.findIndex((_tag) => _tag.id === tag.id);
      const updatedTag = { ...state.tags[tagIndex], tag };

      state.tags = [
        ...state.tags.slice(0, tagIndex),
        updatedTag,
        ...state.tags.slice(tagIndex + 1),
      ];

      return state;
    }),
}));
