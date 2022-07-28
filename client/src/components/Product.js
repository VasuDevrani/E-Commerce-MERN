import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import Rating from "./Rating";

export default function Product({ product }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const AddToCart = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // to manage the stocks
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    console.log(quantity);

    // here payload is the added product details and the quantity
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <div key={product.slug} className="card">
      <Link to={`/product/${product.slug}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <h5 className="card-title">
          <Link
            to={`/product/${product.slug}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            {product.name}
          </Link>
        </h5>
        <Rating rating={product.rating} numReviews={product.numReviews ? product.numReviews : 'No'} />
        <div className="card-text my-3">
          <strong>₹ {product.price}</strong>
        </div>
        <button
          className={`btn btn-${
            product.countInStock === 0 ? "danger" : "success"
          }`}
          onClick={AddToCart}
          disabled={product.countInStock === 0}
        >
          {product.countInStock !== 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
