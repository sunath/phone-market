import { setReduxCart } from "./CartActions";
import { Action } from "./Store";



export const cartReducer = (state:any={},action:Action) => {
    switch(action.type){
        case setReduxCart.key:
            return setReduxCart.action(state,action.payload)
        default:
            return state;
    }
}