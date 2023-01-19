import React from "react";

class CartItem extends React.Component {
    constructor() {
        super();
        this.state = {
            price: 999,
            title: 'Phone',
            qty: 1,
            img: ''
        }
    }
    increaseQuantity = () => {
        console.log(this);
    }
    render() {
        const { price, title, qty } = this.state;
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} />
                </div>
                <div className="right-block">
                    <div style={{ fontSize: 25 }}>{title}</div>
                    <div style={{ color: '#777' }}>Rs {price}</div>
                    <div style={{ color: '#777' }}>Qty: {qty}</div>
                    <div className="cart-item-actions">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/9068/9068645.png"
                            alt="increase"
                            className="action-icons"
                            onClick={this.increaseQuantity}
                        />
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/9068/9068752.png"
                            alt="decrease"
                            className="action-icons"
                        />
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3178/3178290.png"
                            alt="delete"
                            className="action-icons"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CartItem;

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}