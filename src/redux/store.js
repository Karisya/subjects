import { configureStore } from '@reduxjs/toolkit';
import subjectReducer from "./slices/subjectSlice"
import teachersReducer from './slices/teachersSlice'

export const store= configureStore({
    reducer:{
        subjects: subjectReducer,
        teachers: teachersReducer,
    }
})