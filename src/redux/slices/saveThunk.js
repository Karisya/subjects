import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const saveThunk = createAsyncThunk(
  "data/saveThunk",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const payload = {
        subjects: state.subjects,
        teachersState: state.teachersState,
      };

      console.log("📦 Отправляем данные на сервер:", payload);

      const response = await axios.post("http://localhost:4000/api/save", payload);
      console.log("Ответ сервера:", response.data);

      return response.data;
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      return rejectWithValue(error.message);
    }
  }
);
