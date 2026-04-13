import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import RestaurantListing from './pages/RestaurantListing';
import RestaurantDetails from './pages/RestaurantDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            {/* Global Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1f2937',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                },
                success: {
                  iconTheme: { primary: '#f97316', secondary: '#fff' },
                },
                error: {
                  iconTheme: { primary: '#ef4444', secondary: '#fff' },
                },
              }}
            />

            <Navbar />
            <main className="pt-16">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/restaurants" element={<RestaurantListing />} />
                <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes — require login */}
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <Checkout />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/order-tracking"
                  element={
                    <PrivateRoute>
                      <OrderTracking />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <UserDashboard />
                    </PrivateRoute>
                  }
                />

                {/* 404 Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;