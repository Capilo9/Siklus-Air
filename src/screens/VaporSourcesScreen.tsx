/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, HelpCircle, CheckCircle2 } from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface VaporSourcesScreenProps {
  onNext: () => void;
  onBack: () => void;
}

interface SourceItem {
  id: string;
  name: string;
  category: 'water' | 'non-water';
  icon: string;
  isVaporSource: boolean;
  explanation: string;
}

export const VaporSourcesScreen: React.FC<VaporSourcesScreenProps> = ({ onNext, onBack }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);

  const items: SourceItem[] = [
    {
      id: 'laut',
      name: 'Laut Samudra',
      category: 'water',
      icon: '🌊',
      isVaporSource: true,
      explanation: 'Tepat! Laut merupakan penyumbang uap air terbesar di bumi melalui proses evaporasi.',
    },
    {
      id: 'danau',
      name: 'Danau & Rawa',
      category: 'water',
      icon: '🏞️',
      isVaporSource: true,
      explanation: 'Tepat! Permukaan danau yang tenang menyerap panas matahari dan melepaskan uap air.',
    },
    {
      id: 'pohon',
      name: 'Pohon & Tumbuhan',
      category: 'water',
      icon: '🌳',
      isVaporSource: true,
      explanation: 'Tepat! Tumbuhan melepaskan uap air melalui pori-pori daun lewat proses transpirasi.',
    },
    {
      id: 'genangan',
      name: 'Genangan Air Lapangan',
      category: 'water',
      icon: '💧',
      isVaporSource: true,
      explanation: 'Tepat! Genangan air dangkal cepat menghangat dan menguap ke udara sekitar.',
    },
    {
      id: 'batu',
      name: 'Batu Sungai Kering',
      category: 'non-water',
      icon: '🪨',
      isVaporSource: false,
      explanation: 'Belum tepat. Batu padat tidak mengandung cadangan air untuk diuapkan ke atmosfer.',
    },
    {
      id: 'aspal',
      name: 'Jalan Aspal Kering',
      category: 'non-water',
      icon: '🛣️',
      isVaporSource: false,
      explanation: 'Belum tepat. Jalan aspal kering menjadi sangat panas, namun tidak dapat menghasilkan uap air sendiri jika tidak ada air di atasnya.',
    },
  ];

  const toggleSelect = (id: string) => {
    if (hasChecked) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCheck = () => {
    if (selectedIds.length === 0) return;
    setHasChecked(true);
  };

  const handleRetry = () => {
    setSelectedIds([]);
    setHasChecked(false);
  };

  // Check if answer is completely accurate (all 4 sources selected, 0 non-sources selected)
  const isPerfect =
    hasChecked &&
    selectedIds.length === 4 &&
    selectedIds.includes('laut') &&
    selectedIds.includes('danau') &&
    selectedIds.includes('pohon') &&
    selectedIds.includes('genangan');

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Aktivitas 1 • Penyelidikan Sumber Uap
        </span>
        <span>TP2</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Dari Mana Saja Uap Air Berasal?
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Perhatikan 6 objek di bawah ini. Pilih objek mana saja yang dapat menambah uap air ke udara! (Bisa memilih lebih dari satu).
      </p>

      <TirtaMascot
        dialogue="Pilihlah sumber-sumber yang menurutmu melepaskan uap air ke langit. Hati-hati, tidak semua benda dapat menghasilkan uap air!"
        mood={isPerfect ? 'excited' : hasChecked ? 'thinking' : 'happy'}
      />

      {/* Grid of Choices */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          let cardStyle = 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/50';

          if (isSelected && !hasChecked) {
            cardStyle = 'border-sky-500 bg-sky-50 ring-2 ring-sky-300';
          } else if (hasChecked) {
            if (item.isVaporSource) {
              cardStyle = isSelected
                ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                : 'border-emerald-200 bg-emerald-50/40 opacity-75';
            } else {
              cardStyle = isSelected
                ? 'border-rose-400 bg-rose-50 ring-2 ring-rose-200'
                : 'border-slate-200 bg-slate-50 opacity-60';
            }
          }

          return (
            <button
              key={item.id}
              id={`vapor-item-${item.id}`}
              onClick={() => toggleSelect(item.id)}
              disabled={hasChecked}
              className={`p-4 rounded-2xl border text-left transition relative cursor-pointer flex flex-col justify-between min-h-[110px] ${cardStyle}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{item.icon}</span>
                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold transition ${
                    isSelected
                      ? 'bg-sky-600 border-sky-600 text-white'
                      : 'border-slate-300 bg-white text-transparent'
                  }`}
                >
                  ✓
                </div>
              </div>

              <div>
                <span className="font-bold text-sm text-slate-800 block mt-2">
                  {item.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-center gap-3">
        {!hasChecked ? (
          <button
            id="check-vapor-sources-btn"
            onClick={handleCheck}
            disabled={selectedIds.length === 0}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-md ${
              selectedIds.length > 0
                ? 'bg-sky-600 hover:bg-sky-700 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Periksa Pilihan Saya ({selectedIds.length} dipilih)
          </button>
        ) : (
          <button
            id="retry-vapor-sources-btn"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Coba Pilih Ulang</span>
          </button>
        )}
      </div>

      {/* Detailed Feedback on Checked */}
      {hasChecked && (
        <div className="mt-6 space-y-2.5 animate-in fade-in">
          <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 font-semibold flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>
              {isPerfect
                ? 'Luar biasa! Seluruh sumber uap air berhasil kamu identifikasi dengan tepat!'
                : 'Bagus sekali sudah mencoba! Mari kita pelajari alasan ilmiah di balik setiap objek:'}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-2">
            {items.map((item) => {
              const userPicked = selectedIds.includes(item.id);
              const isCorrectlyHandled =
                (item.isVaporSource && userPicked) || (!item.isVaporSource && !userPicked);

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                    isCorrectlyHandled
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <span className="font-bold block">{item.name}:</span>
                    <span className="text-slate-700">{item.explanation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
        >
          ← Kembali
        </button>

        {hasChecked && (
          <button
            id="vapor-next-btn"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
          >
            <span>Lanjut: Bagaimana Awan Terbentuk?</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
