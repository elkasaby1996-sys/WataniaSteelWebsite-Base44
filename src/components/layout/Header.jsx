import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  X, 
  Phone, 
  ShoppingCart, 
  ChevronDown,
  Factory,
  FileText,
  Calculator,
  Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: 'Home', href: 'Home' },
  { name: 'About Us', href: 'About' },
  { name: 'Services', href: 'Services' },
  { name: 'Store', href: 'Store' },
  { name: 'Projects', href: 'Projects' },
  { name: 'FAQ', href: 'FAQ' },
  { name: 'Contact', href: 'Contact' },
];

const tools = [
  { name: 'Weight Calculator', href: 'Calculator', icon: Calculator },
  { name: 'Get a Quote', href: 'Quote', icon: FileText },
  { name: 'Order Online', href: 'Order', icon: Factory },
  { name: 'Order Management', href: 'https://watania-oms.netlify.app/', icon: Settings, external: true },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    return location.pathname.includes(href.toLowerCase());
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-lg shadow-lg shadow-gray-200/50"
    >
      {/* Top Bar */}
      <div className="bg-[#1A1A1A] text-white/80 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span>Mon - Thu: 6AM - 10PM | Sat: 6AM - 10PM</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Friday: Closed</span>
          </div>
          <a href="tel:+97444444444" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-4 h-4" />
            +974 4444 4444
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-3">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69353f43c0a0fc2b084bfd5a/96e0be8f8_download11111.png"
              alt="Al Watania Steel"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={createPageUrl(item.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-[#7B1F32] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Tools
                  <ChevronDown className="ml-1 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {tools.map((tool) => (
                  <DropdownMenuItem key={tool.name} asChild>
                    {tool.external ? (
                      <a href={tool.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer">
                        <tool.icon className="w-4 h-4 text-[#7B1F32]" />
                        {tool.name}
                      </a>
                    ) : (
                      <Link to={createPageUrl(tool.href)} className="flex items-center gap-2 cursor-pointer">
                        <tool.icon className="w-4 h-4 text-[#7B1F32]" />
                        {tool.name}
                      </Link>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Order Button */}
            <Link to={createPageUrl('Order')}>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative text-gray-700"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>

            {/* CTA Button */}
            <Link to={createPageUrl('Quote')} className="hidden md:block">
              <Button className="bg-[#7B1F32] hover:bg-[#5a1625] text-white px-6 rounded-xl shadow-lg shadow-[#7B1F32]/25">
                Get Quote
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-gray-700"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-6 border-b bg-[#7B1F32]">
                    <img 
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69353f43c0a0fc2b084bfd5a/96e0be8f8_download11111.png"
                      alt="Al Watania Steel"
                      className="h-16 w-auto object-contain"
                    />
                  </div>

                  {/* Mobile Nav */}
                  <nav className="flex-1 p-6 space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={createPageUrl(item.href)}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          isActive(item.href)
                            ? 'bg-[#7B1F32] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    
                    <div className="pt-4 border-t mt-4">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 mb-2">
                        Tools
                      </div>
                      {tools.map((tool) => (
                        tool.external ? (
                          <a
                            key={tool.name}
                            href={tool.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100"
                          >
                            <tool.icon className="w-5 h-5 text-[#7B1F32]" />
                            {tool.name}
                          </a>
                        ) : (
                          <Link
                            key={tool.name}
                            to={createPageUrl(tool.href)}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100"
                          >
                            <tool.icon className="w-5 h-5 text-[#7B1F32]" />
                            {tool.name}
                          </Link>
                        )
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t bg-gray-50">
                    <a href="tel:+97444444444" className="flex items-center gap-2 text-gray-700 mb-4">
                      <Phone className="w-5 h-5 text-[#7B1F32]" />
                      +974 4444 4444
                    </a>
                    <Link to={createPageUrl('Quote')} onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-[#7B1F32] hover:bg-[#5a1625] text-white rounded-xl">
                        Get a Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}