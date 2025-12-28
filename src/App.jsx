import React from 'react';
import { Toaster } from 'sonner';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
      <Toaster position="top-right" richColors />
    </>
  );
}
