import {legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
// import { composeWithDevTools } from 'redux-devtools-extension';
import register from "./reducers/reducers";

// const devTools =
//    composeWithDevTools(applyMiddleware(...[thunk]));
export const store = configureStore({
    reducer: register,
    // devTools:devTools
  })


// const appReducer = combineReducers({
//     register
// })

// const reducer = (state,action)=>{
//     appReducer(state,action)
// }
const initialState = {};

// export const store = createStore(reducer,initialState, devTools)

