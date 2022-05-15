import { Button } from "@mui/material"
import {Carousel} from "react-bootstrap"
import { useSelector } from "react-redux"
import "./Home.css"

import {signInWithGoogle} from "../../firebase/firebase-auth"
import { useNavigate } from "react-router-dom"
export const Home = () => {

    const user = useSelector((store:any) => {
        return store.user?.user || null;
    })

    const signIn = () => {
        signInWithGoogle()
    }

    const navigate = useNavigate()

    return  (
        <div className="home">
            <div className="hero"></div>
            <div className="content">
                {
                    !user ? 
                <>
                <h1 className="text__white">Sign In And Enjoy</h1>
                <Button variant="contained" onClick={signIn}>Sign In</Button>
                </>
            

                :
                    <>
                        <h1 className="text__white">See our Products</h1>
                <Button variant="contained" onClick={() => {navigate('/products')}}>go there</Button>
                    </>
            
                }
            </div>
        </div>
    )
}

