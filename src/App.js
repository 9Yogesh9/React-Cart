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
          imgLink: ""
        }, {
          id: 2,
          price: 4950,
          qty: 2,
          title: "Phone",
          imgLink: ""
        }, {
          id: 3,
          price: 9945,
          qty: 1,
          title: "Wallet",
          imgLink: ""
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
    const {products} = this.state;
    let count = 0;
    products.forEach((product) => count+=product.qty)
    return count;
  }

  render() {
    const {products} = this.state;
    return (
      <>
        <Navbar count={this.getCartCount()}/>
        <div className="App">
          <Cart
            products = {products}
            onIncreaseQuantity={this.onIncreaseQuantity}
            onDecreaseQuantity={this.onDecreaseQuantity}
            deleteProduct={this.deleteProduct}
          />
        </div>
      </>
    );
  }
}

export default App;
