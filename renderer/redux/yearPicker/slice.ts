import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { getCurrentYear } from '../../utils/dateHelpers'
import { setCookie, getCookie } from '../../utils/cookie' 

// Define a type for the slice state
interface iState {
  value: number
}

const initYear = getCookie('year-picker') 

// Define the initial state using that type
const initialState: iState = {
  value: initYear ? Number(initYear) : getCurrentYear,
}

export const Slice = createSlice({
  name: 'yearPicker',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    set: (state, action: PayloadAction<number>) => {
      setCookie('year-picker', `${action.payload}`)
      state.value = action.payload
    },
  },
})


export const { increment, decrement, set } = Slice.actions
export const  { reducer } = Slice
export default reducer