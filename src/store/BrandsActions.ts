import { FirebaseBrand } from "../firebase/firebase-database"

export const SET_BRANDS_KEY = "SET_BRANDS"

export const SET_BRANDS = {
    key:SET_BRANDS_KEY,
    action: (state:FirebaseBrand[],payload:FirebaseBrand[]) => {
        return payload
    },
    run:(payload:FirebaseBrand[]) => {
        return {
            type:SET_BRANDS_KEY,
            payload:payload
        }
    }
}