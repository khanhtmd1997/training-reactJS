import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/register";
import Product from "./components/Product/Product";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();

  useEffect(() => {
    let info = localStorage.getItem("user-info");

    if (info) {
      history.push("/"); // Replace "/" with the path to your home component
    } else {
      history.push("/login"); // Replace "/login" with the path to your login component
    }
  }, [history]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="products" element={<Product />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="admin" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
