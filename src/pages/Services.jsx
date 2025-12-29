import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Scissors, 
  Truck, 
  Grid3X3, 
  Wrench, 
  Upload,
  CheckCircle2,
  ArrowRight,
  Clock,
  Target,
  FileText
} from 'lucide-react';

const services = [
  {
    id: 'cut-bend',
    icon: Scissors,
    title: 'Cut & Bend Rebar',
    subtitle: 'Precision Fabrication',
    description: 'High-precision cutting and bending of reinforcement steel using state-of-the-art Schnell and Oscam machinery. We handle all shapes and sizes with exceptional accuracy.',
    features: [
      'All shape types: stirrups, hooks, L-bars, U-bars',
      'Diameter range: 8mm to 32mm',
      'Tight tolerance bending accuracy',
      'BBS (Bar Bending Schedule) processing',
      'High-speed automated production'
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    cta: 'Upload Drawings',
    ctaLink: 'Quote'
  },
  {
    id: 'straight-bar',
    icon: Truck,
    title: 'Straight Bar Supply',
    subtitle: 'Express Delivery',
    description: 'Fast and reliable straight bar delivery across Qatar. With our dedicated trailer fleet, we guarantee delivery within 1-2 hours for urgent orders.',
    features: [
      '1-2 hour express delivery available',
      'Multiple trailer capacity options',
      'Crane unloading service available',
      'All standard diameters in stock',
      'B500B certified steel grade'
    ],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    cta: 'Order Now',
    ctaLink: 'Store'
  },
  {
    id: 'mesh',
    icon: Grid3X3,
    title: 'Welded Mesh',
    subtitle: 'Reinforcement Mesh',
    description: 'Standard and custom welded mesh fabrication for slabs, walls, and foundations. Fast production with precision welding for consistent quality.',
    features: [
      'Standard mesh sizes available',
      'Custom mesh specifications',
      'Precision spot welding',
      'Fast production turnaround',
      'Delivery included'
    ],
    image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80',
    cta: 'Get Quote',
    ctaLink: 'Quote'
  },
  {
    id: 'custom',
    icon: Wrench,
    title: 'Custom Fabrication',
    subtitle: 'Any Shape, Any Size',
    description: 'Complex and custom steel fabrication for specialized requirements. From reinforcement cages to unique shapes, we manufacture to your exact specifications.',
    features: [
      'Stirrups and spirals',
      'Hooks and L-bars',
      'U-bars and special shapes',
      'Reinforcement cages',
      'Custom BBS processing'
    ],
    image: 'https://images.unsplash.com/photo-1565608087341-404b25492fee?w=800&q=80',
    cta: 'Contact Us',
    ctaLink: 'Contact'
  }
];

const deliveryOptions = [
  { name: 'Pick-up Truck', capacity: 'Up to 3 Tons' },
  { name: 'Trailer', capacity: 'Up to 27 Tons' },
  { name: 'Boom Truck', capacity: 'Up to 20 Tons' },
];

export default function Services() {
  const [activeService, setActiveService] = useState('cut-bend');

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#1A1A1A] to-[#2d2d2d]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Services"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Our Services</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Complete Steel Fabrication Solutions
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              From cut & bend rebar to custom fabrication, we deliver precision steel solutions 
              for every construction need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Navigation */}
      <section className="sticky top-20 z-30 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeService === service.id
                    ? 'bg-[#7B1F32] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <service.icon className="w-5 h-5" />
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: activeService === service.id ? 1 : 0,
                y: activeService === service.id ? 0 : 30,
                display: activeService === service.id ? 'grid' : 'none'
              }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#7B1F32] rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-[#7B1F32] text-sm font-semibold">{service.subtitle}</span>
                    <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                  </div>
                </div>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={createPageUrl(service.ctaLink)}>
                  <Button className="bg-[#7B1F32] hover:bg-[#5a1625] text-white px-8 py-6 text-lg rounded-xl">
                    {service.cta}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              {/* Image */}
              <div className="relative">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-[#1E3A5F] text-white p-6 rounded-2xl shadow-xl">
                  <Clock className="w-6 h-6 mb-2" />
                  <div className="text-2xl font-bold">Fast</div>
                  <div className="text-sm opacity-80">Turnaround</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#7B1F32] to-[#5a1625] rounded-3xl p-8 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <Upload className="w-16 h-16 mb-6" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Upload Your Drawings
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Send us your BBS (Bar Bending Schedule) or construction drawings 
                  and get an instant quotation. Our team will process your requirements 
                  and get back to you within hours.
                </p>
                <Link to={createPageUrl('Quote')}>
                  <Button
                    className="bg-white !text-[#691A2A] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl"
                    style={{ color: '#691A2A' }}
                  >
                    <FileText className="mr-2 w-5 h-5" />
                    Upload & Get Quote
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                  <div className="text-4xl font-black">PDF</div>
                  <div className="text-sm opacity-80 mt-2">Drawings</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                  <div className="text-4xl font-black">DWG</div>
                  <div className="text-sm opacity-80 mt-2">CAD Files</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                  <div className="text-4xl font-black">XLS</div>
                  <div className="text-sm opacity-80 mt-2">BBS Sheets</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white text-center">
                  <div className="text-4xl font-black">IMG</div>
                  <div className="text-sm opacity-80 mt-2">Photos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Logistics</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">Delivery Options</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveryOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#7B1F32] transition-colors"
              >
                <Truck className="w-10 h-10 text-[#7B1F32] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
                <p className="text-gray-600">{option.capacity}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
