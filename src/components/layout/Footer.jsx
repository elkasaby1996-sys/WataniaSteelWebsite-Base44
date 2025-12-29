import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Factory, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const quickLinks = [
  { name: 'About Us', href: 'About' },
  { name: 'Services', href: 'Services' },
  { name: 'Online Store', href: 'Store' },
  { name: 'Projects', href: 'Projects' },
  { name: 'FAQ', href: 'FAQ' },
  { name: 'Contact', href: 'Contact' },
];

const services = [
  'Cut & Bend Rebar',
  'Straight Bar Supply',
  'Welded Mesh',
  'Custom Fabrication',
  'Express Delivery',
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[#7B1F32] to-[#5a1625] rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">Ready to Start Your Project?</h3>
              <p className="text-white/80">Get a quote within 24 hours for your steel requirements</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to={createPageUrl('Quote')}>
                <Button className="bg-white text-[rgb(105,26,42)] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl">
                  Get a Quote
                </Button>
              </Link>
              <a href="tel:+97444444444">
                <Button variant="outline" className="border-white text-[rgb(105,26,42)] hover:bg-white hover:text-[rgb(105,26,42)] px-8 py-6 text-lg font-semibold rounded-xl">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69353f43c0a0fc2b084bfd5a/96e0be8f8_download11111.png"
                alt="Al Watania Steel"
                className="h-20 w-auto object-contain mb-4"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Qatar's premier steel fabrication company since 2002. Delivering high-quality cut & bend rebar solutions with precision and speed.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#7B1F32] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#7B1F32] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#7B1F32] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={createPageUrl(link.href)} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-gray-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7B1F32] mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Industrial Area, Street 44<br />
                  Doha, Qatar
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#7B1F32] flex-shrink-0" />
                <a href="tel:+97444444444" className="text-gray-400 hover:text-white transition-colors">
                  +974 4444 4444
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#7B1F32] flex-shrink-0" />
                <a href="mailto:info@alwataniasteel.qa" className="text-gray-400 hover:text-white transition-colors">
                  info@alwataniasteel.qa
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#7B1F32] mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>Mon - Thu: 6AM - 10PM</p>
                  <p>Saturday: 6AM - 10PM</p>
                  <p className="text-[#7B1F32]">Friday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Al Watania Steel W.L.L. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
