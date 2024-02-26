import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import DashBoard from "./Pages/DashBoard";
import Header from "./components/Header";
import Polls from "./Pages/Polls";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/polls" element={<Polls />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashBoard />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
 