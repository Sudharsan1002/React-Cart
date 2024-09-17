import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({showModal,closeModal,cartItems,removefromcart,incrementQuantity,decrementQuantity,totalPrice }) => {
    //Don't render the modal if showmodal is false
    if(!showModal){
        return null;
    }
  return (
    //Rendering the Modal
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <div className="flex items-center justify-between">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover"
                  />
                  <div className="flex-1 ml-4">
                    <p className="text-lg font-medium">{item.title}</p>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => removefromcart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}

        <div className="mt-4">
          <p className="text-lg font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>

        <button
          className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={closeModal} // Call closeModal function to close the modal
        >
          Close
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
    showModal: PropTypes.bool.isRequired, //showModal is a required boolean prop
    closeModal: PropTypes.func.isRequired, //closeModal is a required function prop
    cartItems: PropTypes.array.isRequired, //cartItems is a required array prop
}

export default Modal