import React, { useState } from "react";
import { useSelector } from "react-redux";
import { JsxElement } from "typescript";
import { useNavigate,Route, Navigate } from "react-router-dom"



export const AuthUserGuard = (props:any) => {

   if(props.user){
       return props.element
   }
   return <Navigate to="/"/>
    
}