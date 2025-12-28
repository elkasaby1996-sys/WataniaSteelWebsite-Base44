import React from 'react';
import { motion } from 'framer-motion';
import { 
  Factory, 
  Target, 
  Clock, 
  Award, 
  ShieldCheck,
  Leaf,
  Users,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

const milestones = [
  { year: '2002', title: 'Company Founded', description: 'Al Watania Steel established in Qatar' },
  { year: '2008', title: 'First Schnell Line', description: 'Introduced high-speed automated cutting' },
  { year: '2012', title: 'ISO Certification', description: 'Achieved ISO 9001 quality certification' },
  { year: '2015', title: 'Expansion', description: 'Increased capacity to 500 tons/day' },
  { year: '2020', title: '700 Tons Capacity', description: 'Reached current production capacity' },
  { year: '2022', title: '20 Years', description: 'Celebrating 20 years of excellence' },
];

const strengths = [
  { icon: Factory, title: '700 Tons/Day', description: 'Massive daily production capacity' },
  { icon: Target, title: 'Precision', description: 'High-speed machinery with tight tolerances' },
  { icon: Clock, title: '20+ Years', description: 'Two decades of industry experience' },
  { icon: ShieldCheck, title: 'Ashghal Approved', description: 'Certified vendor for public works' },
];

const certifications = [
  { icon: ShieldCheck, title: 'Ashghal Approved', subtitle: 'Public Works Authority', color: 'bg-[#7B1F32]' },
  { icon: Leaf, title: 'IGM Certified', subtitle: 'International Green Mark', color: 'bg-green-600' },
  { icon: Award, title: 'ISO 9001:2015', subtitle: 'Quality Management', color: 'bg-[#1E3A5F]' },
  { icon: Award, title: 'ISO 14001:2015', subtitle: 'Environmental Management', color: 'bg-emerald-600' },
  { icon: Award, title: 'ISO 45001:2018', subtitle: 'Health & Safety', color: 'bg-amber-600' },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#1A1A1A] to-[#2d2d2d]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Factory"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">About Us</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Building Qatar's Future Since 2002
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Al Watania Steel W.L.L. has been at the forefront of Qatar's construction industry, 
              providing high-quality steel fabrication solutions with precision, speed, and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Our Mission</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
                Great Quality • Fast • Precise
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our mission is simple yet powerful: deliver exceptional steel fabrication services 
                that meet the highest standards of quality, are delivered with speed, and maintain 
                precision in every detail. We believe in building lasting relationships with our 
                clients through trust, reliability, and excellence.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {['Quality', 'Speed', 'Precision'].map((value, index) => (
                  <div key={value} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-black text-[#7B1F32]">{index + 1}</div>
                    <div className="text-sm font-medium text-gray-600 mt-1">{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1565608087341-404b25492fee?w=800&q=80"
                alt="Steel Factory"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-[#7B1F32] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-black">20+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Strengths */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">Core Strengths</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strengths.map((strength, index) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-[#7B1F32]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <strength.icon className="w-8 h-8 text-[#7B1F32]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{strength.title}</h3>
                <p className="text-gray-600">{strength.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Our Journey</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">Company History</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden lg:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg inline-block">
                      <div className="text-3xl font-black text-[#7B1F32]">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mt-2">{milestone.title}</h3>
                      <p className="text-gray-600 mt-1">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#7B1F32] rounded-full hidden lg:block relative z-10" />
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Certifications</span>
            <h2 className="text-4xl font-bold text-white mt-4">Our Credentials</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
              >
                <div className={`${cert.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <cert.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-bold">{cert.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{cert.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Machinery Gallery */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Our Equipment</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">State-of-the-Art Machinery</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'https://www.schnellgroup.com/gallery-schnell/prodotti/Bar-Wiser-28-P0.png',
              'https://oscam.com/wp-content/uploads/2022/02/staffatrice3b.jpg',
              'https://oscam.com/wp-content/uploads/2022/05/LINEA-DI-TAGLIO01b.jpg',
              'https://www.schnellgroup.com/gallery-schnell/prodotti/Bar-Wiser-28-P0.png',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-YqDPhqwwsmDUnuhXeizFj0yb4Vmpl3t0AA&s',
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] group"
              >
                <img 
                  src={img} 
                  alt={`Machinery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}