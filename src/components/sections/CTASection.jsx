import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTASection({ 
  title, 
  subtitle, 
  primaryAction, 
  secondaryAction,
  bgColor = 'dark' 
}) {
  const bgClasses = {
    dark: 'bg-[#1A1A1A]',
    maroon: 'bg-gradient-to-r from-[#7B1F32] to-[#5a1625]',
    navy: 'bg-gradient-to-r from-[#1E3A5F] to-[#152a45]'
  };

  return (
    <section className={`py-16 ${bgClasses[bgColor]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-300 lg:text-lg mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          {primaryAction && (
            <Link to={createPageUrl(primaryAction.page)}>
              <Button className="bg-[#7B1F32] hover:bg-[#5a1625] text-white px-8 py-6 text-lg rounded-xl">
                {primaryAction.icon && <primaryAction.icon className="mr-2 w-5 h-5" />}
                {primaryAction.label}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          )}
          {secondaryAction && (
            <Link to={createPageUrl(secondaryAction.page)}>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-6 text-lg rounded-xl"
              >
                {secondaryAction.icon && <secondaryAction.icon className="mr-2 w-5 h-5" />}
                {secondaryAction.label}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}