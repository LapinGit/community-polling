import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import Header from "./components/Header";
import Polls from "./pages/Polls";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePolls from "./pages/CreatePolls";
import PostPoll from "./pages/PostPoll";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/create-poll" element={<CreatePolls />} />
        <Route path="/post/:postSlug" element={<PostPoll />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
