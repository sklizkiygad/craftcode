import { configureStore, combineReducers} from '@reduxjs/toolkit'
import {codeSlice} from "./slices/codeSlice";


const reducer = combineReducers(
    {code:codeSlice.reducer}
    )

export const store = configureStore({
    reducer: reducer,
})