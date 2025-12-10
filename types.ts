import React from 'react';

export type CategoryId = 'length' | 'area' | 'volume';

export interface Unit {
  id: string;
  label: string;
  factor: number; // Conversion factor to the base unit of the category
}

export interface CategoryDef {
  id: CategoryId;
  label: string;
  // Updated to include size which is used in App.tsx and supported by Lucide icons
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  baseUnit: string;
  units: Unit[];
}

export interface ConversionState {
  fromValue: string;
  fromUnitId: string;
  toUnitId: string;
  result: string;
}