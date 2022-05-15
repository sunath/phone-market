import {useState} from "react"
import {Row,Col,Card} from "react-bootstrap";
import "./Checkout.css";
import {TextField,Button,Backdrop,CircularProgress} from "@mui/material"
import { useSelector } from "react-redux";
import { CartProductData } from "../ShoppingCart/ShoppingCart";
import { push,ref, remove} from "firebase/database"; 
import { database } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const CheckoutPage = () => {

    const userID = useSelector((store:any) => {
        return store.user?.user.uid;
    })


    const [showBackdrop,setBackdropState] = useState(false)

    const totalPrice = () => {
        if(!products || products.length == 0 )return 0;
        let total = 0 ;
        products.forEach(e => {
            total += parseInt(e.product?.productPrice || "") * e.cartData.items;
        })

        return total;
    }


    const products = useSelector((store:any) => {
        
        if(!store.cart || !store.cart.items)return [];
        const newProducts:CartProductData[] = []

        Object.keys(store.cart.items).map(e => {
            Object.keys(store.cart.items[e]).map(x => {
                const product = store.userProducts.currentProducts.filter((y:any) => y.key === x)[0]
                newProducts.push({product:product,cartData:store.cart.items[e][x]})
            })
        });

        return newProducts;
    })

    const [form,setForm] = useState<any>({})

    const currentCart = useSelector((store:any) => {
        return store.cart;
    })

    const navigate = useNavigate()

    const handleForm = (event:any) => {
        event.preventDefault()
        setBackdropState(true)
        const tempForm = form;
        tempForm['checkoutAt'] = Date();
        const reference = ref(database,`Checkouts/${userID}/`)
        push(reference,{checkoutData:tempForm,cart:currentCart}).then( e => {
            setBackdropState(false);
        }).finally(() => {
            navigate('/')
            setBackdropState(false);
        })
        const userReference=  ref(database,'Carts/'+userID)
        remove(userReference);
    }

    const handleInput = (event:any) => {
        const name = event.target.name;
        const newForm = form;
        newForm[name] = event.target.value;
        setForm(newForm);
    }


    return (

        <div className="check__out__page__container">

        <div className="check__out__page__content">

                <div className="check__out__page__details">
                                
                    <h3 className="check__out__page__title">Fill up the form</h3>
                    <form>
                            <TextField label="Full name"
                            variant="standard" 
                            fullWidth 
                            name="fullName" 
                            onChange={handleInput}
                            className="form__field"/>

                            <TextField label="Address" 
                            variant="standard"
                            onChange={handleInput}
                            fullWidth name="address" className="form__field"/>

                            <TextField label="Phone Number" 
                            onChange={handleInput}
                            variant="standard" 
                            fullWidth 
                            name="phoneNumber" className="form__field"/>

                            <Button fullWidth variant="contained" style={{marginLeft:"2em",marginTop:'1em'}} onClick={handleForm}>Proceed</Button>
                        </form>
                </div>
                   
               

            <div className="check__out__page__summary">


                    <Card>
                        <Card.Title>Quick Summary</Card.Title>

                        <Card.Body>
                            {
                                products.map((e,i) => {
                                    return <h6  className="summary__product__item__detail" key={"user__check__out__item__num__"+i}>{e.product.productName} : ${parseInt(e.product.productPrice || "") * e.cartData.items}</h6>
                                })
                            }
                        </Card.Body>


                        <Card.Footer>
                            <h6>Sub total : ${totalPrice()}</h6>
                            <h6>Shipping Free : $200</h6>
                            <h6>Total : ${totalPrice() + 200}</h6>
                        </Card.Footer>
                    </Card>

            </div>

            </div>

                <Backdrop
                open={showBackdrop}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
           
        </div>
    )
}