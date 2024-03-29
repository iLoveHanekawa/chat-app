import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    result: '',
    loading: false,
    error: ''
}

export const fetchData = createAsyncThunk('fetch', async (thunkObj: { url: string, body: {data: { msg: string }} } ) => {
    try {
        const { url, body } = thunkObj
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data.result
    }
    catch(error) {
        if(error instanceof Error) return error.message;
        else return 'Something went wrong.';
    }
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