const { createSlice } = require("@reduxjs/toolkit");

const watchSlice = createSlice({
  name: "watch",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = watchSlice.actions;
export default watchSlice.reducer;
