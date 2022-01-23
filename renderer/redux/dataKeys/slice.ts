import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//import type { RootState } from '../store'
//import { getCurrentYear } from '../../utils/dateHelpers'
//import { setCookie, getCookie } from '../../utils/cookie'

// Define a type for the slice state
interface IdataKeyObj {
  [key: string]: string
}

interface iState {
  value: IdataKeyObj,
}

// Define the initial state using that type
const initialState: iState = {
  value: global.dataKeys,
}

export const Slice = createSlice({
  name: 'dataKeys',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IdataKeyObj>) => {
      state.value = action.payload
    },
  },
})


export const { set } = Slice.actions
export const  { reducer } = Slice
export default reducer