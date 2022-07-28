import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";

export default function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const { isSeller } = userInfo ? userInfo : "";

  const handleSignOut = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          BuySell
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {isSeller ? (
              <li className="nav-item text-light my-2 fs-7 mx-2">
                <Link
                  to="/addproducts"
                  style={{
                    textDecoration: "none",
                    color: "rgba(255, 255, 255, 0.55)",
                  }}
                >
                  Add Products
                </Link>
              </li>
            ) : (
              ""
            )}
            {userInfo ? (
              <li className="nav-item dropdown mx-2">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userInfo.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a className="dropdown-item" href="/">
                      User Profile
                    </a>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/orderhistory">
                      Order History
                    </Link>
                  </li>
                  {!isSeller && (
                    <li>
                      <Link className="dropdown-item" to="/becomeSeller">
                        Become Seller
                      </Link>
                    </li>
                  )}
                  <li>
                    <a
                      className="dropdown-item"
                      href="/"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <Link
                className="nav-item text-light mx-3 my-3"
                to="/signin"
                style={{ textDecoration: "none" }}
              >
                Sign In
              </Link>
            )}
          </ul>
          <Link to="/cart" className="nav-item text-light ms-auto">
            <button className="btn btn-light px-4">
              Cart{" "}
              {cart.cartItems.length > 0
                ? `- ${cart.cartItems.reduce((a, c) => a + c.quantity, 0)}`
                : ""}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// {userInfo ? (
//   <ul className="navbar-nav">
//     <li className="nav-item dropdown">
//       <a
//         className="nav-link dropdown-toggle"
//         href="/"
//         role="button"
//         data-bs-toggle="dropdown"
//         aria-expanded="false"
//       >
//         {userInfo.name}
//       </a>
//       <ul className="dropdown-menu dropdown-menu-dark">
//         <li>
//           <a className="dropdown-item" href="/">
//             User Profile
//           </a>
//         </li>
//         <li>
//           <a className="dropdown-item" href="/">
//             Order History
//           </a>
//         </li>
//       </ul>
//     </li>
//   </ul>
// ) : (
//   <Link className="nav-item text-light" to="/signin">
//     Sign In
//   </Link>
// )}
