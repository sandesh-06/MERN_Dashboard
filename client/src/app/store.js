import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";

import { setupListeners } from '@reduxjs/toolkit/query';
import {api} from 'state/api'

export const store = configureStore({
    reducer:{
        global: globalReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefault)=>getDefault().concat(api.middleware)
})
setupListeners(store.dispatch)