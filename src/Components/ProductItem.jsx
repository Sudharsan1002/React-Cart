import React from 'react'
import PropTypes from 'prop-types'

const ProductItem = ({title,price,description,image,addToCart}) => {
  return (
    <div className="w-auto h-auto p-8 shadow-lg border rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
      <img src={image} alt={title} className="w-full h-64 object-cover mb-4" />
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">
        {description.substring(0, 100)}...
      </p>
      <p className="text-blue-600 font-semibold text-lg  mb-2">${price}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

ProductItem.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    addToCart: PropTypes.func.isRequired,
}

export default ProductItem