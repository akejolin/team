import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { getCurrentYear } from '../../utils/dateHelpers'
import { setCookie, getCookie } from '../../utils/cookie'
import type { T_dataKey } from '../../dataTypes/costs'

// Define a type for the slice state
interface iState {
  value: boolean,
}

const initDevMode = getCookie('devMode') 

// Define the initial state using that type
const initialState: iState = {
  value: initDevMode ? Number(initDevMode) === 1 ? true : false : false,
}

export const Slice = createSlice({
  name: 'devMode',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    set: (state, action: PayloadAction<boolean>) => {
      setCookie('devMode', `${action.payload ? 1 : 0}`)
      state.value = action.payload
    },
  },
})


export const { set } = Slice.actions
export const  { reducer } = Slice
export default reducer