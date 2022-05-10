

import { UserActions } from "./UserReducer"

export function setAuthUser (payload:any) {
    return {
        type:UserActions.SET_AUTH_USER,
        payload
    }
}