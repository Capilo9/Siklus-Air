/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface ReflectionScreenProps {
  reflectionData: {
    learned: string;
    favorite: string;
    action: string;
  };
  onUpdateReflection: (field: 'learned' | 'favorite' | 'action', val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ReflectionScreen: React.FC<ReflectionScreenProps> = ({
  reflectionData,
  onUpdateReflection,
  onNext,
  onBack,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Pos 7 • Refleksi Diri Peserta Didik
        </span>
        <span>Refleksi Bermakna</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Catatan Refleksi Belajarku
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Tuliskan apa yang kamu rasakan dan pelajari hari ini. Jawabanmu tersimpan aman di layar ini selama sesi belajar terbuka.
      </p>

      <TirtaMascot
        dialogue="Ungkapkan penemuan barumu! Tidak ada jawaban yang salah, ceritakan apa yang paling kamu sukai saat berpetualang bersamaku."
        mood="happy"
      />

      <div className="mt-5 space-y-4">
        {/* Prompt 1 */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 text-xs flex items-center justify-center">1</span>
            <span>Setelah belajar, aku sekarang tahu bahwa...</span>
          </label>
          <textarea
            id="ref-learned-input"
            value={reflectionData.learned}
            onChange={(e) => onUpdateReflection('learned', e.target.value)}
            placeholder="Contoh: Air di bumi berputar terus menerus dan awan sebenarnya terbentuk dari butiran air kecil, bukan gas..."
            rows={3}
            className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-slate-800 resize-none"
          />
        </div>

        {/* Prompt 2 */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center">2</span>
            <span>Bagian yang paling menarik menurutku adalah...</span>
          </label>
          <textarea
            id="ref-favorite-input"
            value={reflectionData.favorite}
            onChange={(e) => onUpdateReflection('favorite', e.target.value)}
            placeholder="Contoh: Saat menjadi detektif siklus air dan melihat bagaimana air hujan meresap ke dalam tanah..."
            rows={3}
            className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-slate-800 resize-none"
          />
        </div>

        {/* Prompt 3 */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center">3</span>
            <span>Salah satu cara nyata menjaga ketersediaan air adalah...</span>
          </label>
          <textarea
            id="ref-action-input"
            value={reflectionData.action}
            onChange={(e) => onUpdateReflection('action', e.target.value)}
            placeholder="Contoh: Menanam pohon di sekitar sekolah, menghemat air kran, dan membiarkan tanah terbuka untuk resapan..."
            rows={3}
            className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-slate-800 resize-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
        >
          ← Kembali
        </button>

        <button
          id="finish-reflection-btn"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition cursor-pointer"
        >
          <span>Simpan & Selesaikan Petualangan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
