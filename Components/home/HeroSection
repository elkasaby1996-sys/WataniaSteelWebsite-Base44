import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Layers } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')`
          }} />

        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="my-20 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#7B1F32]/20 border border-[#7B1F32]/40 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#7B1F32] rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm font-semibold text-left normal-case tracking-wide">Ashghal Approved Vendor • Since 2002

            </span>
          </div>

          {/* Headline */}
          <h1 className="text-fuchsia-50 mb-6 text-2xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl">High-Precision Cut & Bend Rebar Solutions in Qatar



          </h1>

          {/* Subheadline */}
          <p className="text-gray-300 mb-6 text-lg font-semibold leading-relaxed sm:text-xl max-w-2xl">700 Tons Daily Capacity • Fast Delivery • Premium Quality B500B Steel


          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link to={createPageUrl('Store')}>
              <Button
                size="lg"
                className="bg-[#7B1F32] hover:bg-[#5a1625] text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl shadow-[#7B1F32]/30 transition-all duration-300 hover:scale-105">

                Order Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Quote')}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300">

                <FileText className="mr-2 w-5 h-5" />
                Get a Quote
              </Button>
            </Link>
            <Link to={createPageUrl('Services')}>
              <Button
                size="lg"
                variant="ghost" className="text-slate-50 px-8 py-6 text-lg font-medium rounded-xl inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 hover:text-white hover:bg-white/10 transition-all duration-300">


                <Layers className="mr-2 w-5 h-5" />
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      
      {/* Animated Steel Lines */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block z-5">
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) =>
          <div
            key={i}
            className="w-2 bg-gradient-to-b from-[#7B1F32]/60 to-[#1E3A5F]/60 rounded-full"
            style={{
              height: `${200 + i * 50}px`,
              animationDelay: `${i * 0.2}s`,
              animation: 'pulse 2s ease-in-out infinite'
            }} />

          )}
        </div>
      </div>
    </section>);

}