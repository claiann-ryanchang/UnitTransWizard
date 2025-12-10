import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { askGeminiConversion } from '../services/geminiService';

const SmartConverter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    const answer = await askGeminiConversion(query);
    
    setResult(answer);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-900 flex items-center gap-2 mb-2">
                <Sparkles className="text-indigo-500" size={20} />
                AI 智能轉換
            </h3>
            <p className="text-sm text-indigo-700/80 mb-6">
                遇到特殊單位或複雜問題？試著問問 Gemini AI。例如：「500坪等於多少平方公尺？」或「自由女神像有多高？」
            </p>

            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="輸入您的問題..."
                    className="w-full text-lg bg-white border border-indigo-200 text-slate-800 rounded-xl py-4 pl-5 pr-14 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-lg transition-colors shadow-sm"
                >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
            </form>
        </div>

        {result && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-start gap-4">
                     <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full shrink-0">
                        <Sparkles size={24} />
                     </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">AI 回答</p>
                        <p className="text-lg text-slate-800 leading-relaxed whitespace-pre-wrap">
                            {result}
                        </p>
                     </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default SmartConverter;
