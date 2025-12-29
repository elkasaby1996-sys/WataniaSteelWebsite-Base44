import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  Loader2,
  Plus,
  Trash2,
  Upload,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { createManualOrder } from '@/services/ordersService';

const diameters = [8, 10, 12, 14, 16, 18, 20, 22, 25, 32];

const weightPerMeter = {
  8: 0.395, 10: 0.617, 12: 0.888, 14: 1.21, 16: 1.58,
  18: 2.0, 20: 2.47, 22: 2.98, 25: 3.85, 32: 6.31,
};

const defaultDeliveryOptions = [
  { value: 'trailer', label: 'Trailer Delivery', price: 200, description: 'Standard delivery' },
  { value: 'crane', label: 'Crane Unloading', price: 700, description: 'For heavy loads' },
  { value: 'pickup', label: 'Self Pickup', price: 0, description: 'Collect from factory' },
];

export default function ManualOrderPanel({ settings, products = [], onBackToStore }) {
  const [items, setItems] = useState([
    { diameter: 12, length: 12, quantity: 100, shape: '', unit: 'pieces' },
  ]);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    company_name: '',
    delivery_address: '',
    delivery_date: '',
    delivery_method: 'trailer',
    is_express: false,
    payment_method: 'cod',
    notes: '',
  });
  const [boqFile, setBoqFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const deliveryOptions = useMemo(() => {
    if (!settings?.delivery_fees) {
      return defaultDeliveryOptions;
    }
    return defaultDeliveryOptions.map((option) => ({
      ...option,
      price: settings.delivery_fees[option.value] ?? option.price,
    }));
  }, [settings]);

  const expressFeeValue = settings?.express_fee?.enabled ? settings.express_fee?.fee ?? 0 : 0;
  const productNames = useMemo(
    () => Array.from(new Set(products.map((product) => product.name).filter(Boolean))),
    [products]
  );

  useEffect(() => {
    if (!productNames.length) {
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.shape && productNames.includes(item.shape)
          ? item
          : { ...item, shape: productNames[0] }
      )
    );
  }, [productNames]);

  const addItem = () => {
    setItems([...items, { diameter: 12, length: 12, quantity: 100, shape: '', unit: 'pieces' }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const calculateWeight = (item) => {
    const wpm = weightPerMeter[item.diameter] || 0;
    return Number(wpm * item.length * item.quantity);
  };

  const itemsWithWeight = items.map((item) => ({
    ...item,
    weightKg: calculateWeight(item),
  }));

  const activeItems = itemsWithWeight;
  const totalWeight = activeItems.reduce((sum, item) => sum + item.weightKg, 0);
  const deliveryFee = deliveryOptions.find((d) => d.value === formData.delivery_method)?.price || 0;
  const expressFee = formData.is_express ? expressFeeValue : 0;
  const cutAndBendFeeValue = settings?.cut_bend_fee?.fee ?? 0;
  const hasCutAndBend = activeItems.some((item) => Number(item.length) > 0 && item.length < 12);
  const cutAndBendFee = hasCutAndBend ? cutAndBendFeeValue : 0;
  const additionalFeesTotal = deliveryFee + expressFee + cutAndBendFee;

  const priceUnitMultiplier = (unitType, item) => {
    const normalized = unitType?.toLowerCase() ?? '';
    if (!normalized) {
      return item.weightKg > 0 ? item.weightKg / 1000 : item.quantity;
    }
    if (normalized.includes('ton')) {
      return item.weightKg / 1000;
    }
    if (normalized.includes('kg')) {
      return item.weightKg;
    }
    if (normalized.includes('meter') || normalized === 'm') {
      return item.length * item.quantity;
    }
    if (normalized.includes('piece') || normalized.includes('pcs') || normalized.includes('pc')) {
      return item.quantity;
    }
    return item.weightKg || item.quantity;
  };

  const productTotals = activeItems.map((item) => {
    const productByName = products.find((product) => product.name === item.shape);
    const productByDiameter = products.find((product) =>
      product.product_variants?.some((variant) => variant.diameter_mm === item.diameter)
    );
    const product = productByName || productByDiameter;
    const variant = product?.product_variants?.find(
      (variant) => variant.diameter_mm === item.diameter
    );
    const price = variant?.price_qr ?? product?.price_qr ?? 0;
    const unitType = variant?.unit_type ?? product?.unit_type ?? '';
    const multiplier = priceUnitMultiplier(unitType, item);
    return price * multiplier;
  });

  const productsTotal = productTotals.reduce((sum, total) => sum + total, 0);
  const orderTotal = productsTotal + additionalFeesTotal;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const result = await createManualOrder({
        formData,
        items: itemsWithWeight,
        orderType: 'manual',
        deliveryFee,
        expressFee,
        cutAndBendFee,
        totalWeightKg: Number(totalWeight.toFixed(2)),
        boqFile,
      });
      setSubmitted(true);
      setOrderNumber(result.order.order_number);
      toast.success('Order submitted successfully!');
      if (result.boqUploadError) {
        toast.warning(result.boqUploadError);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to submit order');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-8 bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg mx-4 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Submitted!</h2>
          <p className="text-gray-600 mb-2">
            Your order has been received. Our team will contact you shortly to confirm the details.
          </p>
          <p className="text-lg font-semibold text-[#7B1F32] mb-6">Order #{orderNumber}</p>
          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => {
                setSubmitted(false);
                setOrderNumber('');
                setItems([{ diameter: 12, length: 12, quantity: 100, shape: '', unit: 'pieces' }]);
              }}
              className="bg-[#7B1F32] hover:bg-[#5a1625] text-white px-8 py-6 rounded-xl"
            >
              Place Another Order
            </Button>
            <Button variant="outline" onClick={onBackToStore} className="rounded-xl">
              Back to Store
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50" id="manual-order-panel">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Place Your Order</h2>
              <p className="text-gray-600 mt-2">Choose your ordering method and submit your requirements directly.</p>
            </div>
            <Button type="button" variant="outline" onClick={onBackToStore} className="rounded-xl">
              Back to Store
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Manual Entry</h3>
            
            {itemsWithWeight.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="grid md:grid-cols-6 gap-4 items-end">
                  <div className="space-y-2">
                    <Label>Shape</Label>
                    <Select
                      value={item.shape || ''}
                      onValueChange={(v) => updateItem(index, 'shape', v)}
                    >
                      <SelectTrigger className="py-3 rounded-xl">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {productNames.length ? (
                          productNames.map((name) => (
                            <SelectItem key={name} value={name}>{name}</SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-products" disabled>
                            No products available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Diameter</Label>
                    <Select
                      value={item.diameter.toString()}
                      onValueChange={(v) => updateItem(index, 'diameter', parseInt(v, 10))}
                    >
                      <SelectTrigger className="py-3 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {diameters.map((d) => (
                          <SelectItem key={d} value={d.toString()}>{d}mm</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Length (m)</Label>
                      <Input
                        type="number"
                        value={item.length}
                        onChange={(e) => updateItem(index, 'length', parseFloat(e.target.value))}
                        className="py-3 rounded-xl"
                      />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value, 10))}
                        className="py-3 rounded-xl"
                      />
                  </div>
                  <div className="space-y-2">
                    <Label>Weight (kg)</Label>
                    <div className="bg-[#7B1F32]/10 text-[#7B1F32] font-bold py-3 px-4 rounded-xl text-center">
                      {item.weightKg.toFixed(2)} kg
                    </div>
                  </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeItem(index)}
                      className="py-3 rounded-xl"
                      disabled={items.length === 1}
                    >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" onClick={addItem} className="rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Weight</div>
                <div className="text-2xl font-black text-[#7B1F32]">{totalWeight.toFixed(2)} kg</div>
                <p className="text-xs text-gray-500 mt-2">
                  Note: For all bars less than 12 Meters, a cut-and-bend fee will be added.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  placeholder="Your name"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="py-3 rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input
                  type="tel"
                  placeholder="+974 XXXX XXXX"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  className="py-3 rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  className="py-3 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  placeholder="Your company"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="py-3 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Apply BOQ (Optional)</h2>
            <div
              className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#7B1F32] transition-colors cursor-pointer"
              onClick={() => document.getElementById('boq-upload').click()}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-2">
                {boqFile ? boqFile.name : 'Click to upload BOQ file'}
              </p>
              <p className="text-gray-500 text-sm">
                Any file format accepted
              </p>
              <input
                id="boq-upload"
                type="file"
                accept="*"
                onChange={(e) => setBoqFile(e.target.files[0])}
                className="hidden"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Options</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {deliveryOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setFormData({ ...formData, delivery_method: option.value })}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    formData.delivery_method === option.value
                      ? 'border-[#7B1F32] bg-[#7B1F32]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-500 mb-2">{option.description}</div>
                  <div className="text-xl font-black text-[#7B1F32]">
                    {option.price > 0 ? `${option.price} QAR` : 'Free'}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Delivery Address</Label>
                <Textarea
                  placeholder="Full delivery address"
                  value={formData.delivery_address}
                  onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Preferred Delivery Date</Label>
                  <Input
                    type="date"
                    value={formData.delivery_date}
                    onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
                    className="py-3 rounded-xl"
                  />
                </div>
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-amber-600" />
                    <div>
                      <div className="font-bold text-gray-900">Express Order</div>
                      <div className="text-sm text-gray-600">Priority processing (+{expressFeeValue} QAR)</div>
                    </div>
                  </div>
                  <Switch
                    checked={formData.is_express}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_express: checked })}
                    disabled={!settings?.express_fee?.enabled}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div
                onClick={() => setFormData({ ...formData, payment_method: 'cod' })}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  formData.payment_method === 'cod'
                    ? 'border-[#7B1F32] bg-[#7B1F32]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold text-gray-900">Cash on Delivery</div>
                <div className="text-sm text-gray-500">Pay when you receive the order</div>
              </div>
              <div
                onClick={() => setFormData({ ...formData, payment_method: 'bank_transfer' })}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  formData.payment_method === 'bank_transfer'
                    ? 'border-[#7B1F32] bg-[#7B1F32]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold text-gray-900">Bank Transfer</div>
                <div className="text-sm text-gray-500">Transfer before delivery</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea
                placeholder="Any special instructions or requirements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-2xl p-8 text-white">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Weight</span>
                <span className="font-bold">{(totalWeight / 1000).toFixed(2)} tons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Delivery Fee</span>
                <span className="font-bold">{deliveryFee} QAR</span>
              </div>
              {formData.is_express && (
                <div className="flex justify-between text-amber-400">
                  <span>Express Fee</span>
                  <span className="font-bold">{expressFee} QAR</span>
                </div>
              )}
              {hasCutAndBend && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Cut-and-Bend Fee</span>
                  <span className="font-bold">{cutAndBendFee} QAR</span>
                </div>
              )}
              <div className="border-t border-white/20 pt-4 flex justify-between text-xl">
                <span>Order Total</span>
                <span className="font-black text-[#7B1F32]">{orderTotal.toFixed(2)} QAR</span>
              </div>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#7B1F32] hover:bg-[#5a1625] text-white py-6 text-lg font-semibold rounded-xl"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Submitting Order...
                </>
              ) : (
                'Submit Order'
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
