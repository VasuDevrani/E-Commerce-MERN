import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./Pages/Home.js";
import ProductDetails from "./Pages/ProductDetails.js";
import Navbar from "./components/Navbar.js";
import Cart from "./Pages/Cart";
import Auth from "./Pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<Auth />} />
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
