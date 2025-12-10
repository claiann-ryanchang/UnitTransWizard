import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';
import { CategoryDef } from '../types';
import UnitSelect from './UnitSelect';

interface StandardConverterProps {
  category: CategoryDef;
}

const StandardConverter: React.FC<StandardConverterProps> = ({ category }) => {
  // Reset state when category changes
  const [fromValue, setFromValue] = useState<string>('1');
  const [fromUnitId, setFromUnitId] = useState<string>(category.units[0].id);
  const [toUnitId, setToUnitId] = useState<string>(category.units[1]?.id || category.units[0].id);
  const [copied, setCopied] = useState(false);

  // Ensure unit IDs are valid for the current category
  useEffect(() => {
    const validIds = category.units.map(u => u.id);
    if (!validIds.includes(fromUnitId)) setFromUnitId(category.units[0].id);
    if (!validIds.includes(toUnitId)) setToUnitId(category.units[1]?.id || category.units[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const result = useMemo(() => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) return '---';

    const fromUnit = category.units.find(u => u.id === fromUnitId);
    const toUnit = category.units.find(u => u.id === toUnitId);

    if (!fromUnit || !toUnit) return '---';

    // Convert to base unit then to target unit
    // value * fromFactor = baseValue
    // baseValue / toFactor = targetValue
    const baseValue = val * fromUnit.factor;
    const targetValue = baseValue / toUnit.factor;

    // Smart formatting
    if (targetValue === 0) return '0';
    
    // For very large or small numbers, use scientific notation or high precision
    if (Math.abs(targetValue) < 0.000001 || Math.abs(targetValue) > 10000000) {
      return targetValue.toExponential(4);
    }
    
    // Remove trailing zeros after decimal point
    return parseFloat(targetValue.toFixed(6)).toString();
  }, [fromValue, fromUnitId, toUnitId, category.units]);

  const handleSwap = () => {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  };

  const handleCopy = () => {
    if (result === '---') return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center relative">
            <div className="flex-1 w-full">
                 <UnitSelect 
                    label="從 (From)" 
                    units={category.units} 
                    selectedId={fromUnitId} 
                    onChange={setFromUnitId} 
                />
            </div>

            <button 
                onClick={handleSwap}
                className="p-3 rounded-full bg-slate-50 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 hover:rotate-180 transition-all duration-300 shadow-sm border border-slate-200 z-10 md:mt-6"
                aria-label="Swap units"
            >
                <ArrowRightLeft size={20} />
            </button>

             <div className="flex-1 w-full">
                <UnitSelect 
                    label="到 (To)" 
                    units={category.units} 
                    selectedId={toUnitId} 
                    onChange={setToUnitId} 
                />
            </div>
        </div>

        {/* Value Input and Result Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500 pl-1">數值</label>
                <input
                    type="number"
                    value={fromValue}
                    onChange={(e) => setFromValue(e.target.value)}
                    className="w-full text-3xl font-light text-slate-800 bg-white border border-slate-200 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
                    placeholder="輸入數值"
                />
            </div>

            <div className="space-y-2 relative group">
                <label className="text-sm font-medium text-slate-500 pl-1">結果</label>
                <div className="w-full h-[86px] flex items-center bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl p-6 shadow-lg shadow-indigo-200 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
                    
                    <span className="text-3xl font-medium tracking-tight truncate pr-8 w-full">
                        {result}
                    </span>

                    <button
                        onClick={handleCopy}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="複製結果"
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                </div>
                 <div className="text-right mt-1">
                     <span className="text-xs text-slate-400 font-medium px-1">
                        {category.units.find(u => u.id === toUnitId)?.label}
                     </span>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default StandardConverter;
