import {ProductCard} from "../../Products/ProductCard/ProductCard";
import React,{useRef}  from "react";
import { 
    Typography,Button,
     Modal,Box, Grid, 
     TextField,
     InputAdornment,
     MenuItem,Select,FormControl,
     FormControlLabel,
     Checkbox,
     CircularProgress,
     Backdrop,
     Snackbar,
     Alert
    ,InputLabel } from "@mui/material"
import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import {gsap} from "gsap"
import { database } from "../../../firebase/firebase"
import { FirebaseBrand,firebaseAddANewProduct,ProductModel,firebaseUpdateANewProduct } from "../../../firebase/firebase-database"

import "./ProductForm.css"

import "./AdminProducts.css"
import { useNavigate } from "react-router-dom";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";


interface NewProductFormProps extends React.FC<{
    updateProductFormVisibleState:Function | undefined,
    isUpdating:boolean,
    updatingProduct:ProductModel | undefined
}>{
    
};

const defaultBrands:FirebaseBrand[] = []




const defaultProductFormState:ProductModel = {
    inStock:true,
    brand:"None"
}



export const ProductForm:NewProductFormProps = props => {


    const availableBrands:FirebaseBrand[] = useSelector(store => {
        // @ts-ignore
        return store.brands;
    })

    const [productForm,setProductForm] = useState(defaultProductFormState)

    const [formSubmitted,setFormSubmitaion] = useState(false)


    const [userProductFeedback,setUserProductFeedback] = useState('')

    const navigate  = useNavigate()


    // Gsap
    const parent = React.useRef() as React.MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        // @ts-ignore
        gsap.to(parent.current,{width:"80%",height:"100%",opacity:1})
    },[])


    const formDataHandler = (event:any) => {
        let data = productForm;
        let index:string = event.target.name || "";
        const aCheckBox = event.target.type === "checkbox"
        // @ts-ignore
        const secondData:any = {}
        secondData[event.target.name] = aCheckBox ? event.target.checked : event.target.value;
        const modifyData = Object.assign({},data,secondData)
        setProductForm(modifyData)
    }
    
    const addToTheFirebase = () => {

        if(!props.isUpdating){
                    const data = productForm;
                    setUserProductFeedback('')
                    data['createdAt'] = Date()
                    setFormSubmitaion(true)
                    firebaseAddANewProduct(data).then(e => {
                        setUserProductFeedback('0-Product Added')
                    }).catch(e => {
                        setUserProductFeedback('1-Problem Occurred')
                    }).finally(() => {
                        setTimeout(() => {
                            setFormSubmitaion(false);
                            setTimeout(() => {
                                close()
                            },500)
                        },1000)
                    })

                    return;
        }else{
            const data = productForm;
            setUserProductFeedback('')
            setFormSubmitaion(true)
            firebaseUpdateANewProduct(data).then(e => {
                setUserProductFeedback('0-Product Updated')
            }).catch(e => {
                setUserProductFeedback('1-Problem Occurred')
            }).finally(() => {
                setTimeout(() => {
                    setFormSubmitaion(false);
                    setTimeout(() => {
                        navigate("/admin/products")
                    },500)
                },1000)
            })
        }
    }

    const  closeFeedback = () => {
        setUserProductFeedback('')
    }


    // Make updatable if this is in update state
    useEffect(() => {
        if(props.isUpdating && props.updatingProduct){
            console.table(props.updatingProduct)
            setProductForm(props.updatingProduct)
        }
    },[])




    const [productBrand,setProductBrand] = useState('')

    const changeBrandType = (event:any) => {
            setProductBrand(event.target.value);
    }

    const close = () => {
        if(props.isUpdating){
            navigate('/admin/products')
        }else{
            props.updateProductFormVisibleState && props.updateProductFormVisibleState(false)
        }
    }


    const [test,setTest] = useState(false)
    return (
        <div className="product-form-page" ref={parent}>
            <Grid container  alignItems="center" justifyContent="space-evenly">
                <Grid item xs={6} md={7} sm={12} lg={6}>
                    <div className="product-form">
                        
                        <Typography variant="h5">Fill your next product</Typography>

                        <form className="product__form__parent">
                            <div className="form-field">
                                <TextField 
                                onChange={formDataHandler}
                                defaultValue={props.updatingProduct?.productName}
                                variant="standard" 
                                name="productName"
                                label="Product Name" fullWidth/>
                            </div>

                            <div className="form-field">
                                <TextField
                                onChange={formDataHandler}
                                defaultValue={props.updatingProduct?.productQuantity}
                                 variant="standard" 
                                 label="Product Quantity" 
                                 name="productQuantity"
                                 fullWidth
                                 />
                            </div>

                            <div className="form-field">
                                <TextField
                                onChange={formDataHandler}
                                 variant="standard" 
                                 defaultValue={props.updatingProduct?.productPrice}
                                 label="Product Price" 
                                 fullWidth
                                 name="productPrice"
                                 />
                            </div>

                            <div className="form-field">
                            <FormControl variant="standard"  sx={{ m: 1, minWidth: 120 }}  fullWidth >
                                        <InputLabel id="demo-simple-select-standard-label">Brand</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        onChange={formDataHandler}
                                        name="brand"
                                        value={productForm.brand}
                                        disabled={props.isUpdating}
                                        defaultValue={props.updatingProduct?.brand || "None"}
                                        
                                        >

                                            <MenuItem value="None" >None</MenuItem>
                                        
                                        {
                                            availableBrands.map(e => (<MenuItem key={"available__"+e.key} value={e.key}>{e.name}</MenuItem>))
                                        }

                                        </Select>
                                    </FormControl>
                            </div>


                            <div className="form-field">
                                <TextField
                                onChange={formDataHandler}
                                defaultValue={props.updatingProduct?.productImage}
                                 variant="standard" 
                                 name="productImage"
                                 label="Product Image URL" 
                                 fullWidth
                                 />
                            </div>

                            <div className="form-field">
                                 <FormControlLabel 
                                 onChange={formDataHandler}
                                 defaultValue={props.updatingProduct?.inStock ? 'true' : 'false'}
                                 name="inStock"
                                  control={<Checkbox defaultChecked />} label="Is in stock" />
                            </div>
                        </form>


                        <Button variant="contained" color="secondary" className="add__update__button" onClick={addToTheFirebase}>
                            {!props.isUpdating ? "Add this product" : "Update this product"}
                            </Button>
                        <br />
                        <Button  variant="contained" color="error" className="product__create__cancel__button" onClick={close}>Cancel</Button>
                    </div>
                </Grid>


                <Grid item xs={6} md={5} sm={12} lg={5}>
                    
                    <ProductCard productForm={productForm} />

                
                </Grid>

            </Grid>

            

    

       

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme:any) => theme.zIndex.drawer + 1 }}
        open={formSubmitted}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    

    
     <Snackbar open={userProductFeedback.length >= 1} autoHideDuration={6000} onClose={closeFeedback}>
        
                <Alert  severity={userProductFeedback.split("-")[0] === "0" ? "success" :"error"} sx={{ width: '100%' }}>
                    {userProductFeedback.split("-")[1]}
                </Alert>
            
      </Snackbar>

      
    

        </div>
      
    )
}