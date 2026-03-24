import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import GrainOverlay from "./components/GrainOverlay.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LuminaChatWidget from "./components/LuminaChatWidget.jsx";
import PlaceholderPage from "./components/PlaceholderPage.jsx";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home.jsx";
import Offerings from "./pages/Offerings.jsx";
import MyStory from "./pages/MyStory.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import TransformationStories from "./pages/TransformationStories.jsx";
import Connect from "./pages/Connect.jsx";

function Layout() {
  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <Navbar />
      <main 
        className="min-h-screen"
        style={{ 
          transform: 'translateZ(0)', 
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        <Outlet />
      </main>
      <Footer />
      <LuminaChatWidget />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="my-story" element={<MyStory />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="transformation-stories" element={<TransformationStories />} />
            <Route path="offerings" element={<Offerings />} />
            <Route path="connect" element={<Connect />} />
            <Route path="guardian" element={<PlaceholderPage title="Admin Panel" />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
