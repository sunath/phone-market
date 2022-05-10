import React, { Fragment, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import { auth } from './firebase/firebase';
import { Store } from './store/Store';
import { useDispatch, useSelector } from 'react-redux';

import {setAuthUser } from "./store/UserActions"
import { json } from 'stream/consumers';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import {getCurrentUserIsAnAdmin} from "./firebase/firebase-auth"

import "./App.css"
import { User } from 'firebase/auth';

import { ProductsPage } from './Components/Products/Products';
import {ShoppingCartPage} from "./Components/ShoppingCart/ShoppingCart"
import { AuthUserGuard } from './Route/AuthUserGuard';
import { AdminAuthGuard } from './Route/AdminAuthGuard';
import { AdminMobileBrands } from './Components/Admin/Brands/Brands';


function App() {

  const currentUser = useSelector( (store:any) => store.user?.user)
  const isAdmin = useSelector((store:any) => store.user?.isAdmin)


  const dispatch = useDispatch()

  const updateUserIsAnAdmin = (value:boolean,user:User | null) => {
    dispatch(setAuthUser({isAdmin:value,user:user}))
  }

  useEffect(() => {
    auth.onAuthStateChanged(e => {
      dispatch(setAuthUser({isAdmin:false,user:e}))
      getCurrentUserIsAnAdmin(e,updateUserIsAnAdmin)
    })
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
                    path="admin/products"
                    element={
                        <AdminAuthGuard 
                        element={<h1>This is only admin</h1>} 
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

                    <Route path="/products" element={<ProductsPage className="page-content" />}></Route>
                    <Route path="/" element={<h1 className='page-content'>Hello</h1>}></Route>
              
              </Routes>

            </Fragment>
           
          </Router>
          



    </div>
  );
}

export default App;
