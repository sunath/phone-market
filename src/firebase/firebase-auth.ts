

import {auth, database} from "./firebase";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import {get,ref,onValue, DataSnapshot} from "firebase/database"


export const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth,googleProvider)
}


export const signOut = () => {
    return auth.signOut()
}

const generateUserPath = (uid:string) => {
    return `Admins/${uid}/`
}

export const getCurrentUserIsAnAdmin= (user:User |null,update:any) => {
    if(!user) {update(false,null)}
    else{
        const userId = user.uid;
    onValue(ref(database,generateUserPath(userId)),(snapshot:DataSnapshot) => {
            const data = snapshot.val()
            if(data){
                update(true,auth.currentUser)
            }else{
                update(false,auth.currentUser)
            }
    })
    
    }
}