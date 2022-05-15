
import React from "react";
import "./ShoppingCart.css"
import { useSelector } from "react-redux";
import { ProductModel } from "../../firebase/firebase-database";
import { ShoppingCartTable } from "./ShoppingCartTable";
import {Button} from "@mui/material";
import {useNavigate}from "react-router-dom"

interface ShoppingCartProps extends React.FC<{className:string}> {}

export interface CartProductData {
    product:ProductModel,
    cartData:any
}



export const ShoppingCartPage:ShoppingCartProps = props => {


    const navigate = useNavigate()

    const products = useSelector((store:any) => {
        if(!store.cart.items)return [];
        const productList:CartProductData[] = []
        Object.keys(store.cart.items).forEach(e => {
            
        Object.keys(store.cart.items[e]).forEach(x => {
                productList.push( {
                    product: store.userProducts.currentProducts.filter((y:ProductModel) => y.key === x)[0],
                    cartData: store.cart.items[e][x]
                }
                )
            })
        })

        return productList

    })
    return (
        <div className={props.className}>

        <h2 className="text-left  text-primary" style={{marginLeft:"1em",marginBottom:"1em"}}>Check your Shopping Cart</h2>

        <ShoppingCartTable cartDetails={products}/>

        <div className="navigations">
            <Button variant="contained" color="secondary"
            onClick={() => {
                navigate("/products")
            }}
            >Back to shopping</Button>
            <Button variant="contained"
              onClick={() => {
                navigate("/check-out")
            }}
            >Go to checkout</Button>
        </div>

        </div>
    )
}