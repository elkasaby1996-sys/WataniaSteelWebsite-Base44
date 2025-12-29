import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ServicesOverview from '@/components/sections/ServicesOverview';
import MachinesSection from '@/components/sections/MachinesSection';
import DiametersSection from '@/components/sections/DiametersSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import CapabilitiesStrip from '@/components/sections/CapabilitiesStrip';
import CapabilitiesHighlight from '@/components/sections/CapabilitiesHighlight';

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
      <CapabilitiesHighlight />
    </div>
  );
}
