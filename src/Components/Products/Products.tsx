import { refType } from "@mui/utils";
import { limitToFirst, onValue, query, ref } from "firebase/database";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../firebase/firebase";
import { ProductModel } from "../../firebase/firebase-database";
import { addProductToList } from "../../store/UserProductsActions";
import { ProductCard } from "./ProductCard/ProductCard";

import "./Products.css"

interface ProductsProps extends React.FC<{className:string}> {}





export const ProductsPage:ProductsProps = props => {

  const dispatch = useDispatch()

  const products:ProductModel[] = useSelector(store => {
    // @ts-ignore
    return store.userProducts.currentProducts;
  })

   

    return (
    <div className={props.className + " products__show"}>

      <Row xs={1} md={2} lg={3}>
        
        {products && 
          products.map((e,i)=> {
            return (
            <Col 
            lg={4}
            md={6}
            xs={12}
            className="product__column"
            key={`product___index__number__by__${i}`}>
              
              <ProductCard 
              productForm={e}
              />
                
            </Col>
            )
          })
        }
       



      </Row>

      
    </div>
    
    )


}
