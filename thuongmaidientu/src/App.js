import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/layout/footer";
import Header from "./Components/layout/header";
import UnderDev from "./Components/layout/underDev";
import HomePage from "./Components/Pages/homePage";
import Categories from "./Components/Pages/categories";
import Product from "./Components/Pages/product";
import { CartProvider } from "./context/CartContext";
import Cart from "./Components/Pages/cart";
import Login from "./Components/Pages/login";
import Signup from "./Components/Pages/signup";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import Dashboard from "./Dashboard/pages/dashboard";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/under-dev" element={<UnderDev />} />
              <Route path="/category/:slug" element={<Categories />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
