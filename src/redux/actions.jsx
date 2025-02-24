import { createSlice } from "@reduxjs/toolkit";

export const graphSlice = createSlice({
  name: "graph",
  initialState: {
    data: null,
    dependencyList: [],
    dependencyId: [],
    currentDependency: null,
  },
  reducers: {
    addDependencyId: (state, action) => {
      state.dependencyId = [...state.dependencyId, action.payload];
    },
    addCurrentDependency: (state, action) => {
      state.currentDependency = action.payload;
    },
    updateData: (state, action) => {
      state.data = action.payload;
    },
    removeDependencyId: (state, action) => {
      state.dependencyId = state.dependencyId.filter(
        (e) => e != action.payload
      );
    },
    addDependencyList: (state, action) => {
      state.dependencyList = [...state.dependencyList, action.payload];
    },
    removeDependencyList: (state, action) => {
      state.dependencyList = state.dependencyList.filter(
        (e) => e != action.payload
      );
    },
  },
});

export const {
  updateData,
  addCurrentDependency,
  removeDependencyId,
  addDependencyId,
  removeDependencyList,
  addDependencyList,
} = graphSlice.actions;

export default graphSlice.reducer;
