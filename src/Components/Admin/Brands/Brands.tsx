import { useState } from "react";
import { IconButton, List, ListItem, ListItemText, MenuItem, MenuList, TextField, Typography } from "@mui/material"
import Button from "@mui/material/Button";
import { onValue, ref, Unsubscribe } from "firebase/database";
import { useEffect } from "react";
import { database } from "../../../firebase/firebase";
import "./Brands.css"
import { Delete } from "@mui/icons-material";


interface Brand {
    name:string
}

const brands:Brand[] = []

export const AdminMobileBrands = () => {


    const [existingBrands,setExistingBrands] = useState(brands)

    useEffect(() => {
        const reference = ref(database,"Brands")
        let sub:Unsubscribe | null = onValue(reference,val => {
            const data = val.val()
            setExistingBrands(data)
            return;
        })

        return () => {
            sub && sub();
        }
    })

    return  (
    <div className="mobile__brands">
        <h1>Brands</h1>

        <div className="mobile__new__brand">
            <TextField  variant="standard" label="Add a new Brand" fullWidth/>
        </div>

        <div className="existing__brands">
            <List className="existing__brands__list">
                {existingBrands.length >= 1 &&  
                existingBrands.map(e => (

                    <ListItem key={e.name}
                     className="text-align-center"
                     secondaryAction={
                     <IconButton>
                        <Delete />
                     </IconButton>}
                     >

                        <ListItemText primary={e.name}/>

                    </ListItem> 
             ))
            
                }
            </List>
        </div>
    </div>
    )
}
