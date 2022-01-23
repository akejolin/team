import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//import type { RootState } from '../store'
//import { getCurrentYear } from '../../utils/dateHelpers'
import { setCookie, getCookie } from '../../utils/cookie'

// Define a type for the slice state
interface iState {
  value: string,
}

const initValue = getCookie('emp-picker') 

// Define the initial state using that type
const initialState: iState = {
  value: initValue ? initValue : 'emp0',
}

export const Slice = createSlice({
  name: 'empPicker',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      setCookie('emp-picker', `${action.payload}`)
      state.value = action.payload
    },
  },
})


export const { set } = Slice.actions
export const  { reducer } = Slice
export default reducer