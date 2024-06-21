import {configureStore} from '@reduxjs/toolkit'
import newsReducer from '../features/newsSlice.jsx'
export const store=configureStore({
    reducer:{
        news:newsReducer,
    }
})