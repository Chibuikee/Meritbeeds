import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Registration from "./components/Registration";
import Signin from "./components/Signin";
import Adminpage from "./pages/admin/Adminpage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <h2 className="font-bold">MERITBEEDS</h2>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Adminpage" element={<Adminpage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
