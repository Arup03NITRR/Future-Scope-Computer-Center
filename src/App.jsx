import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Import Layout & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import NoticeBoard from './pages/NoticeBoard'; // 1. Import the new page component
import HallOfFame from './pages/HallOfFame';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';

// Layout component to wrap pages with the Navbar
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-6">
        <Outlet /> {/* Child routes will render here */}
      </main>
      <Footer/>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="courses" element={<Courses />} />
          <Route path="notice" element={<NoticeBoard />} /> {/* 2. Add the route */}
          <Route path="hall-of-fame" element={<HallOfFame />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact-us" element={<ContactUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;