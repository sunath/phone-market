

import {userReducer} from "./UserReducer"

import {combineReducers, createStore} from "redux";


const lastReducer = combineReducers({
    user:userReducer
})

// @ts-ignore
export const Store = createStore(lastReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


