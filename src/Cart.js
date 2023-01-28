import React from "react";
import CartItem from "./CartItem";

class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [
                {
                    id: 1,
                    price: 45,
                    qty: 3,
                    title: "Watch",
                    imgLink:""
                }, {
                    id: 2,
                    price: 4950,
                    qty: 2,
                    title: "Phone",
                    imgLink:""
                }, {
                    id: 3,
                    price: 9945,
                    qty: 1,
                    title: "Wallet",
                    imgLink:""
                },

            ]
        }
    }
    render() {
        const { products } = this.state;
        return (
            <div className="cart">
                {
                    products.map((item) => {
                        return (<CartItem
                            product={item}
                            key={item.id}
                        />);
                    })
                }
            </div>
        );
    }
}

export default Cart;