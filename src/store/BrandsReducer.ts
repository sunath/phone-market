import { FirebaseBrand } from "../firebase/firebase-database"
import { SET_BRANDS } from "./BrandsActions";

export interface BrandAction {
    type:string,
    payload:any
}



export const brandsReducer = (state:FirebaseBrand[] = [],action:BrandAction) => {
    switch(action.type){
        case SET_BRANDS.key:
            return SET_BRANDS.action(state,action.payload)
        default:
            return state;
    }
}