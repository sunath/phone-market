import  React,{useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



import "./ProductTable.css"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import {ProductModel,FirebaseBrand} from "../../../../firebase/firebase-database"
import { onValue, ref } from 'firebase/database';
import { database } from '../../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

import {firebaseDeleteAProduct} from "../../../../firebase/firebase-database"

const defaultValue:ProductModel[] = [];


export  function ProductTable() {


  const [products,setProducts] = React.useState(defaultValue)

  const [brands,setBrands] = React.useState(new Array<FirebaseBrand>())

  const [productDeleteDialog,setProductDeleteDialog] = useState(false)
  const [nextDeletingProductDetails,setNextDeletingProduct] = useState('')

  const navigate = useNavigate()


  const updateDeleteProduct = (key:string,brand:string) => {
    if(!key || !brand || key.length <= 1 || brand.length <= 1)return;
      setProductDeleteDialog(true)
      setNextDeletingProduct(key+" "+brand)
  }

  const deleteNextProduct = () => {
    setProductDeleteDialog(false);
    const [key,brand] = nextDeletingProductDetails.split(" ");
    if(!key || !brand || key.length <= 1 || brand.length <= 1)return;
    firebaseDeleteAProduct(key,brand).then(e => {

    }).catch(e => {

    })

  }

  const navigateTo = (brand:string,key:string) => {
    return () => {
      navigate("/admin/products/update/"+brand+"/"+key)
    }
  }

  React.useEffect(() => {
    const reference = ref(database,"Products");
    const listener = onValue(reference,(data) => {
      const referenceData = data.val()

      
      const newProducts:ProductModel[] = []



      const newData = Object.keys(referenceData).map(e => {
          const  newItems = Object.keys(referenceData[e]).map(x => {
              return {...referenceData[e][x],key:x}
          })
          return newItems
      })

      for(let i = 0 ; i < newData.length;i++){
        newProducts.push(...newData[i])
      }
      setProducts(newProducts);

    })

    const brandsListener = onValue(ref(database,"Brands"),(snapshot) => {
        const data = snapshot.val()
        const brandData:FirebaseBrand[] = Object.keys(data).map(e => {
          return {
            key:e,
            name:data[e].name
          }
        })

        setBrands(brandData)
    })

    return () => {
      listener()
      brandsListener()
    }

  },[])



 



  const convertLongDateToShort = (day:string) => {
    return day.split(" ").splice(0,4).reduce((e,v) => `${e} ${v}`)
    
  }



  
  


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>

            <TableCell align="left" className='product__tabel__head_cell'>
                  Product Name
            </TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right" >Price</TableCell>
            <TableCell align="right" >Quantity</TableCell>
            <TableCell align="right">Created at</TableCell>
            <TableCell align="right"></TableCell>
            
          </TableRow>

        </TableHead>

        <TableBody>

          { products.map(row =>  (<TableRow
                key={row.productName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img src={row.productImage}  className="product__table__image"/>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.productName}
                </TableCell>
                <TableCell align="right">{
                brands.length >= 1 ?
                brands.filter(e => e.key === row.brand)[0].name || "Not found"
                : 'Not found'
              }</TableCell>
                <TableCell align="right">{row.productPrice}</TableCell>
                <TableCell align="right">{row.productQuantity}</TableCell>
                <TableCell align="right">{convertLongDateToShort(row.createdAt)}</TableCell>
                <TableCell align="right">
                  <Button size='small' color="secondary" onClick={navigateTo(row.brand || '',row.key || '')}>Update</Button>
                  <Button size="small" color="error" onClick={() => updateDeleteProduct(row.key || '',row.brand || '')}>Delete</Button>
                </TableCell>
              </TableRow>
          ))}
                


        </TableBody>
      </Table>


      {/* Dialog For Deleting Products */}

      <Dialog open={productDeleteDialog} >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
        <DialogContentText>
          Are you sure about this.Keep in mind if you delete this product you cannot recover it anyway
        </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="success" variant="contained" onClick={() => {
            setProductDeleteDialog(false)
            console.log(nextDeletingProductDetails)
          }} >Cancel</Button>
          <Button color="error" variant="contained"  onClick={deleteNextProduct}>Delete anyway</Button>
        </DialogActions>
      </Dialog>

    </TableContainer>
  );
}
