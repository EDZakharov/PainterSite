import {configureStore} from "@reduxjs/toolkit";
import {api} from "./api";
import adminPanel from "./toolkit";

export const store = configureStore({
    reducer: {
        adminPanel: adminPanel.reducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(api.middleware),
})