import { useEffect, useState } from 'react';
import React from 'react'

import myImage from "./assets/myImage.png";
import ProductItem from './Components/ProductItem';
import Modal from './Components/Modal';



const App = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [products, setproducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  //use state for modal
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setproducts(data);
    };
    fetchProducts();
  }, []);

  // Function to handle adding an item to the cart
  const addToCart = (product) => {
    // Check if the item is already in the cart
    const alreadyAdded = cartItems.some((item) => item.id === product.id);

    if (alreadyAdded) {
      alert("Item already added to the cart"); // Display alert if item is already in the cart
    } else {
      // Add product with initial quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  // Function to handle removing an item from the cart
  const removefromcart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  //function to handle increment quantity
  const incrementQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  //function to handle decrement quantity
  const decrementQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  //calculating total price of the cart items
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  //function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };
  //function to handle cart icon click to show the modal
  const handleCartClick = () => {
    setShowModal(true);
  };
  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-4 container mx-auto shadow-md h-auto bg-gradient-to-t from-amber-100 to-white">
        <div className="text-3xl font-bold font-sans font italic bg-gradient-to-tr from-blue-600 to-amber-600 to-50% bg-clip-text text-transparent">
          MY-CART
        </div>

        <div className="w-10 h-auto relative">
          <img
            src={myImage}
            className="w-10 h-auto "
            //add handleCartClick function to handle cart icon click
            onClick={handleCartClick}
          />
          <div className="bg-red-400 rounded-xl px-1 absolute -right-1 -top-3 text-white ">
            {cartItems.length}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length ? (
            products.map((product) => {
              return (
                <ProductItem
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  addToCart={() => addToCart(product)}
                />
              );
            })
          ) : (
            <h1>loading...</h1>
          )}
        </div>
      </div>

      <Modal
        showModal={showModal}
        closeModal={closeModal}
        cartItems={cartItems}
        removefromcart={removefromcart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default App
