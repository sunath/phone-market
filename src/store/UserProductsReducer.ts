import { Action } from "./Store";


import { ProductModel } from "../firebase/firebase-database"
import { addProductToList, setUserProducts } from "./UserProductsActions";

export const RESET_USER_PRODUCTS = "RESET_USER_PRODUCTS"

export interface UserProducts {
    currentProducts:ProductModel[],
    productsForm:number
    productsTo:number
    lastSearchedProducts?:ProductModel[]
}

const initialState:UserProducts = {
    currentProducts: [],
    productsForm: 0,
    productsTo: 50
}





export const userProductsReducer = (state=initialState,action:Action) => {
        switch(action.type){
            case setUserProducts.key:
                return setUserProducts.action(state,action.payload)
            case RESET_USER_PRODUCTS:
                return initialState
            case addProductToList.key:
                return addProductToList.action(state,action.payload)
            default:
                return state
        }
}