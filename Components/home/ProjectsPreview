import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    name: 'Lusail Stadium',
    location: 'Lusail, Qatar',
    category: 'Infrastructure',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_TTYXCl9vrm5bFiojYpjYJQDIOUVTNE7Buw&s'
  },
  {
    name: 'Doha Metro - Gold Line',
    location: 'Doha, Qatar',
    category: 'Infrastructure',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhgiJM5BcT_IiEk_tTlRXatoNoMfZRhiaQEw&s'
  },
  {
    name: 'West Bay Tower Complex',
    location: 'West Bay, Qatar',
    category: 'Commercial',
    image: 'https://www.sixense-group.com/wp-content/uploads/2022/01/west-bay-tower-1.jpg'
  },
  {
    name: 'Education City Campus',
    location: 'Al Rayyan, Qatar',
    category: 'Commercial',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFCcKg7E__L_qQ0AzbbEk5IzBEyzubEFR5yA&s'
  }
];

export default function ProjectsPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16"
        >
          <div>
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Our Portfolio</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Trusted by Qatar's most prestigious construction projects
            </p>
          </div>
          <Link to={createPageUrl('Projects')} className="mt-6 lg:mt-0">
            <Button className="bg-[#1E3A5F] hover:bg-[#152a45] text-white px-6 py-3 rounded-xl">
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              {/* Image */}
              <img 
                src={project.image} 
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block bg-[#7B1F32] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <div className="flex items-center text-white/70 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {project.location}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-[#7B1F32]/0 group-hover:bg-[#7B1F32]/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}