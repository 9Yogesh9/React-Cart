import React from "react";
import CartItem from "./CartItem";

// class Cart extends React.Component 
const Cart = (props) => {
    // render() {
    const { products } = props;
    return (
        <div className="cart">
            {
                products.map((item) => {
                    return (<CartItem
                        product={item}
                        key={item.id}
                        onIncreaseQuantity={props.onIncreaseQuantity}
                        onDecreaseQuantity={props.onDecreaseQuantity}
                        deleteProduct={props.deleteProduct}
                    />);
                })
            }
        </div>
    );
    // }
}

export default Cart;