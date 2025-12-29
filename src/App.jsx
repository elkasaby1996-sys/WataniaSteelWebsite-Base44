import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './Layout.jsx';
import About from './pages/About.jsx';
import Admin from './pages/Admin.jsx';
import Calculator from './pages/Calculator.jsx';
import Cart from './pages/Cart.jsx';
import Contact from './pages/Contact.jsx';
import FAQ from './pages/FAQ.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Projects from './pages/Projects.jsx';
import Quote from './pages/Quote.jsx';
import Services from './pages/Services.jsx';
import Store from './pages/Store.jsx';

const withLayout = (page) => <Layout>{page}</Layout>;

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={withLayout(<Home />)} />
        <Route path="/about" element={withLayout(<About />)} />
        <Route path="/services" element={withLayout(<Services />)} />
        <Route path="/store" element={withLayout(<Store />)} />
        <Route path="/projects" element={withLayout(<Projects />)} />
        <Route path="/faq" element={withLayout(<FAQ />)} />
        <Route path="/contact" element={withLayout(<Contact />)} />
        <Route path="/calculator" element={withLayout(<Calculator />)} />
        <Route path="/quote" element={withLayout(<Quote />)} />
        <Route path="/order" element={<Navigate to="/store?mode=manual" replace />} />
        <Route path="/cart" element={withLayout(<Cart />)} />
        <Route path="/product" element={withLayout(<Product />)} />
        <Route path="/admin" element={withLayout(<Admin />)} />
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
}
