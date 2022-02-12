import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer, preloadedState } from '../reducer/idnex'

const createStore = () => {
    const middlewareList = [...getDefaultMiddleware()]

    return configureStore({
        reducer: rootReducer,
        middleware: middlewareList,
        // devTools: process.env.NODE_ENV !== 'production',
        preloadedState: preloadedState(),
    })
}

export default createStore