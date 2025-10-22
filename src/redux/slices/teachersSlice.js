import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "./teachersThunk";

const teachersSlice = createSlice({
    name:"teachers",
    initialState: [],
    reducers:{},
    extraReducers: (builder) => {
    builder
    .addCase(fetchTeachers.fulfilled, (state, action) => {
      return action.payload;
    });
}
})

export default teachersSlice.reducer;