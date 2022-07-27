import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";

export default function Navbar() {

  const {state} = useContext(Store);
  const {cart} = state;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          BuySell
        </Link>
        <Link to='/cart' className="nav-item text-light">
          <button className="btn btn-light px-4">
          Cart {
            cart.cartItems.length > 0 ? `- ${cart.cartItems.reduce((a, c) => a + c.quantity, 0)}`
            : ''
          }
          </button>
        </Link> 
      </div>
    </nav>
  );
}
