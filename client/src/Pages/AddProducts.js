import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function AddProducts() {

    const [newProduct, setnewProduct] = useState({
        name: '',
        slug: '',
        image: '',
        brand: '',
        description: '',
        price: '',
        countInStock: '',
        rating: ''
    })

    const reset = () => {
        setnewProduct({
            name: '',
            slug: '',
            image: '',
            brand: '',
            description: '',
            price: '',
            countInStock: '',
            rating: ''
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(newProduct);

        await axios.post('/api/product/add', newProduct);

        reset();
    }

    const handleChange = (e) => {
        setnewProduct({...newProduct, [e.target.name]: e.target.value});
    }

  return (
    <div className="container small-container my-4">
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <form className="container-sm" onSubmit={handleSubmit}>
        <div className="mb-3" aria-controls="text">
          <label htmlFor="inputProduct" className="form-label">
            Product Name
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            aria-required
            id="inputProduct"
            value={newProduct.name}
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-3" aria-controls="text">
          <label htmlFor="inputBrand" className="form-label">
            Brand Name
          </label>
          <input
            className="form-control"
            type="text"
            name="brand"
            aria-required
            id="inputBrand"
            value={newProduct.brand}
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-3" aria-controls="text">
          <label htmlFor="inputslug" className="form-label">
            Slug Name
          </label>
          <input
            className="form-control"
            type="text"
            name="slug"
            aria-required
            id="inputslug"
            value={newProduct.slug}
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-3" aria-controls="text">
          <label htmlFor="inputPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="inputPrice"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3" aria-controls="text">
          <label htmlFor="inputDesc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="inputDesc"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3" aria-controls="text">
          <label htmlFor="stock" className="form-label">
            Stock Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="countInStock"
            value={newProduct.countInStock}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3" aria-controls="text">
          <label htmlFor="image" className="form-label">
            Image Link
          </label>
          <input
            className="form-control"
            type="text"
            name="image"
            aria-required
            id="image"
            value={newProduct.image}
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-3" aria-controls="text">
          <label htmlFor="rating" className="form-label">
            Ratings (0-5)
          </label>
          <input
            className="form-control"
            type="number"
            name="rating"
            aria-required
            id="rating"
            value={newProduct.rating}
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-3">
          <button className="btn btn-warning" type="Submit">
            Add New
          </button>
        </div>
      </form>
    </div>
  );
}
