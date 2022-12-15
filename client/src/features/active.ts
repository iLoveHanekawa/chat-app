import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    index: 0
}

const indexSlice = createSlice({
    name: 'index',
    initialState,
    reducers: {
        setindex: (state, action: { payload: number, type: string }) => {
            state.index = action.payload
        }
    }
})

export const { reducer: indexReducers, actions: indexActions } = indexSlice