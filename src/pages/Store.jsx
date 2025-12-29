import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import ManualOrderPanel from '@/components/store/ManualOrderPanel';
import { fetchProductsWithVariants } from '@/services/productsService';
import { fetchSettings } from '@/services/settingsService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  ShoppingCart,
  ArrowRight,
  Package,
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

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDiameter, setSelectedDiameter] = useState('all');
  const [manualOpen, setManualOpen] = useState(searchParams.get('mode') === 'manual');
  const manualRef = useRef(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsWithVariants,
    initialData: [],
  });

  const { data: settings = {} } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
    initialData: {},
  });

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'manual') {
      setManualOpen(true);
    } else {
      setManualOpen(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (manualOpen && manualRef.current) {
      manualRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [manualOpen]);

  const displayProducts = useMemo(() => {
    return products.flatMap((product) => {
      const imageUrl = product.primary_image_url || product.product_images?.[0]?.image_url;
      const variants = product.product_variants?.length ? product.product_variants : [null];
      return variants.map((variant) => ({
        id: variant ? `${product.id}-${variant.id}` : product.id,
        productId: product.id,
        variantId: variant?.id || null,
        name: product.name,
        category: product.category,
        description: product.description,
        diameter_mm: variant?.diameter_mm ?? null,
        unit_type: variant?.unit_type ?? null,
        price_qr: variant?.price_qr ?? null,
        stock_qty: variant?.stock_qty ?? null,
        grade: variant?.grade ?? 'B500B',
        image_url: imageUrl,
      }));
    });
  }, [products]);

  const filteredProducts = displayProducts.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesDiameter =
      selectedDiameter === 'all' || product.diameter_mm === parseInt(selectedDiameter, 10);
    return matchesSearch && matchesCategory && matchesDiameter;
  });

  const openManualOrder = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('mode', 'manual');
    setSearchParams(nextParams, { replace: true });
  };

  const closeManualOrder = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('mode');
    setSearchParams(nextParams, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                className="pl-12 py-3 text-lg rounded-xl border-gray-200"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48 py-3 rounded-xl">
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
              <SelectTrigger className="w-full lg:w-48 py-3 rounded-xl">
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

            <Button
              onClick={openManualOrder}
              className="bg-[#7B1F32] hover:bg-[#5a1625] text-white rounded-xl"
            >
              Order Manually
            </Button>
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
                      <Badge 
                        className={`absolute top-4 right-4 ${
                          product.stock_qty === null || product.stock_qty > 0 ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      >
                        {product.stock_qty === null || product.stock_qty > 0 ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#7B1F32] transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.diameter_mm && (
                          <Badge variant="outline" className="bg-[#7B1F32]/10 text-[#7B1F32] border-[#7B1F32]/20">
                            Ø{product.diameter_mm}mm
                          </Badge>
                        )}
                        <Badge variant="outline" className="bg-[#1E3A5F]/10 text-[#1E3A5F] border-[#1E3A5F]/20">
                          {product.grade || 'B500B'}
                        </Badge>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        {product.price_qr && (
                          <div className="text-2xl font-black text-[#7B1F32]">
                            {product.price_qr.toLocaleString()} QAR
                            {product.unit_type && (
                              <span className="text-sm font-normal text-gray-500">/{product.unit_type}</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Lead Time */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                        <Clock className="w-4 h-4" />
                        <span>Standard lead time</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link to={createPageUrl('/store?mode=manual')} className="flex-1">
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

      {manualOpen && (
        <div ref={manualRef}>
          <ManualOrderPanel settings={settings} onBackToStore={closeManualOrder} />
        </div>
      )}

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
