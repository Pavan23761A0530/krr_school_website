import { BrowserRouter, Routes, Route } from "react-router-dom";

import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import WhyChooseUs from './components/WhyChooseUs'
import Academics from './components/Academics'
// import Hostel from './components/Hostel'
import Facilities from './components/Facilities'
import Gallery from './components/Gallery'
import Achievements from './components/Achievements'
import Testimonials from './components/Testimonials'
import Message from './components/Message'
import News from './components/News'
// import AdmissionsCTA from './components/AdmissionsCTA'
import Footer from './components/Footer'

import AboutUs from "./components/pages/AboutUs";
import FacilitiesPage from "./components/pages/Facilities";
import FeePage from "./components/pages/Fee";
import Contact from "./components/pages/Contact";
import Apply from "./components/pages/Apply";
import TransportDashboard from "./components/Transport/TransportDashboard";

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <WhyChooseUs />
      <Academics />
      {/* <Hostel /> */}
      <Facilities />
      <Gallery />
      <Achievements />
      <Testimonials />
      <Message />
      <News />
      {/* <AdmissionsCTA /> */}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-body text-navy-800">
        <AnnouncementBar />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/fee-structure" element={<FeePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/transport" element={<TransportDashboard />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}