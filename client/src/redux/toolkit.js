import { createSlice, configureStore } from '@reduxjs/toolkit'
import {imagesApi} from "./redux-query";

const imagesSlice = createSlice({
    name: 'images',
    initialState: {
        data:[]
    },
    reducers: {

    }
})

export const {_} = imagesSlice.actions

export const store = configureStore({
    reducer: {
        [imagesApi.reducerPath]: imagesApi.reducer,
        images: imagesSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imagesApi.middleware)
})

// store.subscribe(() => console.log(store.getState()))