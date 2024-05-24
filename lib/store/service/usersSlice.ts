import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUser } from '../models/User';

export interface IProductsState {
  listUsers: IUser[];
}

const initialState: IProductsState = {
  listUsers: [] as IUser[],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setListUsers: (state, action: PayloadAction<IUser>) => {
      if (
        !state.listUsers.find(
          (product) => product.user_id === action.payload.user_id,
        )
      ) {
        state.listUsers = [...state.listUsers, action.payload];
      }
    },
    blockUser: (state, action: PayloadAction<string>) => {
      const updatedRequests = state.listUsers.map((user) => {
        if (user.user_id === action.payload) {
          return { ...user, status: 'blocked' };
        } else {
          return user;
        }
      });
      state.listUsers = updatedRequests;
    },
    enableUser: (state, action: PayloadAction<string>) => {
      const updatedRequests = state.listUsers.map((user) => {
        if (user.user_id === action.payload) {
          return { ...user, status: 'active' };
        } else {
          return user;
        }
      });
      state.listUsers = updatedRequests;
    },
    clearListUsers: (state) => {
      state.listUsers = [] as IUser[];
    },
  },
});

export const { setListUsers, clearListUsers, blockUser, enableUser } =
  usersSlice.actions;
