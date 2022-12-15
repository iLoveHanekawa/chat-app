import { configureStore } from "@reduxjs/toolkit"
import { indexReducers } from "../features/active"
import { recipientReducers } from "../features/recipient"
import { atlasReducers } from "../features/atlas"

export const store = configureStore({
    reducer: {
        activeElement: indexReducers,
        recipient: recipientReducers,
        atlas: atlasReducers
    }
})

export type StateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 