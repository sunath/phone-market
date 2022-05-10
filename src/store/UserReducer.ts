import {User} from "firebase/auth";


export interface AppUser {
    isAdmin:boolean
    user:User
}

const defaultState: null | AppUser = null;

interface UserReducerAction {
    type:string
    payload:AppUser | undefined | null
}


export const UserActions = { 
    SET_AUTH_USER:"SET_AUTH_USER"
}




export const userReducer = (state:any=defaultState,action:UserReducerAction) => {
        switch(action.type){
            case UserActions.SET_AUTH_USER:
                return {isAdmin:action.payload?.isAdmin,user:action.payload?.user};
            default:
                return state;
        }
}