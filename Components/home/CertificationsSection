import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Award, FileCheck, CheckCircle2 } from 'lucide-react';

const certifications = [
  {
    icon: ShieldCheck,
    title: 'Ashghal Approved',
    subtitle: 'Public Works Authority',
    color: 'bg-[#7B1F32]'
  },
  {
    icon: Leaf,
    title: 'IGM Certified',
    subtitle: 'International Green Mark',
    color: 'bg-green-600'
  },
  {
    icon: Award,
    title: 'ISO 9001:2015',
    subtitle: 'Quality Management',
    color: 'bg-[#1E3A5F]'
  },
  {
    icon: Award,
    title: 'ISO 14001:2015',
    subtitle: 'Environmental Management',
    color: 'bg-emerald-600'
  },
  {
    icon: Award,
    title: 'ISO 45001:2018',
    subtitle: 'Health & Safety',
    color: 'bg-amber-600'
  }
];

const conformityCerts = ['10mm', '12mm', '14mm', '16mm', '18mm', '20mm', '22mm', '25mm', '32mm', '40mm'];

export default function CertificationsSection() {
  return (
    <section className="py-24 bg-[#1A1A1A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Certifications</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
            Quality You Can Trust
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Internationally certified and locally approved for the highest standards in steel fabrication
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all group"
            >
              <div className={`${cert.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <cert.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{cert.title}</h3>
              <p className="text-gray-400 text-sm">{cert.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Steel Grade & Conformity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#7B1F32]/20 to-[#1E3A5F]/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Steel Grade */}
            <div className="text-center lg:text-left lg:border-r border-white/20 lg:pr-12">
              <div className="text-[#7B1F32] font-semibold text-sm uppercase tracking-wide mb-2">Steel Grade</div>
              <div className="text-6xl lg:text-7xl font-black text-white">B500B</div>
              <div className="text-gray-400 mt-2">High-Strength Reinforcement Steel</div>
            </div>

            {/* Conformity Certificates */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <FileCheck className="w-5 h-5 text-[#7B1F32]" />
                <span className="text-white font-semibold">Conformity Certificates Available</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {conformityCerts.map((size) => (
                  <div 
                    key={size}
                    className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors cursor-default"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-white font-medium">{size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}