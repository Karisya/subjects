import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const teachersStateSlice = createSlice({
  name: "teachersState",
  initialState,
  reducers: {
    initializeCardState: (state, action) => {
      const { cardId } = action.payload;
      if (!state[cardId]) {
        state[cardId] = {
          subgroups: [
            {
              lectures: "vacancy",
              laboratory: "vacancy",
              practic: "vacancy",
              seminar: "vacancy",
              control: "vacancy",
              additionalInfo: "",
            },
          ],
        };
      }
    },
    addSubgroup: (state, action) => {
      const { cardId } = action.payload;
      state[cardId].subgroups.push({
        lectures: "vacancy",
        laboratory: "vacancy",
        practic: "vacancy",
        seminar: "vacancy",
        control: "vacancy",
        additionalInfo: "",
      });
    },
    removeSubgroup: (state, action) => {
      const { cardId, index } = action.payload;
      if (state[cardId]?.subgroups?.length > 1) {
        state[cardId].subgroups.splice(index, 1);
      }
    },
    setTeacher: (state, action) => {
      const { cardId, subgroupIndex, key, value } = action.payload;
      state[cardId].subgroups[subgroupIndex][key] = value;
    },
    applyTeacherToAll: (state, action) => {
  const { cardId, subject, selected } = action.payload;
  const card = state[cardId];
  if (!card) return;

  card.subgroups = card.subgroups.map((sg) => ({
    ...sg,
    lectures: subject.lecturesHours !== "0" ? selected : sg.lectures,
    laboratory: subject.laboratoryHours !== "0" ? selected : sg.laboratory,
    practic: subject.practicHours !== "0" ? selected : sg.practic,
    seminar: subject.seminarHours !== "0" ? selected : sg.seminar,
    control: selected,
  }));
},
    setAdditionalInfo: (state, action) => {
      const { cardId, subgroupIndex, value } = action.payload;
      state[cardId].subgroups[subgroupIndex].additionalInfo = value;
    },
  },
});

export const {
  initializeCardState,
  addSubgroup,
  removeSubgroup,
  setTeacher,
  applyTeacherToAll,
  setAdditionalInfo,
} = teachersStateSlice.actions;

export default teachersStateSlice.reducer;
