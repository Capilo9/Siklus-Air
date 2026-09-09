/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Sun, Droplet, Trees, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface EvaporationExplorationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const EvaporationExplorationScreen: React.FC<EvaporationExplorationScreenProps> = ({
  onNext,
  onBack,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<'sun' | 'water' | 'tree' | null>('sun');
  const [showSimilarityAnswer, setShowSimilarityAnswer] = useState(false);
  const [similarityInput, setSimilarityInput] = useState('');

  const hotspots = {
    sun: {
      title: 'Matahari (Sumber Energi Panas)',
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      color: 'border-amber-400 bg-amber-50 text-amber-950',
      description:
        'Energi panas dari pancaran sinar matahari adalah motor penggerak utama siklus air. Panas matahari menghangatkan molekul air di permukaan bumi sehingga memperoleh cukup energi untuk berubah wujud dari cair menjadi gas (uap air).',
    },
    water: {
      title: 'Laut, Danau & Sungai (Evaporasi)',
      icon: <Droplet className="w-5 h-5 text-sky-600" />,
      color: 'border-sky-400 bg-sky-50 text-sky-950',
      description:
        'Air dari permukaan laut luas, danau, sungai, maupun genangan air menyerap energi panas lalu menguap ke udara. Proses perubahan air cair menjadi uap air ini disebut EVAPORASI. Hanya air murni yang menguap, garam di laut tetap tertinggal!',
    },
    tree: {
      title: 'Pohon & Tumbuhan (Transpirasi)',
      icon: <Trees className="w-5 h-5 text-emerald-600" />,
      color: 'border-emerald-400 bg-emerald-50 text-emerald-950',
      description:
        'Bukan hanya badan air yang menguap! Akar pohon menyerap air dari tanah untuk fotosintesis, lalu melepaskan kelebihan uap air ke atmosfer melalui lubang pori-pori halus pada daun (stomata). Proses ini disebut TRANSPIRASI.',
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Pos 1 • Eksplorasi Interaktif
        </span>
        <span>TP2, TP4</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Dua Cara Air Menguap ke Langit
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Ketuk tombol <strong>Matahari</strong>, <strong>Laut/Danau</strong>, atau <strong>Pohon</strong> pada ilustrasi untuk memahami bagaimana uap air bertambah di udara.
      </p>

      {/* Interactive SVG Stage */}
      <div className="relative bg-gradient-to-b from-sky-100 via-sky-50 to-white rounded-3xl border-2 border-sky-200 overflow-hidden shadow-sm p-4">
        {/* Hotspot Toggle Buttons bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4 justify-center">
          <button
            id="hotspot-sun-btn"
            onClick={() => setActiveHotspot('sun')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeHotspot === 'sun'
                ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>1. Matahari</span>
          </button>

          <button
            id="hotspot-water-btn"
            onClick={() => setActiveHotspot('water')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeHotspot === 'water'
                ? 'bg-sky-600 text-white shadow-md ring-2 ring-sky-300'
                : 'bg-white text-slate-700 hover:bg-sky-50 border border-slate-200'
            }`}
          >
            <Droplet className="w-4 h-4 text-sky-600" />
            <span>2. Laut & Danau (Evaporasi)</span>
          </button>

          <button
            id="hotspot-tree-btn"
            onClick={() => setActiveHotspot('tree')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeHotspot === 'tree'
                ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            <Trees className="w-4 h-4 text-emerald-600" />
            <span>3. Pohon (Transpirasi)</span>
          </button>
        </div>

        {/* Photographic Visualization of Evaporation & Transpiration */}
        <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-sky-100 shadow-md aspect-[16/9]">
          {activeHotspot === 'sun' && (
            <img
              src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80"
              alt="Matahari terik menyinari bumi sebagai sumber panas utama siklus air"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover animate-in fade-in duration-500"
            />
          )}

          {activeHotspot === 'water' && (
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
              alt="Permukaan air laut dan danau mengalami evaporasi oleh panas matahari"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover animate-in fade-in duration-500"
            />
          )}

          {activeHotspot === 'tree' && (
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80"
              alt="Hutan dan dedaunan pohon mengeluarkan uap air melalui stomata (transpirasi)"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover animate-in fade-in duration-500"
            />
          )}

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />

          {/* Interactive Hotspot Buttons directly over the image */}
          <div className="absolute inset-0 p-3 sm:p-4 pointer-events-none">
            {/* Sun Pin */}
            <button
              onClick={() => setActiveHotspot('sun')}
              className={`pointer-events-auto absolute top-[12%] left-[10%] px-2.5 py-1 rounded-full text-xs font-bold shadow-md cursor-pointer transition transform hover:scale-105 flex items-center gap-1.5 ${
                activeHotspot === 'sun'
                  ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-200'
                  : 'bg-black/60 backdrop-blur-xs text-amber-200 border border-amber-400/50'
              }`}
            >
              <span>☀️ Matahari (Energi Panas)</span>
            </button>

            {/* Ocean Pin */}
            <button
              onClick={() => setActiveHotspot('water')}
              className={`pointer-events-auto absolute bottom-[14%] right-[10%] px-2.5 py-1 rounded-full text-xs font-bold shadow-md cursor-pointer transition transform hover:scale-105 flex items-center gap-1.5 ${
                activeHotspot === 'water'
                  ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                  : 'bg-black/60 backdrop-blur-xs text-blue-200 border border-blue-400/50'
              }`}
            >
              <span>🌊 Evaporasi (Air Laut/Danau)</span>
            </button>

            {/* Tree Pin */}
            <button
              onClick={() => setActiveHotspot('tree')}
              className={`pointer-events-auto absolute bottom-[18%] left-[10%] px-2.5 py-1 rounded-full text-xs font-bold shadow-md cursor-pointer transition transform hover:scale-105 flex items-center gap-1.5 ${
                activeHotspot === 'tree'
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                  : 'bg-black/60 backdrop-blur-xs text-emerald-200 border border-emerald-400/50'
              }`}
            >
              <span>🌲 Transpirasi (Tumbuhan Hijau)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Detail Card based on active hotspot */}
        {activeHotspot && (
          <div className={`mt-4 p-4 rounded-2xl border ${hotspots[activeHotspot].color} transition-all`}>
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              {hotspots[activeHotspot].icon}
              <span>{hotspots[activeHotspot].title}</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              {hotspots[activeHotspot].description}
            </p>
          </div>
        )}
      </div>

      {/* Deepening Question */}
      <div className="mt-5 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-2.5">
          <HelpCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 text-sm mb-1">
              Tantangan Berpikir: Apa persamaan Evaporasi dan Transpirasi?
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Keduanya terjadi di tempat berbeda (badan air vs tumbuhan). Coba renungkan apa kesamaan hasil dari kedua proses ini!
            </p>

            {!showSimilarityAnswer ? (
              <button
                id="reveal-similarity-btn"
                onClick={() => setShowSimilarityAnswer(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lihat Kesimpulan Ilmiah</span>
              </button>
            ) : (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-950 animate-in fade-in">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Kesamaan Evaporasi & Transpirasi:</span>
                </div>
                <p className="leading-relaxed">
                  <strong>Keduanya sama-sama menambahkan uap air ke atmosfer bumi!</strong> Evaporasi menguapkan air dari permukaan benda mati (laut, danau, sungai, genangan), sedangkan transpirasi melepaskan uap air dari makhluk hidup (terutama daun tumbuhan). Keduanya digerakkan oleh energi panas matahari.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
        >
          ← Kembali
        </button>

        <button
          id="evap-next-btn"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
        >
          <span>Lanjut ke Aktivitas 1</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
