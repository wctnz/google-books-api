import { configureStore } from "@reduxjs/toolkit";
import { googleBooksApi } from "./googleBooks/googleBooks.api";

export const store = configureStore({
    reducer: {
        [googleBooksApi.reducerPath]: googleBooksApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(googleBooksApi.middleware)
})

export type AppStore = ReturnType<typeof configureStore>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore["dispatch"]