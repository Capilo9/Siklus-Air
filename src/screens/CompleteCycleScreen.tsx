/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, RotateCw, Sparkles, Droplets, Info } from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface CompleteCycleScreenProps {
  onNext: () => void;
  onBack: () => void;
}

type CycleStageKey =
  | 'sun'
  | 'evaporation'
  | 'transpiration'
  | 'condensation'
  | 'precipitation'
  | 'infiltration'
  | 'runoff';

export const CompleteCycleScreen: React.FC<CompleteCycleScreenProps> = ({ onNext, onBack }) => {
  const [selectedStage, setSelectedStage] = useState<CycleStageKey>('evaporation');

  const stagesData: Record<
    CycleStageKey,
    { title: string; subtitle: string; desc: string; color: string; badge: string }
  > = {
    sun: {
      title: 'Energi Panas Matahari',
      subtitle: 'Sumber Penggerak Siklus Air',
      desc: 'Matahari menyinari lautan dan daratan, memberikan energi panas yang memicu air berubah wujud menjadi uap air.',
      color: 'bg-amber-500 text-white',
      badge: 'border-amber-300 bg-amber-50 text-amber-950',
    },
    evaporation: {
      title: 'Evaporasi (Penguapan Air)',
      subtitle: 'Air laut, danau & sungai menjadi gas uap',
      desc: 'Air di permukaan laut, danau, dan sungai menyerap energi panas matahari lalu berubah wujud menjadi uap air yang naik ke atmosfer.',
      color: 'bg-orange-500 text-white',
      badge: 'border-orange-300 bg-orange-50 text-orange-950',
    },
    transpiration: {
      title: 'Transpirasi (Penguapan Tumbuhan)',
      subtitle: 'Pelepasan uap air melalui daun pohon',
      desc: 'Tumbuhan menyerap air tanah lewat akar dan melepaskan kelebihan uap air ke udara melalui lubang pori daun (stomata).',
      color: 'bg-emerald-600 text-white',
      badge: 'border-emerald-300 bg-emerald-50 text-emerald-950',
    },
    condensation: {
      title: 'Kondensasi (Membentuk Awan)',
      subtitle: 'Pendinginan uap air menjadi titik-titik air',
      desc: 'Saat uap air naik ke ketinggian yang dingin, gas uap mendingin dan berubah menjadi butiran air mikro yang berkumpul membentuk awan.',
      color: 'bg-sky-500 text-white',
      badge: 'border-sky-300 bg-sky-50 text-sky-950',
    },
    precipitation: {
      title: 'Presipitasi (Turunnya Hujan)',
      subtitle: 'Tetesan air awan jatuh ke bumi',
      desc: 'Ketika butiran air di awan saling menyatu menjadi terlalu besar dan berat untuk ditahan angin, air jatuh ditarik gaya gravitasi bumi sebagai hujan.',
      color: 'bg-blue-600 text-white',
      badge: 'border-blue-300 bg-blue-50 text-blue-950',
    },
    infiltration: {
      title: 'Infiltrasi (Peresapan Air Tanah)',
      subtitle: 'Air meresap ke pori-pori tanah',
      desc: 'Air hujan yang jatuh di permukaan tanah berpori diserap ke dalam bumi, menjadi cadangan air tanah yang bersih untuk sumur dan mata air.',
      color: 'bg-yellow-700 text-white',
      badge: 'border-yellow-300 bg-yellow-50 text-yellow-950',
    },
    runoff: {
      title: 'Aliran Permukaan (Limpasan Sungai)',
      subtitle: 'Air mengalir menuju sungai & laut',
      desc: 'Air hujan yang tidak terserap tanah melimpas di permukaan tanah atau bebatuan, mengalir menuruni lereng menuju sungai hingga kembali ke laut.',
      color: 'bg-teal-600 text-white',
      badge: 'border-teal-300 bg-teal-50 text-teal-950',
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Pos 5 • Bagan Siklus Lengkap
        </span>
        <span>TP1, TP2, TP3, TP5</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Siklus Air Bumi yang Berputar Tanpa Henti
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Ketuk salah satu tahap siklus di bawah diagram untuk menyoroti alurnya dan memahami bagaimana semua proses saling terhubung.
      </p>

      {/* Complete Interactive SVG Diagram */}
      <div className="bg-white rounded-3xl border-2 border-sky-200 overflow-hidden shadow-sm p-4">
        {/* Complete Interactive Photographic Landscape */}
        <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-sky-100 shadow-md aspect-[16/9]">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
            alt="Pemandangan Alam Siklus Air Lengkap di Bumi"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

          {/* Interactive HTML Hotspot Badges Overlaid on the Real Photograph */}
          <div className="absolute inset-0 p-3 sm:p-4 pointer-events-none">
            {/* 1. Matahari */}
            <button
              onClick={() => setSelectedStage('sun')}
              className={`pointer-events-auto absolute top-[10%] left-[8%] px-2.5 py-1 rounded-full text-[11px] font-black shadow-md cursor-pointer transition transform hover:scale-108 flex items-center gap-1 ${
                selectedStage === 'sun'
                  ? 'bg-amber-400 text-slate-950 ring-3 ring-amber-300 scale-105'
                  : 'bg-black/60 backdrop-blur-xs text-amber-300 border border-amber-400/50'
              }`}
            >
              <span>☀️ Matahari</span>
            </button>

            {/* 2. Kondensasi */}
            <button
              onClick={() => setSelectedStage('condensation')}
              className={`pointer-events-auto absolute top-[12%] right-[24%] px-2.5 py-1 rounded-full text-[11px] font-black shadow-md cursor-pointer transition transform hover:scale-108 flex items-center gap-1 ${
                selectedStage === 'condensation'
                  ? 'bg-sky-500 text-white ring-3 ring-sky-300 scale-105'
                  : 'bg-black/60 backdrop-blur-xs text-sky-200 border border-sky-400/50'
              }`}
            >
              <span>☁️ Kondensasi</span>
            </button>

            {/* 3. Transpirasi */}
            <button
              onClick={() => setSelectedStage('transpiration')}
              className={`pointer-events-auto absolute bottom-[46%] left-[6%] px-2.5 py-1 rounded-full text-[11px] font-black shadow-md cursor-pointer transition transform hover:scale-108 flex items-center gap-1 ${
                selectedStage === 'transpiration'
                  ? 'bg-emerald-500 text-white ring-3 ring-emerald-300 scale-105'
                  : 'bg-black/60 backdrop-blur-xs text-emerald-200 border border-emerald-400/50'
              }`}
            >
              <span>🌲 Transpirasi</span>
            </button>

            {/* 4. Presipitasi */}
            <button
              onClick={() => setSelectedStage('precipitation')}
              className={`pointer-events-auto absolute top-[36%] right-[10%] px-2.5 py-1 rounded-full text-[11px] font-black shadow-md cursor-pointer transition transform hover:scale-108 flex items-center gap-1 ${
                selectedStage === 'precipitation'
                  ? 'bg-blue-600 text-white ring-3 ring-blue-300 scale-105'
                  : 'bg-black/60 backdrop-blur-xs text-blue-200 border border-blue-400/50'
              }`}
            >
              <span>🌧️ Presipitasi</span>
            </button>

            {/* 5. Evaporasi */}
            <button
              onClick={() => setSelectedStage('evaporation')}
              className={`pointer-events-auto absolute bottom-[30%] right-[32%] px-2.5 py-1 rounded-full text-[11px] font-black shadow-md cursor-pointer transition transform hover:scale-108 flex items-center gap-1 ${
                selectedStage === 'evaporation'
                  ? 'bg-orange-500 text-white ring-3 ring-orange-300 scale-105'
                  : 'bg-black/60 backdrop-blur-xs text-orange-200 border border-orange-400/50'
              }`}
            >
              <span>↗️ Evaporasi</span>
            </button>

            {/* 6. Infiltrasi */}
            <button
              onClick={() => setSelectedStage('infiltration')}
              className={`pointer-events-auto absolute bottom-[10%] left-[10%] px-2.5 py-1 rounded-full text-[11px] font-black shadow-md cursor-pointer transition transform hover:scale-108 flex items-center gap-1 ${
                selectedStage === 'infiltration'
                  ? 'bg-yellow-600 text-white ring-3 ring-yellow-300 scale-105'
                  : 'bg-black/60 backdrop-blur-xs text-yellow-200 border border-yellow-400/50'
              }`}
            >
              <span>⇣ Infiltrasi</span>
            </button>

            {/* 7. Aliran Permukaan */}
            <button
              onClick={() => setSelectedStage('runoff')}
              className={`pointer-events-auto absolute bottom-[12%] right-[16%] px-2.5 py-1 rounded-full text-[11px] font-black shadow-md cursor-pointer transition transform hover:scale-108 flex items-center gap-1 ${
                selectedStage === 'runoff'
                  ? 'bg-teal-500 text-white ring-3 ring-teal-300 scale-105'
                  : 'bg-black/60 backdrop-blur-xs text-teal-200 border border-teal-400/50'
              }`}
            >
              <span>🌊 Aliran Permukaan</span>
            </button>
          </div>
        </div>

        {/* Dynamic Detail of Selected Stage */}
        <div className={`mt-4 p-4 rounded-2xl border ${stagesData[selectedStage].badge} transition-all`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm sm:text-base">
              {stagesData[selectedStage].title}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/80 font-medium">
              {stagesData[selectedStage].subtitle}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {stagesData[selectedStage].desc}
          </p>
        </div>
      </div>

      {/* Core Concept Banner (Mencegah Miskonsepsi 7) */}
      <div className="mt-5 p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3 text-xs sm:text-sm text-sky-950">
        <RotateCw className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Pesan Kunci Siklus Air:</strong> Siklus air <em>tidak memiliki titik awal atau titik akhir yang mutlak</em>. Air terus berpindah tempat dan berubah wujud secara abadi berkat sinar matahari dan gravitasi bumi!
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
          id="complete-cycle-next-btn"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
        >
          <span>Lanjut: Uji Coba Bangun Siklus Air</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
