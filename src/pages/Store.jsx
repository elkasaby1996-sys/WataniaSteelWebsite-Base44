import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  ShoppingCart,
  ArrowRight,
  Package,
  Truck,
  Clock,
  X
} from 'lucide-react';

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'rebar', label: 'Rebar by Diameter' },
  { value: 'straight_bar', label: 'Straight Bars' },
  { value: 'cut_bend', label: 'Cut & Bend Shapes' },
  { value: 'mesh', label: 'Mesh Sheets' },
  { value: 'accessories', label: 'Accessories' },
];

const diameters = [8, 10, 12, 14, 16, 18, 20, 22, 25, 32];

// Sample products for display
const sampleProducts = [
  { id: '1', name: 'Straight Rebar 8mm', category: 'straight_bar', diameter: 8, price_per_ton: 2500, lead_time: '1-2 hours', material: 'B500B', in_stock: true, featured: true },
  { id: '2', name: 'Straight Rebar 10mm', category: 'straight_bar', diameter: 10, price_per_ton: 2450, lead_time: '1-2 hours', material: 'B500B', in_stock: true, featured: true },
  { id: '3', name: 'Straight Rebar 12mm', category: 'straight_bar', diameter: 12, price_per_ton: 2400, lead_time: '1-2 hours', material: 'B500B', in_stock: true, featured: true },
  { id: '4', name: 'Straight Rebar 16mm', category: 'straight_bar', diameter: 16, price_per_ton: 2350, lead_time: '1-2 hours', material: 'B500B', in_stock: true, featured: false },
  { id: '5', name: 'Straight Rebar 20mm', category: 'straight_bar', diameter: 20, price_per_ton: 2400, lead_time: '1-2 hours', material: 'B500B', in_stock: true, featured: false },
  { id: '6', name: 'Straight Rebar 25mm', category: 'straight_bar', diameter: 25, price_per_ton: 2500, lead_time: '1-2 hours', material: 'B500B', in_stock: true, featured: false },
  { id: '7', name: 'Straight Rebar 32mm', category: 'straight_bar', diameter: 32, price_per_ton: 2600, lead_time: '1-2 hours', material: 'B500B', in_stock: true, featured: false },
  { id: '8', name: 'Cut & Bend - Stirrups', category: 'cut_bend', diameter: 10, price_per_ton: 3200, lead_time: '2-3 days', material: 'B500B', in_stock: true, featured: true },
  { id: '9', name: 'Cut & Bend - L-Bars', category: 'cut_bend', diameter: 12, price_per_ton: 3100, lead_time: '2-3 days', material: 'B500B', in_stock: true, featured: false },
  { id: '10', name: 'Welded Mesh Sheet 4x8', category: 'mesh', diameter: 8, price_per_piece: 150, lead_time: '1-2 days', material: 'B500B', in_stock: true, featured: true },
  { id: '11', name: 'Welded Mesh Sheet 4x8', category: 'mesh', diameter: 10, price_per_piece: 200, lead_time: '1-2 days', material: 'B500B', in_stock: true, featured: false },
  { id: '12', name: 'Binding Wire', category: 'accessories', price_per_ton: 3500, lead_time: 'Same day', material: 'Steel', in_stock: true, featured: false },
  { id: '13', name: 'Concrete Spacers (100pcs)', category: 'accessories', price_per_piece: 50, lead_time: 'Same day', in_stock: true, featured: false },
];

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedDiameter, setSelectedDiameter] = useState(searchParams.get('diameter') || 'all');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  // Use database products only
  const allProducts = products;

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesDiameter = selectedDiameter === 'all' || product.diameter === parseInt(selectedDiameter);
    return matchesSearch && matchesCategory && matchesDiameter;
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDiameter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#2d2d2d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Shop</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">
              Online Store
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Browse our complete range of steel products. Order online for fast delivery across Qatar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-white border-b shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg rounded-xl border-gray-200"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48 py-6 rounded-xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Diameter Filter */}
            <Select value={selectedDiameter} onValueChange={setSelectedDiameter}>
              <SelectTrigger className="w-full lg:w-48 py-6 rounded-xl">
                <SelectValue placeholder="Diameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                {diameters.map((dia) => (
                  <SelectItem key={dia} value={dia.toString()}>
                    {dia}mm
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {(selectedCategory !== 'all' || selectedDiameter !== 'all' || searchQuery) && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Diameter Quick Select */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">Quick Select:</span>
            {diameters.map((dia) => (
              <button
                key={dia}
                onClick={() => setSelectedDiameter(dia.toString())}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedDiameter === dia.toString()
                    ? 'bg-[#7B1F32] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dia}mm
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6">
                  <Skeleton className="h-40 w-full mb-4 rounded-xl" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                  >
                    {/* Product Image / Visual */}
                    <div className="relative h-40 overflow-hidden">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center h-full">
                          {product.diameter && (
                            <div 
                              className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 rounded-full shadow-inner"
                              style={{ 
                                width: `${Math.min(product.diameter * 3, 100)}px`, 
                                height: `${Math.min(product.diameter * 3, 100)}px` 
                              }}
                            />
                          )}
                        </div>
                      )}
                      {product.featured && (
                        <Badge className="absolute top-4 left-4 bg-[#7B1F32]">Featured</Badge>
                      )}
                      <Badge 
                        className={`absolute top-4 right-4 ${
                          product.in_stock ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      >
                        {product.in_stock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#7B1F32] transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.diameter && (
                          <Badge variant="outline" className="bg-[#7B1F32]/10 text-[#7B1F32] border-[#7B1F32]/20">
                            Ø{product.diameter}mm
                          </Badge>
                        )}
                        <Badge variant="outline" className="bg-[#1E3A5F]/10 text-[#1E3A5F] border-[#1E3A5F]/20">
                          {product.material}
                        </Badge>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        {product.price_per_ton && (
                          <div className="text-2xl font-black text-[#7B1F32]">
                            {product.price_per_ton.toLocaleString()} QAR
                            <span className="text-sm font-normal text-gray-500">/ton</span>
                          </div>
                        )}
                        {product.price_per_piece && !product.price_per_ton && (
                          <div className="text-2xl font-black text-[#7B1F32]">
                            {product.price_per_piece.toLocaleString()} QAR
                            <span className="text-sm font-normal text-gray-500">/piece</span>
                          </div>
                        )}
                      </div>

                      {/* Lead Time */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                        <Clock className="w-4 h-4" />
                        <span>{product.lead_time}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link to={createPageUrl('Order')} className="flex-1">
                          <Button 
                            className="w-full bg-[#7B1F32] hover:bg-[#5a1625] text-white rounded-xl"
                          >
                            <ShoppingCart className="mr-2 w-4 h-4" />
                            Order Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Custom Fabrication?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Upload your drawings and get a custom quote.
          </p>
          <Link to={createPageUrl('Quote')}>
            <Button className="bg-[#7B1F32] hover:bg-[#5a1625] text-white px-8 py-6 text-lg rounded-xl">
              Get Custom Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
