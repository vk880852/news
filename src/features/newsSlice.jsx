import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stores: [],
    category:[],
};

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        addTodo: (state,action) => {
            state.stores=[];
            state.stores.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.category=[];
            state.category.push(action.payload);
        },
    },
});

export const { addTodo, deleteTodo } = newsSlice.actions;
export default newsSlice.reducer;
