import React, { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CartCheckout from "../components/CartCheckout";
import axios from "axios";

export default function Cart() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <div className="container">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <div className="row">
        <div className="col col-md-8">
          {cart.cartItems.length === 0 ? (
            <div className="alert alert-warning" role="alert">
              Cart is empty!{" "}
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                Go Shopping
              </Link>
            </div>
          ) : (
            <div className="list-group">
              {cartItems.map((item) => (
                <>
                  <div className="list-group-item">
                    <div className="row align-items-center">
                      <div className="col col-md-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link
                          to={`/product/${item.slug}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="col col-md-3 text-center">
                        <button
                          className="btn btn-light"
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                        >
                          <ion-icon name="remove-circle"></ion-icon>
                        </button>{" "}
                        <span>{item.quantity}</span>{" "}
                        <button
                          className="btn btn-light"
                          disabled={item.quantity === item.countInStock}
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                        >
                          <ion-icon name="add-circle"></ion-icon>
                        </button>
                      </div>
                      <div className="col col-md-3 text-center">
                        ${item.price}
                      </div>
                      <div className="col col-md-2 text-center">
                        <button
                          className="btn btn-light"
                          onClick={() => removeItemHandler(item)}
                        >
                          <ion-icon name="trash-bin"></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
        <CartCheckout cartItems={cartItems} />
      </div>
    </div>
  );
}
