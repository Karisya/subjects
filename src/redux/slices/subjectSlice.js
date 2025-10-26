import { createSlice } from "@reduxjs/toolkit";

import { fetchSubject } from "./subjectThunk";

const subjectSlice = createSlice({
  name: "subjects",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubject.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default subjectSlice.reducer;
