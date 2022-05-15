

import {database} from "./firebase";
import {ref,onValue,set,push,remove, update} from "firebase/database";


export interface FirebaseBrand { 
    key:string,
    name:string
}


export interface Brand {
    name:string
}

export interface ProductModel {
    productName?:string,
    productQuantity?:string,
    productPrice?:string,
    brand?:string,
    productImage?:string,
    inStock?:boolean,
    createdAt?:any
    key?:string
}

export interface CartItem {
    items:number
}



export const firebaseAddANewBrand = (brand:Brand) => {
    const reference = ref(database,"Brands/")
    return push(reference,brand)
}

export const deleteAFirebaseBrand = (brandKey:string) => {
    const reference = ref(database,`Brands/${brandKey}`)
    return remove(reference)
}

export const firebaseAddANewProduct = (productDetails:ProductModel) => {
    const reference = ref(database,`Products/${productDetails.brand}`)
    return push(reference,productDetails)
}

export const firebaseUpdateANewProduct = (productDetails:ProductModel) => {
    const reference = ref(database,`Products/${productDetails.brand}/${productDetails.key}`)
    let product = productDetails;
    delete product.key;
    return update(reference,product);
}

export const firebaseDeleteAProduct = (key:string,brand:string) => {
    const reference = ref(database,`Products/${brand}/${key}`);
    return remove(reference);
}