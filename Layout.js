import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{`
        :root {
          --maroon: #7B1F32;
          --navy: #1E3A5F;
          --dark: #1A1A1A;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      
      <Header />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}