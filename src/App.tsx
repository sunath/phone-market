import React, { Fragment, useEffect } from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import { auth, database } from './firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';

import {setAuthUser } from "./store/UserActions"

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import {getCurrentUserIsAnAdmin} from "./firebase/firebase-auth"

import "./App.css"
import { User } from 'firebase/auth';

import { ProductsPage } from './Components/Products/Products';
import { AdminProductsPage } from './Components/Admin/Products/AdminProducts';
import {ShoppingCartPage} from "./Components/ShoppingCart/ShoppingCart"
import { AuthUserGuard } from './Route/AuthUserGuard';
import { AdminAuthGuard } from './Route/AdminAuthGuard';
import { AdminMobileBrands } from './Components/Admin/Brands/Brands';
import { ProductUpdateComponent } from './Components/Admin/Products/ProductUpdate/ProductUpdate';


import 'bootstrap/dist/css/bootstrap.min.css';
import { onValue, ref, set } from 'firebase/database';
import { SET_BRANDS } from './store/BrandsActions';
import { setReduxCart } from './store/CartActions';
import { addProductToList } from './store/UserProductsActions';
import { CheckoutPage } from './Components/Checkout/CheckoutPage';
import { RESET_USER_PRODUCTS } from './store/UserProductsReducer';
import { Home } from './Components/Home/Home';


function App() {

  const currentUser = useSelector( (store:any) => store.user?.user)
  const isAdmin = useSelector((store:any) => store.user?.isAdmin)



  const updateUserIsAnAdmin = (value:boolean,user:User | null) => {
    dispatch(setAuthUser({isAdmin:value,user:user}))
  }

  useEffect(() => {
    auth.onAuthStateChanged(e => {
      dispatch(setAuthUser({isAdmin:false,user:e}))
      if(e) {
        onValue(ref(database,`Carts/${e?.uid}`),(snapshot) => {
          if(!snapshot.exists()){
            set(ref(database,"Carts/"+e.uid),{
              createdAt:Date(),
              products:[]
            })
          }else{
            dispatch(setReduxCart.run(snapshot.val()))
          }
        })
      }
      getCurrentUserIsAnAdmin(e,updateUserIsAnAdmin)
    })
  },[])

  const dispatch = useDispatch()

  useEffect(() => {
   const dispose = onValue(ref(database,"Brands/"),(snapshot) => {
        const data = snapshot.val()
        const brands = Object.keys(data).map(e => {
          return {key:e,name:data[e].name}
        })

        dispatch(SET_BRANDS.run(brands))


    })

    return () => {
      dispose()
    }
  },[])


   useEffect(() => {
      const products = ref(database,"Products")
      const productsReference = onValue(products,(snapshot) => {
        dispatch({type:RESET_USER_PRODUCTS})
        const productsFull = snapshot.val()
        const products = Object.keys(productsFull).map(e => {
            Object.keys(productsFull[e]).map(x => {
              console.log(productsFull[e][x])
              dispatch(addProductToList.run({...productsFull[e][x],key:x}))
            })
        })

      })


      return () => {
        productsReference()
      }

    },[])

  return (
    <div className="App">       
          <Router>
            <Fragment>
            <Navbar/>
            <div className='space__divide'></div>

                <Routes >
                    
                    
                    <Route 
                    path="shopping-cart" 
                    element={
                    <AuthUserGuard 
                    user={currentUser} 
                    element={<ShoppingCartPage className='page-content'/>} />}
                    />


                     <Route 
                    path="products" 
                    element={
                    <AuthUserGuard 
                    user={currentUser} 
                    element={<ProductsPage className="page-content" />} />}
                    />


                  <Route 
                    path="check-out" 
                    element={
                    <AuthUserGuard 
                    user={currentUser} 
                    element={<CheckoutPage/>} />}
                    />


                    <Route
                    path="admin/products/update/:brand/:key"
                    element={
                      <AdminAuthGuard 
                        element={<ProductUpdateComponent  /> }
                        isAdmin={isAdmin}
                      />
                    }
                    />

                    <Route 
                    path="admin/products"
                    element={
                        <AdminAuthGuard 
                        element={<AdminProductsPage />} 
                        isAdmin={isAdmin}
                        />
                      }
                    />

                   

                  <Route 
                    path="admin/brands"
                    element={
                        <AdminAuthGuard 
                        element={<AdminMobileBrands />} 
                        isAdmin={isAdmin}
                        />
                      }
                    />
                    <Route path="/" element={<Home />}></Route>
              
              </Routes>

            </Fragment>
           
          </Router>
          



    </div>
  );
}

export default App;
