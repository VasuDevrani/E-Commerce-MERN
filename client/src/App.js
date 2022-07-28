import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// pages
import Home from "./Pages/Home.js";
import ProductDetails from "./Pages/ProductDetails.js";
import Navbar from "./components/Navbar.js";
import Cart from "./Pages/Cart";
import Auth from "./Pages/Auth";
import Shipping from "./Pages/Shipping";
import SignUp from "./Pages/SignUp";
import BeSeller from "./Pages/BeSeller";
import PaymentMethod from "./Pages/PaymentMethod";
import PlaceOrder from "./Pages/PlaceOrder";
import AddProducts from "./Pages/AddProducts";
import OrderHistory from "./Pages/OrderHistory";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="bottom-center" limit={1}/>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/shipping' element={<Shipping/>}/>
            <Route path="/signin" element={<Auth />} />
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/becomeSeller' element={<BeSeller/>}/>
            <Route path='/payment' element={<PaymentMethod/>}/>
            <Route path='/order' element={<PlaceOrder/>}/>
            <Route path='/addproducts' element={<AddProducts/>}/>
            <Route path='/orderhistory' element={<OrderHistory/>}/>
          </Routes>
        </main>
        {/* footer */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          Made by VasuDevrani using MERN
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
