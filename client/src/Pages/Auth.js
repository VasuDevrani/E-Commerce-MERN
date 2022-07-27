import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from '../Store.js'
import { toast } from "react-toastify";

export default function Auth() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const reset = () => {
    setUserData({
      email: "",
      password: "",
    });
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = userData.email;
      const password = userData.password;

      const { data } = await axios.post("api/users/signin", {
        email,
        password,
      });

      console.log(data);

      // save to store and local storage(for addressing the refresh)
      ctxDispatch({type: 'USER_SIGNIN', payload: data});
      localStorage.setItem('userinfo', JSON.stringify(data));

      navigate(redirect || '/');

    } catch (err) {
      console.log(err.message);
      toast.error('Invalid email or password');
    }
    reset();
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
      if(userInfo){
        navigate(redirect)
      }
    }, [navigate, redirect, userInfo])

  return (
    <div className="container small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3" aria-controls="email">
          <label htmlFor="InputEmail1" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            aria-required
            id="InputEmail1"
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-3" aria-controls="password">
          <label htmlFor="InputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword1"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-warning" type="Submit">
            Sign In
          </button>
        </div>
        <div className="mb-3">
          New Customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </form>
    </div>
  );
}
