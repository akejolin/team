import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper';
import type {store} from '../store'

// Define a type for the slice state
interface iState {
  yearlyHealthAllowance: number,
}

//const initYear = getCookie('year-picker') 

// Define the initial state using that type
const initialState: iState = {
  //value: initYear ? Number(initYear) : getCurrentYear,
  yearlyHealthAllowance: 5000,

}

export const Slice = createSlice({
  name: 'system',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    yearlyHealthAllowance: (state, action: PayloadAction<number>) => {
      state.yearlyHealthAllowance = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<any>) => {
      return Object.assign({}, state, {...action.payload.system})
    },
  }
})


export const { set, testing } = Slice.actions
export const  { reducer } = Slice
export default reducer