import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import TrackShipment from './pages/TrackShipment.jsx'
import Payment from './pages/Payment.jsx'
import BookShipment from './pages/BookShipment.jsx'
import GetQuote from './pages/GetQuote.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import CustomerDashboard from './pages/CustomerDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<TrackShipment />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/book-shipment" element={<BookShipment />} />
          <Route path="/get-a-quote" element={<GetQuote />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
