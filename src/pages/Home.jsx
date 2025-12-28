import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ServicesOverview from '@/components/sections/ServicesOverview';
import MachinesSection from '@/components/sections/MachinesSection';
import DiametersSection from '@/components/sections/DiametersSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import CapabilitiesStrip from '@/components/sections/CapabilitiesStrip';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesOverview />
      <MachinesSection />
      <DiametersSection />
      <CertificationsSection />
      <ProjectsPreview />
      <CapabilitiesStrip />
      <CTASection
        title="Start your next steel order with Al Watania"
        subtitle="Upload drawings, request a quote, or talk to our team about your project timeline."
        primaryAction={{ label: 'Get a Quote', page: 'Quote' }}
        secondaryAction={{ label: 'Contact Us', page: 'Contact' }}
        bgColor="navy"
      />
    </div>
  );
}
