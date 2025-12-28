import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const diameters = [8, 10, 12, 14, 16, 18, 20, 22, 25, 32];

export default function DiametersSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Available Sizes</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-6">
            Diameters Available
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Click any diameter to browse our products or place an order
          </p>
        </motion.div>

        {/* Diameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {diameters.map((dia, index) =>
          <motion.div
            key={dia}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}>

              <Link to={`${createPageUrl('Store')}?diameter=${dia}`}>
                <div className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:border-[#7B1F32] hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                  {/* Steel Bar Visual */}
                  <div className="bg-gradient-to-r text-slate-100 mb-4 mx-auto rounded-full from-gray-400 via-gray-300 to-gray-400 shadow-inner"

                style={{
                  width: `${Math.min(dia * 2.5, 80)}px`,
                  height: `${Math.min(dia * 2.5, 80)}px`
                }} />

                  
                  {/* Diameter Value */}
                  <div className="text-3xl font-black text-gray-900 group-hover:text-[#7B1F32] transition-colors">
                    {dia}<span className="text-lg font-bold text-gray-400">mm</span>
                  </div>

                  {/* Hover Arrow */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[#7B1F32] text-sm font-medium flex items-center justify-center gap-1">
                      View Products
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Color Indicator */}
                  <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                  index % 2 === 0 ? 'bg-[#7B1F32]' : 'bg-[#1E3A5F]'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`
                  } />

                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}