import { configureStore } from '@reduxjs/toolkit';
import subjectReducer from "./slices/subjectSlice"
import teachersReducer from './slices/teachersSlice'
import teachersStateReducer from './slices/teachersStateSlice'

export const store= configureStore({
    reducer:{
        subjects: subjectReducer,
        teachers: teachersReducer,
        teachersState: teachersStateReducer,
    }
})