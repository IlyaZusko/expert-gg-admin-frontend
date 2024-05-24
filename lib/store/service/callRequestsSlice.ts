import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ICallRequest } from '../models/CallRequest';

export interface ICallRequestsState {
  listCallRequests: ICallRequest[];
}

const initialState: ICallRequestsState = {
  listCallRequests: [] as ICallRequest[],
};

export const callRequestsSlice = createSlice({
  name: 'callRequests',
  initialState,
  reducers: {
    setListCallRequests: (state, action: PayloadAction<ICallRequest>) => {
      if (
        !state.listCallRequests.find(
          (product) => product.id === action.payload.id,
        )
      ) {
        state.listCallRequests = [...state.listCallRequests, action.payload];
      }
    },
    markAsDoneCallRequest: (state, action: PayloadAction<string>) => {
      const updatedRequests = state.listCallRequests.map((request) => {
        if (request.id === action.payload) {
          return { ...request, isDone: true };
        } else {
          return request;
        }
      });
      state.listCallRequests = updatedRequests;
    },
    clearListCallRequests: (state) => {
      state.listCallRequests = [] as ICallRequest[];
    },
  },
});

export const {
  setListCallRequests,
  clearListCallRequests,
  markAsDoneCallRequest,
} = callRequestsSlice.actions;
