import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//import { getCurrentYear } from '../../utils/dateHelpers'
//import { setCookie, getCookie } from '../../utils/cookie'

// Define a type for the slice state
interface iState {
  value: string[],
}

// Define the initial state using that type
const initialState: iState = {
  //value: initYear ? Number(initYear) : getCurrentYear,
  value: [],
}

export const Slice = createSlice({
  name: 'noteFilterPicker',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    add: (state, action: PayloadAction<string>) => {
      //state.value.filter(item => item !== action.payload)
      !state.value.includes(action.payload) ? state.value.push(action.payload) : state.value
    },
    remove: (state, action: PayloadAction<string>) => {
      state.value.splice(state.value.findIndex((item) => item === action.payload), 1);
    },
    reset: (state) => {
      state.value = []
    },
    set: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload
    },
  },
})


export const { add, remove, reset } = Slice.actions
export const  { reducer } = Slice
export default reducer