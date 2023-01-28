import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          id: 1,
          price: 45,
          qty: 3,
          title: "Watch",
          imgLink: "https://m.media-amazon.com/images/I/71CrNuzQaHL._SX679_.jpg"
        }, {
          id: 2,
          price: 4950,
          qty: 2,
          title: "Phone",
          imgLink: "https://m.media-amazon.com/images/I/41OBf52bnOL._SX300_SY300_QL70_FMwebp_.jpg"
        }, {
          id: 3,
          price: 9945,
          qty: 1,
          title: "Wallet",
          imgLink: "https://m.media-amazon.com/images/I/919V+ZDE2EL._SX679_.jpg"
        },

      ]
    }
  }

  onIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    products[index].qty += 1;
    this.setState({
      products
    })
  }

  onDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty - 1 >= 0) {
      products[index].qty -= 1;
      this.setState({
        products
      })
    }
  }

  deleteProduct = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    products.splice(index, 1);
    this.setState({
      products
    })
  }

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => count += product.qty)
    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;
    let totalAmount = 0;
    products.forEach((product) => totalAmount += (product.qty * product.price));
    return totalAmount;
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <Navbar count={this.getCartCount()} />
        <div className="App">
          <Cart
            products={products}
            onIncreaseQuantity={this.onIncreaseQuantity}
            onDecreaseQuantity={this.onDecreaseQuantity}
            deleteProduct={this.deleteProduct}
          />
        </div>
        <div style={{ padding: 10, fontSize: 25 }}>Total : {this.getCartTotal()}</div>
      </>
    );
  }
}

export default App;
