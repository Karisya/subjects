import { createAsyncThunk } from "@reduxjs/toolkit";

import { getTeachers } from "../../api";

export const fetchTeachers = createAsyncThunk("teachers/fetch", async () => {
  const data = await getTeachers();
  return data;
});
