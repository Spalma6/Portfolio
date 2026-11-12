import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import About from "./src/about";
import Contact from "./src/contact";
import Education from "./src/education";
import Project from "./src/project";
import Services from "./src/services";
import Login from "./components/login";
import Register from "./components/register";
import AdminDashboard from "./components/AdminDashboard";

const MainRouter = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/education" element={<Education />} />
      <Route path="/project" element={<Project />} />
      <Route path="/projects" element={<Project />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </Layout>
);

export default MainRouter;
