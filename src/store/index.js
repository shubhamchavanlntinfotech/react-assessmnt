import { configureStore } from '@reduxjs/toolkit';

import eventSlice from './eventSlice';
import registerSlice from './registerSlice';

export const store = configureStore({
    reducer: {
        event: eventSlice,
        user: registerSlice
    },
})