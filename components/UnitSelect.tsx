import React from 'react';
import { Unit } from '../types';

interface UnitSelectProps {
  label: string;
  units: Unit[];
  selectedId: string;
  onChange: (id: string) => void;
}

const UnitSelect: React.FC<UnitSelectProps> = ({ label, units, selectedId, onChange }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider pl-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={selectedId}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-3 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base shadow-sm transition-all hover:border-indigo-300"
        >
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UnitSelect;
