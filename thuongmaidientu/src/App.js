import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/layout/footer/footer";
import Header from "./Components/layout/header/header";
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
import ProductAdmin from "./Dashboard/pages/productAdmin";
import About from "./Components/Pages/about";
import Contact from "./Components/Pages/contact";
import UserAdmin from "./Dashboard/pages/userAdmin";
import OrderAdmin from "./Dashboard/pages/orderAdmin";
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
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
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
              <Route
                path="/productAdmin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <ProductAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/userAdmin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <UserAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderAdmin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <OrderAdmin />
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
