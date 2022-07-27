import React, { useEffect, useReducer } from "react";
import Product from "../components/Product.js";
import axios from "axios";

// to keep an eye on the reducer use logger
// import logger from "use-reducer-logger";
// logger(reducer) use as this inside the useReducer

// reducer to handle complex states
import {postReducer} from "../reducers/ProductReducer.js";
import Loading from "../components/Loading.js";

export default function Home() {
  // const [products, setProducts] = useState([]);

  const [{ loading, error, products }, dispatch] = useReducer(postReducer, {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQ" });

      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
        <h1 className="container">Featured products</h1>
      {loading ? (
        <div className="container">
        <Loading/>
        </div>
      ) : error ? (
        <div className="container">{error}</div>
      ) : (
        <div className="container">
          <div className="row">
          {products.length > 0
            ? 
             products.map((product) => (
              <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
                <Product key={product.slug} product={product} />
              </div>
              ))
            : ""}
            </div>
        </div>
      )}
    </div>
  );
}
