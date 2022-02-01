import {
  Action,
  configureStore,
  combineReducers,
  ThunkAction,
} from '@reduxjs/toolkit';
import { useSelector as _useSelector } from "react-redux";

import {reducer as yearPicker} from './yearPicker/slice';
import {reducer as empPicker} from './empPicker/slice';
import {reducer as calcPickerSettings} from './calcPickerSettings/slice';
import {reducer as system} from './system/slice';
import {reducer as dataKeys} from './dataKeys/slice';
import {reducer as constants} from './constants/slice';
import {reducer as noteFilterPicker} from './noteFilterPicker/slice';
import {reducer as devMode} from './devMode/slice';
import {reducer as actionLog} from './actionLog/slice';
import { createWrapper } from 'next-redux-wrapper';


const reducer = combineReducers({
  yearPicker,
  noteFilterPicker,
  empPicker,
  calcPickerSettings,
  system,
  dataKeys,
  constants,
  devMode,
  actionLog,
// This is where we add reducers.
// Since we don't have any yet, leave this empty
})

export const store = configureStore({ reducer })

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;

 export const makeStore = () => configureStore({ reducer })
 export const wrapper = createWrapper(makeStore, { debug: true });

 export const useSelector = (pick) => useSelector((state:RootState) => state[pick]); 