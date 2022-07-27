import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Store } from "../Store";

export default function BeSeller() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const _id = userInfo._id;
    const { data } = await axios.put("/api/users/registerSeller", {
      _id,
      isSeller: true,
    });
    console.log(data);
    ctxDispatch({ type: "USER_SIGNIN", payload: data });
    localStorage.setItem("userinfo", JSON.stringify(data));

    toast.success("Click Be Seller again and redirect to home page");
  };
  return (
    <div className="container">
      <form className="my-4 text-center border p-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name </label>{" "}
          <input type="text" id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="company">Company</label>{" "}
          <input type="text" id="company" required />
        </div>
        <div className="mb-3">
          <label htmlFor="product">Product type</label>{" "}
          <input type="text" id="product" required />
        </div>
        <button type="Submit" className="btn btn-success">
          Be Seller
        </button>
      </form>
    </div>
  );
}
