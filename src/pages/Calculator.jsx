import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Plus, Trash2, Download, RotateCcw } from 'lucide-react';

const diameters = [8, 10, 12, 14, 16, 18, 20, 22, 25, 32, 40];

// Weight per meter in kg for each diameter (B500B standard)
const weightPerMeter = {
  8: 0.395,
  10: 0.617,
  12: 0.888,
  14: 1.21,
  16: 1.58,
  18: 2.00,
  20: 2.47,
  22: 2.98,
  25: 3.85,
  32: 6.31,
  40: 9.86
};

export default function CalculatorPage() {
  const [items, setItems] = useState([
    { diameter: 12, length: 12, quantity: 100 }
  ]);

  const addItem = () => {
    setItems([...items, { diameter: 12, length: 12, quantity: 100 }]);
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

  const resetCalculator = () => {
    setItems([{ diameter: 12, length: 12, quantity: 100 }]);
  };

  const calculateWeight = (item) => {
    const wpm = weightPerMeter[item.diameter] || 0;
    return (wpm * item.length * item.quantity).toFixed(2);
  };

  const calculateTotalLength = (item) => {
    return (item.length * item.quantity).toFixed(2);
  };

  const totalWeight = items.reduce((sum, item) => sum + parseFloat(calculateWeight(item)), 0);
  const totalPieces = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalLength = items.reduce((sum, item) => sum + parseFloat(calculateTotalLength(item)), 0);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#2d2d2d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Tools</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">
              Rebar Weight Calculator
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Calculate the weight of reinforcement steel based on diameter, length, and quantity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#7B1F32]" />
                    Calculate Weight
                  </h2>
                  <Button variant="outline" onClick={resetCalculator} className="text-sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-xl p-6"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-600">Diameter (mm)</Label>
                          <Select 
                            value={item.diameter.toString()} 
                            onValueChange={(v) => updateItem(index, 'diameter', parseInt(v))}
                          >
                            <SelectTrigger className="py-3 rounded-xl bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {diameters.map((d) => (
                                <SelectItem key={d} value={d.toString()}>
                                  Ø{d}mm ({weightPerMeter[d]} kg/m)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-600">Length (m)</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.1"
                            value={item.length}
                            onChange={(e) => updateItem(index, 'length', parseFloat(e.target.value) || 0)}
                            className="py-3 rounded-xl bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-600">Quantity (pcs)</Label>
                          <Input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                            className="py-3 rounded-xl bg-white"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1 bg-[#7B1F32] text-white font-bold py-3 px-4 rounded-xl text-center">
                            {calculateWeight(item)} kg
                          </div>
                          {items.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeItem(index)}
                              className="h-12 w-12 rounded-xl"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button 
                  onClick={addItem} 
                  variant="outline" 
                  className="w-full mt-6 py-6 rounded-xl border-dashed border-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Item
                </Button>
              </div>

              {/* Reference Table */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Weight Reference Table (B500B)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Diameter</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Weight/m</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Weight/12m</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diameters.map((d) => (
                        <tr key={d} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <span className="font-medium">Ø{d}mm</span>
                          </td>
                          <td className="py-3 px-4">{weightPerMeter[d]} kg</td>
                          <td className="py-3 px-4">{(weightPerMeter[d] * 12).toFixed(2)} kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-[#1A1A1A] rounded-2xl p-8 text-white sticky top-28">
                <h3 className="text-lg font-bold mb-6">Calculation Results</h3>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-gray-400 text-sm">Total Weight</div>
                    <div className="text-4xl font-black text-white mt-1">
                      {totalWeight.toFixed(2)}
                      <span className="text-lg font-normal text-gray-400 ml-2">kg</span>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-gray-400 text-sm">In Tons</div>
                    <div className="text-3xl font-bold text-[#7B1F32] mt-1">
                      {(totalWeight / 1000).toFixed(3)}
                      <span className="text-lg font-normal text-gray-400 ml-2">tons</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-gray-400 text-sm">Total Pieces</div>
                      <div className="text-2xl font-bold mt-1">{totalPieces.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-gray-400 text-sm">Total Length</div>
                      <div className="text-2xl font-bold mt-1">{totalLength.toLocaleString()}m</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/20 mt-6 pt-6">
                  <div className="text-sm text-gray-400 mb-4">
                    Formula: Weight = Diameter² × 0.00617 × Length × Quantity
                  </div>
                  <div className="text-xs text-gray-500">
                    Based on B500B steel density: 7850 kg/m³
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
