import React,{useRef}  from "react";
import { 
    Typography,Button,
     Modal,Box, Grid, 
     TextField,
     InputAdornment,
     MenuItem,Select,FormControl,
     FormControlLabel,
     Checkbox,
     Card,
     CardActions,
     CardMedia,
     CardContent,
     CircularProgress,
     Backdrop,
     Snackbar,
     Alert
    ,InputLabel } from "@mui/material"
import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import {gsap} from "gsap"
import { database } from "../../../firebase/firebase"
import { FirebaseBrand,firebaseAddANewProduct,ProductModel } from "../../../firebase/firebase-database"

import "./AdminProducts.css"

import {ProductForm} from "./ProductForm"
import { useNavigate } from "react-router-dom";
import {ProductTable} from "./ProductTable/ProductTable";


export const AdminProductsPage = () => {

    const [newProductCreating,setNewProductCreating] = useState(false)

    const updateNewProductCreating = (state:boolean) => {
        setNewProductCreating(state);
    }

    const openProductForm = () => {
        setNewProductCreating(true)
    }



    return (
        <div>
             <div className="intro">
                <Typography  variant="h5">Admin Products Management</Typography>
             </div>

             <div className="subhead">
                 <Typography variant="h6">Products</Typography>
                 <Button variant="contained" onClick={openProductForm} className="product-add-button">Add New Product</Button>
             </div>

             {
                 newProductCreating && <ProductForm updateProductFormVisibleState={updateNewProductCreating} isUpdating={false} updatingProduct={undefined}></ProductForm>
             }


             <div  className="product__table">
                 <Typography variant="h5" className="product__table__header">Available Products</Typography>
             <ProductTable></ProductTable>
             </div>
             


        </div>
    )
}






