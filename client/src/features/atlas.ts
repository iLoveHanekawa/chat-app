import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    result: '',
    loading: false,
    error: ''
}

export const fetchData = createAsyncThunk('fetch', async (thunkObj: { url: string, body: {data: { msg: string }} } ) => {
    const { url, body } = thunkObj
    const res = await axios.post(url, body)
    const data = await res.data
    return data.result
})

const atlasSlice = createSlice({
    name: 'atlas',
    initialState,
    reducers: {
        reset: (state, action) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.result = action.payload
            state.loading = false
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.error = action.error.message as string
            state.loading = false
        })
    }
})

export const { reducer: atlasReducers, actions: atlasActions} = atlasSlice