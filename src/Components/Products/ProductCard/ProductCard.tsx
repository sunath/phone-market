import React, { useEffect, useRef, useState } from "react";
import "./ProductCard.css"
import {
    CardActions,
    CardMedia,
    CardContent,
    Typography,
    Button
} 
from "@mui/material";
import Card from "react-bootstrap/Card"
import {Row,Col} from "react-bootstrap";
import { FirebaseBrand, ProductModel } from "../../../firebase/firebase-database";


import {gsap} from "gsap";
import { useSelector } from "react-redux";
import { ref, remove, update } from "firebase/database";
import { database } from "../../../firebase/firebase";



interface ProductCardInterface extends React.FC<{
    productForm:ProductModel,
}> {}


export const ProductCard:ProductCardInterface = (props) =>  {

    const cardReference = useRef<HTMLDivElement>(null);
    const [timeline,setTimeLine] = useState<gsap.core.Timeline>()

    const userID = useSelector(store => {
        // @ts-ignore
        return store.user?.user?.uid;
    })

    const onProductCardMouseEnter = () => {
        timeline?.play()
    }

    const onProductCardMouseLeave = () => {
        timeline?.reverse()
    }


    const brands:FirebaseBrand[] = useSelector(store => {
        // @ts-ignore
        return store.brands;
    })


const productCartItems = useSelector( (store:any) => {

    if(!store.cart || !store.cart.items)return {items:0}

     if(
         Object.keys(store.cart.items).indexOf(props.productForm.brand || "") >= 0 && 
         Object.keys(store.cart.items[props.productForm?.brand || ""]).indexOf(props.productForm.key || "") >= 0
     ){
        return store.cart.items[props.productForm.brand || ""][props.productForm.key || ""]
     }
     return {
         items:0
     }
})

useEffect(() => {
    if(!timeline){

        const timeline = gsap.timeline({paused:true});
        setTimeLine(timeline);
    }


})

    if (!props.productForm.productImage){
        return <></>
    }

    const productItemInCart = () => {
        return productCartItems && productCartItems.items >= 1;
    }

    const  addToCart = () => {
        const reference = ref(database,`Carts/${userID}/items/${props.productForm.brand}/${props.productForm.key}`);
        if(productCartItems.items >= 1){
            update(reference,{
                items:productCartItems.items+1
            })
        }else{
            update(reference,{
                items:1
            })
        }
       
    }

    const changeCart = (change:number) => {
        return () => {
            const reference = ref(database,`Carts/${userID}/items/${props.productForm.brand}/${props.productForm.key}`);
        
        if(productCartItems.items){

                    const nextItemsCount = productCartItems.items+change;

                    if(nextItemsCount <= 0){
                        console.log(nextItemsCount," was removed" , "and change ",change)
                        remove(reference)
                    }else{
                        
                    update(reference,{
                        items:nextItemsCount
                    })

                    console.log("Updated")

        }
        }

        }
    }



    return (
            <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={props.productForm.productImage} />
                    <Card.Body>
                        <Card.Title><h4 className="text-center">{props.productForm.productName}</h4></Card.Title>
                        <Card.Text>
                            <h6 className="text-center">Price : ${props.productForm.productPrice}</h6>
                            <h6 className="text-center">Brand : {
                              brands.filter(e => e.key ===  props.productForm.brand)[0]?.name || "Not found"
                            }
                            </h6>
                            <h6 className="text-center">Quantity: {props.productForm.productQuantity}</h6>
                            <h6 className="text-center">{props.productForm.inStock ? 'InStock' : 'Out of Stock'}</h6>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        

                        {
                            productItemInCart() ?

                            <div className="d-flex flex-row justify-content-between add__to__cart__options" >
                            <Button variant="contained" color="error" onClick={changeCart(-1)}>-</Button>
                            <span>{productCartItems.items}</span>
                            <Button variant="contained" color="success" onClick={changeCart(1)}>+
                            </Button>
                        </div> 

                        :
                                <Button variant="contained" className="add__to__card__button" onClick={addToCart}>Add to cart</Button>

                        }
                        
                            
                   
                    </Card.Footer>
            </Card>
            
    )
}