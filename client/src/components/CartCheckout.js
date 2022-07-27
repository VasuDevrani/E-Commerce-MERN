import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartCheckout({ cartItems }) {

  const navigate = useNavigate();

  const checkoutHandler = () => {
    // if user is signed in then reirect to shipping page
    navigate('/signin?redirect=/shipping');
  }

  return (
    <div className="col col-md-4">
      <div className="card">
        <div className="card-body">
          <div className="list-group flush">
            <div className="list-group-item">
              <h3>
                SubTotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                : Rs {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </h3>
            </div>
          </div>
          <button className="btn btn-warning mt-4" onClick={checkoutHandler} disabled={cartItems.length === 0}> {cartItems.length === 0 ? 'Add some products' : 'Proceed to checkout'}</button>
        </div>
      </div>
    </div>
  );
}
