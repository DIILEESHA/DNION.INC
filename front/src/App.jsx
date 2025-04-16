import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About"; // Make sure to create this component
import "./App.css";
import Nav from "./components/nav/Nav";
import Entry from "./pages/home/Entry";
import All from "./pages/home/All";
import Projects from "./pages/projects/Projects";
import Service from "./pages/service/Service";
import ScrollToTop from "./ScrollToTop";
const App = () => {
  
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<All />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
