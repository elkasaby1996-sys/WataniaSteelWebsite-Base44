import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, Scale, Calendar } from 'lucide-react';

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'residential', label: 'Residential' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'industrial', label: 'Industrial' },
];

// Sample projects for display
const sampleProjects = [
  {
    id: '1',
    name: 'Lusail Stadium',
    client: 'Supreme Committee',
    location: 'Lusail, Qatar',
    description: 'Steel reinforcement supply for the iconic 80,000-seat stadium',
    tonnage_supplied: 15000,
    completion_year: 2022,
    category: 'infrastructure',
    featured: true,
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_TTYXCl9vrm5bFiojYpjYJQDIOUVTNE7Buw&s']
  },
  {
    id: '2',
    name: 'Doha Metro - Gold Line',
    client: 'Qatar Rail',
    location: 'Doha, Qatar',
    description: 'Cut & bend rebar for metro stations and tunnels',
    tonnage_supplied: 8500,
    completion_year: 2021,
    category: 'infrastructure',
    featured: true,
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhgiJM5BcT_IiEk_tTlRXatoNoMfZRhiaQEw&s']
  },
  {
    id: '3',
    name: 'West Bay Tower Complex',
    client: 'Qatari Diar',
    location: 'West Bay, Qatar',
    description: 'High-rise commercial tower reinforcement',
    tonnage_supplied: 5200,
    completion_year: 2023,
    category: 'commercial',
    featured: true,
    images: ['https://www.sixense-group.com/wp-content/uploads/2022/01/west-bay-tower-1.jpg']
  },
  {
    id: '4',
    name: 'Education City Campus',
    client: 'Qatar Foundation',
    location: 'Al Rayyan, Qatar',
    description: 'University buildings and facilities reinforcement',
    tonnage_supplied: 7800,
    completion_year: 2020,
    category: 'commercial',
    featured: false,
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFCcKg7E__L_qQ0AzbbEk5IzBEyzubEFR5yA&s']
  },
  {
    id: '5',
    name: 'Msheireb Downtown',
    client: 'Msheireb Properties',
    location: 'Doha, Qatar',
    description: 'Smart city development reinforcement supply',
    tonnage_supplied: 12000,
    completion_year: 2019,
    category: 'residential',
    featured: false,
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9-0oXCpoBL7LfF1TjDSu33cPlPkDf9S__Q&s']
  },
  {
    id: '6',
    name: 'Industrial Area Warehouse',
    client: 'Qatar Logistics',
    location: 'Industrial Area, Qatar',
    description: 'Large-scale warehouse construction',
    tonnage_supplied: 2500,
    completion_year: 2023,
    category: 'industrial',
    featured: false,
    images: ['https://www.barwa.com.qa/publishingimages/projects/3594e4a8a69c40aab625ea19ffcd6edf.jpg']
  },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list(),
    initialData: [],
  });

  const allProjects = projects.length > 0 ? projects : sampleProjects;

  const filteredProjects = selectedCategory === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === selectedCategory);

  const totalTonnage = allProjects.reduce((sum, p) => sum + (p.tonnage_supplied || 0), 0);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[#1A1A1A] to-[#2d2d2d]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1624457664547-2d8a7dd89c5a?w=1920&q=80"
            alt="Projects"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Portfolio</span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">
              Trusted by Qatar's most prestigious construction projects. 
              See how we've contributed to building the nation.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-3xl font-black text-white">{allProjects.length}+</div>
                <div className="text-gray-400 text-sm">Completed Projects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-3xl font-black text-white">{(totalTonnage / 1000).toFixed(0)}K+</div>
                <div className="text-gray-400 text-sm">Tons Supplied</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-3xl font-black text-white">20+</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-white border-b shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-[#7B1F32] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.images?.[0] || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
                  {project.featured && (
                    <Badge className="absolute top-4 left-4 bg-[#7B1F32]">Featured</Badge>
                  )}
                  
                  <Badge className="absolute top-4 right-4 bg-[#1E3A5F]">
                    {project.category?.replace('_', ' ')}
                  </Badge>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                    <div className="flex items-center text-white/80 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 line-clamp-2">{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {project.tonnage_supplied && (
                      <div className="flex items-center gap-2 text-sm">
                        <Scale className="w-4 h-4 text-[#7B1F32]" />
                        <span className="text-gray-700">
                          <span className="font-bold">{project.tonnage_supplied.toLocaleString()}</span> tons
                        </span>
                      </div>
                    )}
                    {project.completion_year && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#7B1F32]" />
                        <span className="text-gray-700">{project.completion_year}</span>
                      </div>
                    )}
                    {project.client && (
                      <div className="flex items-center gap-2 text-sm col-span-2">
                        <Building2 className="w-4 h-4 text-[#7B1F32]" />
                        <span className="text-gray-700">{project.client}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
