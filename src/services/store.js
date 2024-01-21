import { configureStore } from "@reduxjs/toolkit";
import { contactsApi } from "./contactApi";
const store = configureStore({
    reducer:{
        [contactsApi.reducerPath]:contactsApi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(contactsApi.middleware)
})
export default store
