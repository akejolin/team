import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { getCurrentYear } from '../../utils/dateHelpers'
import { setCookie, getCookie } from '../../utils/cookie'
import type { T_dataKey } from '../../dataTypes/costs'

// Define a type for the slice state
export interface Ilog {
  action: string,
  description: string,
}

interface iState {
  value: Ilog[],
}

//const initYear = getCookie('year-picker') 

// Define the initial state using that type
const initialState: iState = {
  //value: initYear ? Number(initYear) : getCurrentYear,
  value: [{
    action: 'Start up',
    description: 'Welcome!'
  }],
}

export const Slice = createSlice({
  name: 'actionLog',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    add: (state, action: PayloadAction<Ilog>) => {
      state.value.filter(item => item !== action.payload)
      state.value.push(action.payload)
    },
    remove: (state, action: PayloadAction<Ilog>) => {
      state.value.splice(state.value.findIndex((item) => item === action.payload), 1);
    },
  },
})


export const { add, remove } = Slice.actions
export const  { reducer } = Slice
export default reducer