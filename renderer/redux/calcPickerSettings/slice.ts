import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { T_dataKey } from '../../dataTypes/costs'

interface iState {
  value: string[],
  latest: string[],
}

const initialState: iState = {
  value: [],
  latest: []
}

export const Slice = createSlice({
  name: 'calcPickerSettings',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<T_dataKey>) => {
      //state.value.filter(item => item !== action.payload)
      //state.value.push(action.payload)
      state.latest = state.latest.find(f=>f === action.payload) ? [] : [action.payload]
    },
    remove: (state, action: PayloadAction<T_dataKey>) => {
      //state.value.splice(state.value.findIndex((item) => item === action.payload), 1);
      state.latest = []
    },
  },
})


export const { add, remove } = Slice.actions
export const  { reducer } = Slice
export default reducer