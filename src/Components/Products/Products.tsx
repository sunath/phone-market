import React from "react";

interface ProductsProps extends React.FC<{className:string}> {}





export const ProductsPage:ProductsProps = props => {
    return <div className={props.className}>
       <h1>This is cool</h1>
    </div>
}