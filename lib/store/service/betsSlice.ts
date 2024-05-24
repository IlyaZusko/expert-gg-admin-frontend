import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IBet } from '../models/Bet';

export interface IProductsState {
  listBets: IBet[];
  totalCoinsWon: number;
  totalCoinsLost: number;
}

const initialState: IProductsState = {
  listBets: [] as IBet[],
  totalCoinsWon: 0,
  totalCoinsLost: 0,
};

export const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    setListBets: (state, action: PayloadAction<IBet>) => {
      if (!state.listBets.find((product) => product.id === action.payload.id)) {
        state.listBets = [...state.listBets, action.payload];
      }
    },
    setTotalCoinsWon: (state, action: PayloadAction<number>) => {
      state.totalCoinsWon = action.payload;
    },
    setTotalCoinsLost: (state, action: PayloadAction<number>) => {
      state.totalCoinsLost = action.payload;
    },
    clearListBets: (state) => {
      state.listBets = [] as IBet[];
    },
  },
});

export const {
  setListBets,
  clearListBets,
  setTotalCoinsWon,
  setTotalCoinsLost,
} = betsSlice.actions;
