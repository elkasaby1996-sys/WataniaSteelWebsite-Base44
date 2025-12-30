import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  fetchAdminProfile,
  signInAdmin,
  signOutAdmin,
  fetchAdminProducts,
  saveProduct,
  saveVariant,
  removeVariant,
  uploadProductImage,
  setPrimaryImage,
  removeProductImage,
  seedSampleProducts,
} from '@/services/adminService';
import { fetchSettings, upsertSetting } from '@/services/settingsService';
import { fetchOrders, fetchOrderDetails, getOrderFileUrl, updateOrderStatus } from '@/services/ordersService';

const categories = ['rebar', 'mesh', 'services', 'accessories', 'cut_bend'];
const unitTypes = ['ton', 'piece', 'bundle', 'sheet'];
const orderStatuses = [
  'pending_review',
  'confirmed',
  'in_production',
  'ready',
  'out_for_delivery',
  'delivered',
  'cancelled',
];

export default function Admin() {
  const [authLoading, setAuthLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState({});
  const [productForm, setProductForm] = useState({
    id: null,
    name: '',
    slug: '',
    description: '',
    category: 'rebar',
    active: true,
  });
  const [variantForm, setVariantForm] = useState({
    id: null,
    product_id: '',
    diameter_mm: '',
    unit_type: 'ton',
    price_qr: '',
    stock_qty: '',
    grade: 'B500B',
    active: true,
  });
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderFileUrls, setOrderFileUrls] = useState({});
  const [orderFileErrors, setOrderFileErrors] = useState({});
  const [loadingOrderFiles, setLoadingOrderFiles] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId),
    [products, selectedProductId]
  );

  useEffect(() => {
    const loadProfile = async () => {
      setAuthLoading(true);
      try {
        const adminProfile = await fetchAdminProfile();
        if (adminProfile) {
          setAdminUser(adminProfile.user);
          setProfile(adminProfile.profile);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setAuthLoading(false);
      }
    };
    loadProfile();
  }, []);

  const loadAdminData = async () => {
    setSaving(true);
    try {
      const [productData, settingsData, ordersData] = await Promise.all([
        fetchAdminProducts(),
        fetchSettings(),
        fetchOrders(),
      ]);
      setProducts(productData);
      setSettings(settingsData);
      setOrders(ordersData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (adminUser) {
      loadAdminData();
    }
  }, [adminUser]);

  useEffect(() => {
    const loadOrderFiles = async () => {
      if (!orderDetails?.order_files?.length) {
        setOrderFileUrls({});
        setOrderFileErrors({});
        return;
      }
      setLoadingOrderFiles(true);
      try {
        const entries = await Promise.all(
          orderDetails.order_files.map(async (file) => {
            try {
              const url = await getOrderFileUrl(file.file_path, {
                orderId: orderDetails.id,
                fileName: file.file_name,
              });
              return { id: file.id, url, error: null };
            } catch (error) {
              return { id: file.id, url: null, error: error.message };
            }
          })
        );
        setOrderFileUrls(
          entries.reduce((acc, entry) => {
            acc[entry.id] = entry.url;
            return acc;
          }, {})
        );
        setOrderFileErrors(
          entries.reduce((acc, entry) => {
            acc[entry.id] = entry.error;
            return acc;
          }, {})
        );
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadingOrderFiles(false);
      }
    };

    loadOrderFiles();
  }, [orderDetails]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const result = await signInAdmin(loginForm.email, loginForm.password);
      setAdminUser(result.user);
      setProfile(result.profile);
      toast.success('Welcome back!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setAdminUser(null);
    setProfile(null);
  };

  const handleSaveProduct = async () => {
    setSaving(true);
    try {
      const payload = {
        ...productForm,
        slug: productForm.slug.trim(),
      };
      const saved = await saveProduct(payload);
      toast.success('Product saved');
      setProducts((prev) => {
        const existing = prev.find((item) => item.id === saved.id);
        if (existing) {
          return prev.map((item) => (item.id === saved.id ? { ...item, ...saved } : item));
        }
        return [saved, ...prev];
      });
      setProductForm({
        id: null,
        name: '',
        slug: '',
        description: '',
        category: 'rebar',
        active: true,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = (product) => {
    setProductForm({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      category: product.category || 'rebar',
      active: product.active,
    });
  };

  const handleSaveVariant = async () => {
    if (!variantForm.product_id) {
      toast.error('Select a product first.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...variantForm,
        diameter_mm: variantForm.diameter_mm ? Number(variantForm.diameter_mm) : null,
        price_qr: Number(variantForm.price_qr),
        stock_qty: variantForm.stock_qty ? Number(variantForm.stock_qty) : null,
      };
      const saved = await saveVariant(payload);
      toast.success('Variant saved');
      setProducts((prev) =>
        prev.map((product) => {
          if (product.id !== saved.product_id) return product;
          const updatedVariants = product.product_variants || [];
          const existing = updatedVariants.find((variant) => variant.id === saved.id);
          if (existing) {
            return {
              ...product,
              product_variants: updatedVariants.map((variant) =>
                variant.id === saved.id ? saved : variant
              ),
            };
          }
          return { ...product, product_variants: [saved, ...updatedVariants] };
        })
      );
      setVariantForm({
        id: null,
        product_id: variantForm.product_id,
        diameter_mm: '',
        unit_type: 'ton',
        price_qr: '',
        stock_qty: '',
        grade: 'B500B',
        active: true,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditVariant = (variant) => {
    setVariantForm({
      id: variant.id,
      product_id: variant.product_id,
      diameter_mm: variant.diameter_mm || '',
      unit_type: variant.unit_type,
      price_qr: variant.price_qr || '',
      stock_qty: variant.stock_qty ?? '',
      grade: variant.grade || 'B500B',
      active: variant.active,
    });
  };

  const handleRemoveVariant = async (variantId) => {
    setSaving(true);
    try {
      await removeVariant(variantId);
      setProducts((prev) =>
        prev.map((product) => ({
          ...product,
          product_variants: (product.product_variants || []).filter((variant) => variant.id !== variantId),
        }))
      );
      toast.success('Variant removed');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !selectedProductId) return;
    setUploadingImage(true);
    try {
      const image = await uploadProductImage(selectedProductId, file);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProductId
            ? { ...product, product_images: [image, ...(product.product_images || [])] }
            : product
        )
      );
      toast.success('Image uploaded');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSetPrimaryImage = async (imageUrl) => {
    if (!selectedProductId) return;
    try {
      await setPrimaryImage(selectedProductId, imageUrl);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProductId ? { ...product, primary_image_url: imageUrl } : product
        )
      );
      toast.success('Primary image updated');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveImage = async (image) => {
    try {
      await removeProductImage(image.id, image.image_url);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProductId
            ? {
                ...product,
                product_images: (product.product_images || []).filter((img) => img.id !== image.id),
              }
            : product
        )
      );
      toast.success('Image removed');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await Promise.all([
        upsertSetting('delivery_fees', settings.delivery_fees || {}),
        upsertSetting('express_fee', settings.express_fee || {}),
        upsertSetting('cut_bend_fee', settings.cut_bend_fee || {}),
      ]);
      toast.success('Settings updated');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleOrderSelect = async (orderId) => {
    setSelectedOrderId(orderId);
    if (!orderId) {
      setOrderDetails(null);
      return;
    }
    try {
      const details = await fetchOrderDetails(orderId);
      setOrderDetails(details);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleStatusChange = async (status) => {
    if (!orderDetails) return;
    try {
      await updateOrderStatus(orderDetails.id, status);
      setOrderDetails({ ...orderDetails, status });
      setOrders((prev) => prev.map((order) => (order.id === orderDetails.id ? { ...order, status } : order)));
      toast.success('Order status updated');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSeed = async () => {
    try {
      const result = await seedSampleProducts();
      if (!result.created) {
        toast.message('Sample products already exist.');
        return;
      }
      toast.success('Sample products added.');
      loadAdminData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen pt-24 bg-gray-50" />;
  }

  if (!adminUser) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Admin Login</h2>
          <p className="text-gray-600 text-center mb-6">Sign in with your admin account.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
              className="py-3 rounded-xl"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
              className="py-3 rounded-xl"
              required
            />
            <Button type="submit" className="w-full bg-[#7B1F32] hover:bg-[#5a1625] py-6 rounded-xl" disabled={saving}>
              {saving ? 'Signing in...' : 'Login'}
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#2d2d2d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Admin</span>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-2">
                  Store Management
                </h1>
                <p className="text-gray-400 max-w-2xl">
                  Welcome {profile?.full_name || adminUser.email}. Manage products, orders, and settings.
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="text-white border-white/30 hover:text-black">
                Sign Out
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="pt-6">
            <TabsList className="grid grid-cols-5 w-full max-w-3xl">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="products">
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Products</h2>
                  {import.meta.env.DEV && (
                    <Button variant="outline" onClick={handleSeed}>
                      Add sample products
                    </Button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Add / Edit Product</h3>
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={productForm.name}
                        onChange={(event) => setProductForm({ ...productForm, name: event.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug</Label>
                      <Input
                        value={productForm.slug}
                        onChange={(event) => setProductForm({ ...productForm, slug: event.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={productForm.category}
                        onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={productForm.description}
                        onChange={(event) => setProductForm({ ...productForm, description: event.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label>Active</Label>
                      <Button
                        type="button"
                        variant={productForm.active ? 'default' : 'outline'}
                        onClick={() => setProductForm({ ...productForm, active: !productForm.active })}
                      >
                        {productForm.active ? 'Active' : 'Inactive'}
                      </Button>
                    </div>
                    <Button onClick={handleSaveProduct} disabled={saving || !productForm.name || !productForm.slug}>
                      {saving ? 'Saving...' : 'Save Product'}
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Existing Products</h3>
                    <div className="space-y-3 max-h-[420px] overflow-auto">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="border rounded-xl p-4 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-semibold text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.category}</div>
                            {!product.active && <Badge variant="outline" className="mt-2">Inactive</Badge>}
                          </div>
                          <Button variant="outline" onClick={() => handleEditProduct(product)}>
                            Edit
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="variants">
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Variants</h2>
                <div className="space-y-4">
                  <Label>Product</Label>
                  <Select value={selectedProductId} onValueChange={(value) => {
                    setSelectedProductId(value);
                    setVariantForm((prev) => ({ ...prev, product_id: value }));
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Add / Edit Variant</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Diameter (mm)</Label>
                        <Input
                          value={variantForm.diameter_mm}
                          onChange={(event) => setVariantForm({ ...variantForm, diameter_mm: event.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Unit Type</Label>
                        <Select
                          value={variantForm.unit_type}
                          onValueChange={(value) => setVariantForm({ ...variantForm, unit_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {unitTypes.map((unit) => (
                              <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Price (QAR)</Label>
                        <Input
                          type="number"
                          value={variantForm.price_qr}
                          onChange={(event) => setVariantForm({ ...variantForm, price_qr: event.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Stock Qty</Label>
                        <Input
                          type="number"
                          value={variantForm.stock_qty}
                          onChange={(event) => setVariantForm({ ...variantForm, stock_qty: event.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Grade</Label>
                      <Input
                        value={variantForm.grade}
                        onChange={(event) => setVariantForm({ ...variantForm, grade: event.target.value })}
                      />
                    </div>
                    <Button onClick={handleSaveVariant} disabled={saving || !variantForm.price_qr}>
                      {saving ? 'Saving...' : 'Save Variant'}
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Existing Variants</h3>
                    <div className="space-y-3 max-h-[420px] overflow-auto">
                      {(selectedProduct?.product_variants || []).map((variant) => (
                        <div key={variant.id} className="border rounded-xl p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-gray-900">
                                {variant.diameter_mm ? `${variant.diameter_mm}mm` : 'Custom'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {variant.price_qr} QAR/{variant.unit_type}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" onClick={() => handleEditVariant(variant)}>
                                Edit
                              </Button>
                              <Button variant="outline" onClick={() => handleRemoveVariant(variant.id)}>
                                Remove
                              </Button>
                            </div>
                          </div>
                          {!variant.active && <Badge variant="outline">Inactive</Badge>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="images">
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Product Images</h2>
                <div className="space-y-4">
                  <Label>Product</Label>
                  <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label>Upload Image</Label>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={!selectedProductId || uploadingImage} />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {(selectedProduct?.product_images || []).map((image) => (
                    <div key={image.id} className="border rounded-xl p-3 space-y-3">
                      <img src={image.image_url} alt="Product" className="w-full h-32 object-cover rounded-lg" />
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleSetPrimaryImage(image.image_url)}>
                          Set Primary
                        </Button>
                        <Button variant="outline" onClick={() => handleRemoveImage(image)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Delivery Fees & Express</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {['trailer', 'crane', 'pickup'].map((key) => (
                    <div key={key} className="space-y-2">
                      <Label>{key}</Label>
                      <Input
                        type="number"
                        value={settings.delivery_fees?.[key] ?? ''}
                        onChange={(event) =>
                          setSettings({
                            ...settings,
                            delivery_fees: {
                              ...(settings.delivery_fees || {}),
                              [key]: Number(event.target.value),
                            },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Express Enabled</Label>
                    <Select
                      value={settings.express_fee?.enabled ? 'yes' : 'no'}
                      onValueChange={(value) =>
                        setSettings({
                          ...settings,
                          express_fee: {
                            ...(settings.express_fee || {}),
                            enabled: value === 'yes',
                          },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Enabled" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Express Fee (QAR)</Label>
                    <Input
                      type="number"
                      value={settings.express_fee?.fee ?? ''}
                      onChange={(event) =>
                        setSettings({
                          ...settings,
                          express_fee: {
                            ...(settings.express_fee || {}),
                            fee: Number(event.target.value),
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cut-and-Bend Fee (QAR)</Label>
                    <Input
                      type="number"
                      value={settings.cut_bend_fee?.fee ?? ''}
                      onChange={(event) =>
                        setSettings({
                          ...settings,
                          cut_bend_fee: {
                            ...(settings.cut_bend_fee || {}),
                            fee: Number(event.target.value),
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleSaveSettings} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Orders</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3 max-h-[520px] overflow-auto">
                    {orders.map((order) => (
                      <button
                        key={order.id}
                        type="button"
                        onClick={() => handleOrderSelect(order.id)}
                        className={`w-full text-left border rounded-xl p-4 transition ${
                          selectedOrderId === order.id ? 'border-[#7B1F32] bg-[#7B1F32]/5' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">{order.order_number}</div>
                            <div className="text-sm text-gray-500">{order.company_name || order.contact_name}</div>
                          </div>
                          <Badge variant="outline">{order.status}</Badge>
                        </div>
                        <div className="text-xs text-gray-400 mt-2">{new Date(order.created_at).toLocaleString()}</div>
                      </button>
                    ))}
                  </div>
                  <div className="border rounded-2xl p-6">
                    {!orderDetails ? (
                      <div className="text-gray-500">Select an order to view details.</div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-semibold text-gray-900">{orderDetails.order_number}</div>
                            <div className="text-sm text-gray-500">
                              {orderDetails.company_name || orderDetails.contact_name}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {orderDetails.created_at ? new Date(orderDetails.created_at).toLocaleString() : '—'}
                            </div>
                          </div>
                          <Badge variant="outline">{orderDetails.status}</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900">Customer</div>
                            <div>Name: {orderDetails.contact_name}</div>
                            <div>Company: {orderDetails.company_name || '—'}</div>
                            <div>Email: {orderDetails.customer_email || '—'}</div>
                            <div>Phone: {orderDetails.phone || '—'}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900">Delivery</div>
                            <div>Type: {orderDetails.delivery_type || '—'}</div>
                            <div>Address: {orderDetails.delivery_address || '—'}</div>
                            <div>Preferred Date: {orderDetails.preferred_delivery_date || '—'}</div>
                            <div>Express: {orderDetails.express ? 'Yes' : 'No'}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900">Payment</div>
                            {(() => {
                              const subtotal = Number(orderDetails.subtotal_qr ?? 0);
                              const derivedSubtotal = (orderDetails.order_items || [])
                                .map((item) => Number(item.line_total_qr))
                                .filter((value) => Number.isFinite(value))
                                .reduce((sum, value) => sum + value, subtotal || 0);
                              const deliveryFee = Number(orderDetails.delivery_fee_qr ?? 0);
                              const expressFee = Number(orderDetails.express_fee_qr ?? 0);
                              const cutBendFee = Number(orderDetails.cut_bend_fee_qr ?? 0);
                              const grandTotal = derivedSubtotal + deliveryFee + expressFee + cutBendFee;
                              return (
                                <>
                                  <div>Method: {orderDetails.payment_method || '—'}</div>
                                  <div>Subtotal: {derivedSubtotal.toFixed(2)} QAR</div>
                                  <div>Delivery Fee: {deliveryFee.toFixed(2)} QAR</div>
                                  <div>Express Fee: {expressFee.toFixed(2)} QAR</div>
                                  <div>Cut-and-Bend Fee: {cutBendFee.toFixed(2)} QAR</div>
                                  <div className="pt-1 font-semibold text-gray-900">
                                    Grand Total: {grandTotal.toFixed(2)} QAR
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900">Notes</div>
                            <div>{orderDetails.notes || '—'}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select value={orderDetails.status} onValueChange={handleStatusChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {orderStatuses.map((status) => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Items</h3>
                          {(orderDetails.order_items || []).length === 0 ? (
                            <div className="text-sm text-gray-500">No items recorded.</div>
                          ) : (
                            <div className="overflow-x-auto border rounded-lg">
                              <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-600">
                                  <tr>
                                    <th className="text-left px-3 py-2">Shape/Notes</th>
                                    <th className="text-left px-3 py-2">Diameter</th>
                                    <th className="text-left px-3 py-2">Length (m)</th>
                                    <th className="text-left px-3 py-2">Qty</th>
                                    <th className="text-left px-3 py-2">Weight (kg)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orderDetails.order_items.map((item) => (
                                    <tr key={item.id} className="border-t">
                                      <td className="px-3 py-2">{item.notes || '—'}</td>
                                      <td className="px-3 py-2">{item.diameter_mm || 'Custom'}</td>
                                      <td className="px-3 py-2">{item.length_m ?? '—'}</td>
                                      <td className="px-3 py-2">{item.qty ?? '—'}</td>
                                      <td className="px-3 py-2">{item.weight_kg ?? '—'}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                        {(orderDetails.order_files || []).length > 0 && (
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Files</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                              {orderDetails.order_files.map((file) => (
                                <div key={file.id} className="flex items-center justify-between gap-3 border rounded-lg p-3">
                                  <div>
                                    <div className="font-medium text-gray-900">{file.file_name}</div>
                                    <div className="text-xs text-gray-500">{file.mime_type || 'File'}</div>
                                    {orderFileErrors[file.id] && (
                                      <div className="text-xs text-amber-600 mt-1">
                                        {orderFileErrors[file.id]}
                                      </div>
                                    )}
                                  </div>
                                  {orderFileUrls[file.id] ? (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => window.open(orderFileUrls[file.id], '_blank', 'noopener')}
                                    >
                                      View/Download
                                    </Button>
                                  ) : (
                                    <Button type="button" variant="outline" disabled>
                                      {loadingOrderFiles ? 'Loading...' : 'Unavailable'}
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
