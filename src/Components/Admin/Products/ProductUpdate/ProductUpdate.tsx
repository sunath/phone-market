import { onValue, ref } from "firebase/database";
import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../../../../firebase/firebase";
import { ProductModel } from "../../../../firebase/firebase-database";
import { ProductForm } from "../ProductForm";


export const ProductUpdateComponent = () => {

    const {key,brand} = useParams()

    const [dataLoaded,setDataLoaded] = useState(false)

    const navigate = useNavigate()

    const [updateProductData,setUpdateProductsData]  = useState<ProductModel>()

    useEffect(() => {
        console.log(key)
        onValue(ref(database,"Products/"+brand+"/"+key), (snapshot) => {
                if(!snapshot.exists())navigate('/admin/products');
                const data  = snapshot.val()
                setUpdateProductsData({...data,key})
                setDataLoaded(true)
        })
    },[])

    if(!dataLoaded){
        return (
            <div>
                <h1>Data is loading</h1>
            </div>
        )
    }

    return (
    <div>
        <ProductForm isUpdating={true} updateProductFormVisibleState={undefined} updatingProduct={updateProductData}></ProductForm>
    </div>)
}