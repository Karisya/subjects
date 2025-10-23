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
            },
        ],
        additionalInfo: "",
        };
      }
    },
    addSubgroup: (state, action) => {
  const { cardId, totalStudents } = action.payload;
  const subgroups = state[cardId].subgroups;

  if (subgroups.length >= 2) return;

  const half = Math.floor(totalStudents / 2);
  state[cardId].totalStudents = totalStudents;

  subgroups[0].studentsNumber = half;
  subgroups.push({
    lectures: "vacancy",
    laboratory: "vacancy",
    practic: "vacancy",
    seminar: "vacancy",
    control: "vacancy",
    studentsNumber: totalStudents - half,
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
  const { cardId, value } = action.payload;
  state[cardId].additionalInfo = value; 
},
    setSubgroupStudentsNumber: (state, action) => {
  const { cardId, subgroupIndex, value } = action.payload;
  const subgroups = state[cardId].subgroups;
  const totalStudents = state[cardId].totalStudents || 0;

  if (subgroups.length !== 2) {
    subgroups[subgroupIndex].studentsNumber = Number(value);
    return;
  }

  const total = totalStudents || subgroups.reduce((sum, sg) => sum + (sg.studentsNumber || 0), 0);
  let newValue = Number(value);

  if (isNaN(newValue) || newValue < 0) newValue = 0;
  if (newValue > total) newValue = total;

  subgroups[subgroupIndex].studentsNumber = newValue;

  const otherIndex = subgroupIndex === 0 ? 1 : 0;
  subgroups[otherIndex].studentsNumber = total - newValue;
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
  setSubgroupStudentsNumber,
} = teachersStateSlice.actions;

export default teachersStateSlice.reducer;
