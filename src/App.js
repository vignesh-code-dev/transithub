import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./layouts/Layout";
import BusTravelOwner from "./pages/BusTravelOwner";
import BusRegistration from "./pages/BusRegistration";
import "@fontsource/inter";
import "@fontsource/roboto-mono";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/layout" element={<Layout></Layout>} />
        <Route path="/travels-owner/dashboard" element={<BusTravelOwner></BusTravelOwner>} />
        <Route path="/travels-owner/buses" element={<BusRegistration></BusRegistration>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;