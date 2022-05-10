
import React from "react";

interface ShoppingCartProps extends React.FC<{className:string}> {}

export const ShoppingCartPage:ShoppingCartProps = props => {
    return (
        <div className={props.className}>This is insane</div>
    )
}