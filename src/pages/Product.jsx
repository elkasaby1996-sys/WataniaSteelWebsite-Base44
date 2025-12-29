import React from 'react';
import { motion } from 'framer-motion';

export default function Product() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">
              Product Details
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-4">
              Product Page
            </h1>
            <p className="text-lg text-gray-600">
              Product details will appear here soon. In the meantime, explore our store or
              request a quote for specific items.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
