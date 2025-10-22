import { configureStore } from '@reduxjs/toolkit';
import subjectReducer from "./slices/subjectSlice"

export const store= configureStore({
    reducer:{
        subjects: subjectReducer,
    }
})