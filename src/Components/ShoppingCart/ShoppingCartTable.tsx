import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CartProductData } from './ShoppingCart';
import { useSelector } from 'react-redux';

import {Button} from "@mui/material"
import { ref, remove,update,set } from 'firebase/database';
import { ProductModel } from '../../firebase/firebase-database';
import {database} from "../../firebase/firebase";
interface ShoppingCartTableProps extends React.FC<{
    cartDetails:CartProductData[]
}> {}


export const ShoppingCartTable:ShoppingCartTableProps = (props) => {


    const brands = useSelector((store:any) => {
        return store.brands;
    })

    const userID = useSelector((store:any) => {
        return store.user?.user.uid;
    });



    const changeCart = (productForm:ProductModel,productCartItems:any,change:number) => {
        return () => {
            const reference = ref(database,`Carts/${userID}/items/${productForm.brand}/${productForm.key}`);
        
        if(productCartItems.items){

                    const nextItemsCount = productCartItems.items+change;

                    if(nextItemsCount <= 0){
                        remove(reference)
                    }else{
                        
                    update(reference,{
                        items:nextItemsCount
                    })
        }
        }

        }
    }


    const getTotal = () => {
        if(props.cartDetails.length === 0)return 0;
        let count = 0 ;
        props.cartDetails.forEach(e => {
                count+= parseInt(e.product.productPrice || "0") * e.cartData.items;
        })

        return count;
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Brand</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cartDetails.map((row) => (
            <TableRow
              key={row.product.productName + "______shopping__cart__details"}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                    <img src={row.product?.productImage || ""}  className="product__table__image"/>
              </TableCell>
              <TableCell align="left">{row.product.productName || ""}</TableCell>
              <TableCell align="left">{brands.filter( (e:any) => e.key===row.product.brand)[0]?.name || "Not found"}</TableCell>
              <TableCell align="left">${row.product.productPrice || ""}</TableCell>
              <TableCell align="center">
                    <span>
                        <Button variant="contained" 
                        className="shopping__cart__table__action__button" color="error"
                        onClick={changeCart(row.product,row.cartData,-1)}
                        >-</Button>
                        <span className="shopping__cart__product__item__count">{row.cartData.items}</span>
                        <Button variant="contained" color="success"
                        onClick={changeCart(row.product,row.cartData,+1)}
                        >+</Button>
                    </span>
                </TableCell>
            </TableRow>
          ))}

        <TableRow>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell rowSpan={3} align="center">Total : ${getTotal()}</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}
