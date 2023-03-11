import { Route, Routes } from "react-router-dom";
import Editproduct from "./components/editProduct";
import Navbar from "./components/NavBar/Navbar";
import Registration from "./components/Registration";
import Signin from "./components/Signin";
import Testtingfunctionpage from "./components/testtingfunctionpage";
import Adminpage from "./pages/admin/Adminpage";
import Cart from "./pages/cart/cart";
import DetailsPage from "./pages/details/DetailsPage";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Details/:productId" element={<DetailsPage />} />
          <Route path="EditProduct/:productEditId" element={<Editproduct />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Adminpage" element={<Adminpage />} />
          <Route path="/Cart" element={<Cart />} />
          <Route
            path="/Testtingfunctionpage"
            element={<Testtingfunctionpage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
