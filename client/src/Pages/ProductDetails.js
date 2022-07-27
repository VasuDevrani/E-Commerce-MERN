import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// for error message
import { getError } from "../utils/utils.js";

import { productReducer } from "../reducers/ProductReducer.js";
import Loading from "../components/Loading.js";
import { Store } from "../Store.js";

export default function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  // reducer for the specific product
  const [{ loading, error, product }, dispatch] = useReducer(productReducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQ" });

      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: disp } = useContext(Store);
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
    disp({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    navigate("/cart");
  };

  return (
    <div>
      {loading ? (
        <div className="container">
          <Loading />
        </div>
      ) : error ? (
        <div class="alert alert-danger" role="alert">
          {/* to get the special err message */}
          {error}
        </div>
      ) : (
        <div className="container my-3">
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <div className="row">
            <div className="col col-md-6 col-12">
              <img
                className="img-large"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="col col-md-6">
              <div className="col">
                <div className="list-group flush">
                  <div className="list-group-item">
                    <h1 className="pt-3">{product.name}</h1>
                  </div>
                  <div className="list-group-item">
                    Price:<strong> Rs {product.price}</strong>
                  </div>
                  <div className="list-group-item">
                    Description: <p>{product.description}</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    {/*  */}
                    <div className="list-group flush">
                      <div className="list-group-item">
                        <div className="row">
                          <div className="col">Price: </div>
                          <div className="col">${product.price} </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="list-group-item">
                        <div className="row">
                          <div className="col">Status: </div>
                          <div className="col">
                            {product.countInStock > 0 ? (
                              <div className="badge bg-success">In Stock</div>
                            ) : (
                              <div className="badge bg-danger">Unavailable</div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      {product.countInStock > 0 ? (
                        <div className="list-group-item">
                          <div className="d-grid">
                            <button
                              className="btn btn-primary"
                              onClick={AddToCart}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {/*  */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
