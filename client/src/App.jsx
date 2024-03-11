import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import Header from "./components/Header";
import Polls from "./pages/Polls";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePolls from "./pages/CreatePolls";
import PostPoll from "./pages/PostPoll";

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
        <Route path="/create-poll" element={<CreatePolls/>} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashBoard />} />
        </Route>
        <Route path='/post/:postSlug' element={<PostPoll />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
 