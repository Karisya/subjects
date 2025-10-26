import { createAsyncThunk } from "@reduxjs/toolkit";

import { getSubject } from "../../api";

export const fetchSubject = createAsyncThunk("subjects/fetch", async () => {
  const data = await getSubject();
  return data;
});
