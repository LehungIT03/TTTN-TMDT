import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/layout/footer";
import Header from "./Components/layout/header";
import UnderDev from "./Components/layout/underDev";
import HomePage from "./Components/Pages/homePage";
import Categories from "./Components/Pages/categories";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/under-dev" element={<UnderDev />} />
          <Route path="/category/:slug" element={<Categories />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
