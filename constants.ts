import { Ruler, Maximize2, Box } from 'lucide-react';
import { CategoryDef } from './types';

// Factors are relative to the base unit
// Length Base: Meter (m)
// Area Base: Square Meter (m²)
// Volume Base: Liter (L)

export const CATEGORIES: CategoryDef[] = [
  {
    id: 'length',
    label: '長度',
    icon: Ruler,
    baseUnit: 'm',
    units: [
      { id: 'km', label: '公里 (km)', factor: 1000 },
      { id: 'm', label: '公尺 (m)', factor: 1 },
      { id: 'cm', label: '公分 (cm)', factor: 0.01 },
      { id: 'mm', label: '公釐 (mm)', factor: 0.001 },
      { id: 'mi', label: '英里 (mi)', factor: 1609.344 },
      { id: 'yd', label: '碼 (yd)', factor: 0.9144 },
      { id: 'ft', label: '英尺 (ft)', factor: 0.3048 },
      { id: 'in', label: '英寸 (in)', factor: 0.0254 },
    ],
  },
  {
    id: 'area',
    label: '面積',
    icon: Maximize2,
    baseUnit: 'sq_m',
    units: [
      { id: 'sq_km', label: '平方公里 (km²)', factor: 1000000 },
      { id: 'ha', label: '公頃 (ha)', factor: 10000 },
      { id: 'sq_m', label: '平方公尺 (m²)', factor: 1 },
      { id: 'ping', label: '坪', factor: 3.305785 },
      { id: 'sq_mi', label: '平方英里 (mi²)', factor: 2589988.11 },
      { id: 'ac', label: '英畝 (ac)', factor: 4046.86 },
      { id: 'sq_ft', label: '平方英尺 (ft²)', factor: 0.092903 },
      { id: 'sq_in', label: '平方英寸 (in²)', factor: 0.00064516 },
    ],
  },
  {
    id: 'volume',
    label: '體積',
    icon: Box,
    baseUnit: 'l',
    units: [
      { id: 'cu_m', label: '立方公尺 (m³)', factor: 1000 },
      { id: 'l', label: '公升 (L)', factor: 1 },
      { id: 'ml', label: '毫升 (mL)', factor: 0.001 },
      { id: 'gal_us', label: '美制加侖 (gal)', factor: 3.78541 },
      { id: 'qt_us', label: '美制夸脫 (qt)', factor: 0.946353 },
      { id: 'pt_us', label: '美制品脫 (pt)', factor: 0.473176 },
      { id: 'cup', label: '美制杯', factor: 0.236588 },
      { id: 'fl_oz', label: '美制液盎司 (fl oz)', factor: 0.0295735 },
      { id: 'tbsp', label: '湯匙 (Tbsp)', factor: 0.0147868 },
      { id: 'tsp', label: '茶匙 (tsp)', factor: 0.00492892 },
    ],
  },
];
