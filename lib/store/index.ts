import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { betsSlice, callRequestsSlice, usersSlice } from './service';

const rootReducer = combineReducers({
  [usersSlice.reducerPath]: usersSlice.reducer,
  [betsSlice.reducerPath]: betsSlice.reducer,
  [callRequestsSlice.reducerPath]: callRequestsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
