import { Navigate } from "react-router-dom";

export const AdminAuthGuard = (props:any) => {
    if(props.isAdmin){
        return props.element;
    }
    return <Navigate to="/"></Navigate>
}