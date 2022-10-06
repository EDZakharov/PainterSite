import { createSlice, configureStore } from '@reduxjs/toolkit'
import {imagesApi} from "./redux-query";

const adminPanel = createSlice({
    name: 'adminPanel',
    initialState: {
        data:[]
    },
    reducers: {
        setCurrentPath: (state, action) => {
            localStorage.setItem('currentEditImagePath', JSON.stringify(action.payload))
        }
    }
})

export const {setCurrentPath} = adminPanel.actions

export const store = configureStore({
    reducer: {
        [imagesApi.reducerPath]: imagesApi.reducer,
        adminPanel: adminPanel.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imagesApi.middleware)
})

// store.subscribe(() => console.log(store.getState()))