

import {userReducer} from "./UserReducer"
import { brandsReducer } from "./BrandsReducer";

import {combineReducers, createStore} from "redux";
import { userProductsReducer } from "./UserProductsReducer";
import { cartReducer } from "./CartReducer";

export interface Action {
    type:string
    payload:any
}

const lastReducer = combineReducers({
    user:userReducer,
    brands:brandsReducer,
    userProducts:userProductsReducer,
    cart:cartReducer
})

// @ts-ignore
export const Store = createStore(lastReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


