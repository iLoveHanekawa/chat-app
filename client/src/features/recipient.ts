import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: 'bot'
}

const recipientSlice = createSlice({
    name: 'recipient',
    initialState,
    reducers: {
        setRecipientId: (state, action: { type: string, payload: string }) => {
            state.id = action.payload
        }
    }
})

export const { reducer: recipientReducers, actions: recipientActions } = recipientSlice