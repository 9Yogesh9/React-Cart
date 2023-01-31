import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, collection, getDocs, setDoc, addDoc, onSnapshot } from "firebase/firestore";

// https://firebase.google.com/docs/firestore/quickstart#web-version-9
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBKDEZ_goJK7c8AWrmdg4znxoRWDCYZd0",
  authDomain: "cart-5235b.firebaseapp.com",
  projectId: "cart-5235b",
  storageBucket: "cart-5235b.appspot.com",
  messagingSenderId: "567559977084",
  appId: "1:567559977084:web:7e406701489f59c1fd71f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
  }

  async componentDidMount() {

    // -----------------------------------------------
    // Get single doc
    // const docRef = doc(db, "products", "pl6aa0Bzugza8I6LuLnP");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    // -----------------------------------------------

    // Get all docs
    let products = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data();
      data.id = doc.id;
      products.push(data);
    });

    this.setState({
      products,
      loading: false
    })

    // Attaching the onSnapshot to listen whenever the data changes in firestore
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      { includeMetadataChanges: true },
      (snapshot) => {

        // Updating the whole products array for single change
        products = snapshot.docs.map((doc) => {
          let data = doc.data();
          data.id = doc.id;
          return data;
        })

        // snapshot.docChanges().map((ch) => {
        //   console.log(ch.doc.data(),"pin point the changes in specific doc");
        // });

        this.setState({
          products
        })
      });

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

  addProducts = () => {
    // Use this function to add the products
    let obj = [{
      price: 4950,
      qty: 2,
      title: "Phone",
      imgLink: "https://m.media-amazon.com/images/I/41OBf52bnOL._SX300_SY300_QL70_FMwebp_.jpg"
    }, {
      price: 9945,
      qty: 1,
      title: "Wallet",
      imgLink: "https://m.media-amazon.com/images/I/919V+ZDE2EL._SX679_.jpg"
    }]
    obj.forEach((pro) =>{
      addDoc(collection(db, "products"), pro );
      console.log("added product !")
    })
  }

  render() {
    const { products, loading } = this.state;
    return (
      <>
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProducts}>Add Products</button> */}
        <div className="App">
          <Cart
            products={products}
            onIncreaseQuantity={this.onIncreaseQuantity}
            onDecreaseQuantity={this.onDecreaseQuantity}
            deleteProduct={this.deleteProduct}
          />
        </div>
        {loading && <h1>Loading your cart !</h1>}
        <div style={{ padding: 10, fontSize: 25 }}>Total : {this.getCartTotal()}</div>
      </>
    );
  }
}

export default App;
