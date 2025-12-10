import React, { useState } from 'react';
import { CATEGORIES } from './constants';
import StandardConverter from './components/StandardConverter';
import { Calculator } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(CATEGORIES[0].id);

  // Find the active category definition
  const activeCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full">
        
        {/* Header */}
        <header className="mb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
                 <Calculator className="text-white w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              萬能單位轉換器
            </h1>
          </div>
          <p className="text-slate-500 pl-1 md:pl-[60px]">
            快速、精準，無需連網的轉換工具
          </p>
        </header>

        {/* Main Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-white">
          
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-slate-100 p-2 md:p-4 gap-2 bg-slate-50/50">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`
                    flex-1 min-w-[100px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300
                    ${isActive 
                      ? 'bg-white text-indigo-600 shadow-md shadow-slate-200 ring-1 ring-slate-100' 
                      : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'}
                  `}
                >
                  <Icon size={18} />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="p-4 md:p-8 min-h-[400px]">
            <StandardConverter category={activeCategory} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-slate-400">
          <p>© 2024 Unit Master. Powered by React.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;