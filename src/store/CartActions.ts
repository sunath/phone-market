const SET_CART_DATA = "SET_CART_DATA"

export const setReduxCart = {
    key:SET_CART_DATA,
    action:(state:any,payload:any) => {
        return payload;
    },
    run:(payload:any) => {
        return {
            type:SET_CART_DATA,
            payload
        }
    }
}