import React, { useState,KeyboardEvent } from "react";
import { 
    IconButton, 
    List, 
    ListItem, ListItemText, MenuItem,Stack,
    MenuList, TextField, Typography,
    Box,
    CircularProgress,
    Snackbar
     } from "@mui/material"
import Button from "@mui/material/Button";
import { onValue, ref, Unsubscribe } from "firebase/database";
import { useEffect } from "react";
import { database } from "../../../firebase/firebase";
import "./Brands.css"
import { Delete } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';


import {Brand, firebaseAddANewBrand, FirebaseBrand,deleteAFirebaseBrand} from "../../../firebase/firebase-database"

const brands:FirebaseBrand[] = []

export const AdminMobileBrands = () => {


    const [existingBrands,setExistingBrands] = useState(brands)
    const [nextBrand,setNextBrand] = useState('')
    const [brandLoaded,setBrandLoaded] = useState(false);


    const onNextBrandChange = (event:any) => {
        setNextBrand(event.target.value);
    }

    useEffect(() => {
        const reference = ref(database,"Brands")
        let sub:Unsubscribe | null = onValue(reference,val => {
            const data:any = val.val()
            if(data){
                const keys = Object.keys(data)

                const mappedData:FirebaseBrand[] = keys.map((e:string) => {
                    return {key:e,name:data[e].name}
                })

                setTimeout(() => {
                    if(!brandLoaded){
                        setBrandLoaded(true)
                    }
                    setExistingBrands(mappedData)
                },500)
                
            }
            return;
        })

        return () => {
            sub && sub();
        }
    },[])

    const [brandFeedbackMessage,setBrandFeedbackMessage] = useState('')
    const [brandFeedbackOpen,setBrandFeedbackOpen] = useState(false)

    const deleteABrand = (key:string) => {
        return  () => {
            deleteAFirebaseBrand(key).then(e => {
                setBrandFeedbackMessage('Brand deleted..')
            }).catch(e => {
                setBrandFeedbackMessage('Failed to remove..')
            }).finally(() => {
                setBrandFeedbackOpen(true)
            })
        }
    }

    const addToTheBrands = (event:KeyboardEvent<HTMLInputElement>) => {
            if("Enter" !== event.key)return false;

            const brand:Brand = {name:nextBrand}
            firebaseAddANewBrand(brand).then(e => {
                    setBrandFeedbackMessage('Brand added')
            }).catch(e => {
                setBrandFeedbackMessage('Problem occured..')
            }).finally(() => {
                setBrandFeedbackOpen(true)
                
            })

            setNextBrand('')

            return true;
    }

    const handleFeedbackMessageClose = () => {
        setBrandFeedbackOpen(false);
        setBrandFeedbackMessage('')
    }


    const feedbackCloseAction = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleFeedbackMessageClose}>
            Close
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleFeedbackMessageClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    


    return  (
    <div className="mobile__brands">
        <h1>Brands</h1>

        <div className="mobile__new__brand">
            <TextField  variant="standard" label="Add a new Brand" fullWidth onKeyUp={addToTheBrands} onChange={onNextBrandChange} value={nextBrand}/>
        </div>

        <div className="existing__brands"
             >
                {existingBrands.length >= 1 &&

                existingBrands.map( (e,i) => (
                    <Stack
                    direction="column"
                    >

                    <div
                    key={e.name + i}
                     className="existing__brand"
                     >
                        <h3>{e.name}</h3>
                        <IconButton color="error" onClick={deleteABrand(e.key)}>
                            <Delete />
                        </IconButton>
                    </div> 
                </Stack>
             ))
                }
         
        </div>

        
        { !brandLoaded &&  < Box sx={{ display: 'flex' }} className="loading__screen">
                    <CircularProgress />
        </Box>
}

        <Snackbar
                open={brandFeedbackOpen}
                autoHideDuration={6000}
                onClose={handleFeedbackMessageClose}
                message={brandFeedbackMessage}
                action={feedbackCloseAction}
                />
    </div>
    )
}
