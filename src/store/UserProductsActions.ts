import { ProductModel } from "../firebase/firebase-database";
import { UserProducts } from "./UserProductsReducer";

const SET_USER_PRODUCTS_KEY = "SET_USER_PRODUCTS"
const APPEND_PRODUCT_TO_LIST = "ADD_PRODUCT_TO_THE_LIST"

export const setUserProducts = {
    key:SET_USER_PRODUCTS_KEY,

    action: (state:UserProducts,payload:ProductModel[]) => {
        return Object.assign({},state,{currentProducts:payload})
    },
    run: (payload:ProductModel) => {
        return {
            type:SET_USER_PRODUCTS_KEY,
            payload
        }
    }
}

export const addProductToList = {
    key:APPEND_PRODUCT_TO_LIST,

    action: (state:UserProducts,payload:ProductModel) => {
        return Object.assign({},state,{currentProducts:[...state.currentProducts,payload]})
    },

    run:(payload:any) => {
        return {
            type:APPEND_PRODUCT_TO_LIST,
            payload
        }
    }
}