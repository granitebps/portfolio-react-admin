import { combineReducers } from 'redux';
import customizer from './customizer/';

const rootReducer = combineReducers({
  customizer: customizer,
});

export default rootReducer;
