import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Scissors, Truck, Grid3X3, Wrench, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Scissors,
    title: 'Cut & Bend Rebar',
    description: 'High-precision cutting and bending using Schnell & Oscam machinery. All shapes and sizes with tight tolerances.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd1E7giHkqvlvGYKowvYg9RRdIP1Acggq8Sg&s',
    link: 'Services',
    color: '#7B1F32'
  },
  {
    icon: Truck,
    title: 'Straight Bar Supply',
    description: 'Express delivery within 1-2 hours across Qatar. Multiple trailer options with crane unloading available.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwpmRpm8RSTXmzxXW9ZGsMngaWrZ8yBeuFHQ&s',
    link: 'Store',
    color: '#1E3A5F'
  },
  {
    icon: Grid3X3,
    title: 'Welded Mesh',
    description: 'Standard and custom mesh fabrication. Fast production with precision welding for all reinforcement needs.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR43c9rI8oKqxi98x-jrR2Qtj0763NVOo0VjQ&s',
    link: 'Services',
    color: '#7B1F32'
  },
  {
    icon: Wrench,
    title: 'Custom Fabrication',
    description: 'Stirrups, hooks, L-bars, U-bars, reinforcement cages. Any custom shape from your specifications.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAN0VAjikVTgH-senqw8sonF95-xBCFG17w&s',
    link: 'Services',
    color: '#1E3A5F'
  },
  {
    icon: Upload,
    title: 'Upload Your Drawings',
    description: 'Send us your BBS or construction drawings for instant quotation. We handle the rest.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXMEtVbqWH0wfNKYpHdCOyv-YrMWUl93sIqg&s',
    link: 'Quote',
    color: '#7B1F32'
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Our Services</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-6">
            Complete Steel Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From raw materials to precision-fabricated reinforcement, we deliver quality at every step
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                index === 4 ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div 
                  className="absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: service.color }}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#7B1F32] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link to={createPageUrl(service.link)}>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-[#7B1F32] hover:text-[#5a1625] font-semibold group/btn"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Accent Line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: service.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}