// Import Library
import storeReducer from './ReducerDataDummy';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
        store: storeReducer,
    },
});