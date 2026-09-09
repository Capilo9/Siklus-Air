/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, RotateCcw, Sparkles } from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface BuildCycleScreenProps {
  onNext: () => void;
  onBack: () => void;
}

interface TargetSlot {
  id: string;
  name: string;
  correctLabel: string;
  locationHint: string;
  explanation: string;
}

const SLOTS: TargetSlot[] = [
  {
    id: 'slot-evap',
    name: 'Slot A (Permukaan Laut)',
    correctLabel: 'Evaporasi',
    locationHint: 'Panah naik dari permukaan laut ke langit',
    explanation: 'Penguapan air dari badan air (laut/danau) akibat panas matahari dinamakan Evaporasi.',
  },
  {
    id: 'slot-transp',
    name: 'Slot B (Daun Pepohonan)',
    correctLabel: 'Transpirasi',
    locationHint: 'Panah naik dari tumbuhan ke atmosfer',
    explanation: 'Pelepasan uap air oleh makhluk hidup tumbuhan melalui daun disebut Transpirasi.',
  },
  {
    id: 'slot-cond',
    name: 'Slot C (Awan di Langit)',
    correctLabel: 'Kondensasi',
    locationHint: 'Uap air mendingin menjadi titik air awan',
    explanation: 'Pengembunan uap air menjadi butiran air kecil pembentuk awan adalah Kondensasi.',
  },
  {
    id: 'slot-precip',
    name: 'Slot D (Air Jatuh ke Bumi)',
    correctLabel: 'Presipitasi',
    locationHint: 'Titik-titik air jatuh dari awan',
    explanation: 'Jatuhnya butiran air awan ke bumi karena tarikan gravitasi disebut Presipitasi.',
  },
  {
    id: 'slot-infil',
    name: 'Slot E (Bawah Permukaan Tanah)',
    correctLabel: 'Infiltrasi',
    locationHint: 'Panah air meresap ke lapisan tanah',
    explanation: 'Peresapan air ke dalam lapisan tanah menjadi air tanah disebut Infiltrasi.',
  },
  {
    id: 'slot-runoff',
    name: 'Slot F (Aliran Menuju Sungai)',
    correctLabel: 'Aliran Permukaan',
    locationHint: 'Air melimpas di atas permukaan tanah',
    explanation: 'Air yang mengalir di permukaan tanah menuju sungai dinamakan Aliran Permukaan (runoff).',
  },
];

const LABELS = [
  'Evaporasi',
  'Transpirasi',
  'Kondensasi',
  'Presipitasi',
  'Infiltrasi',
  'Aliran Permukaan',
];

export const BuildCycleScreen: React.FC<BuildCycleScreenProps> = ({ onNext, onBack }) => {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  // Tap-to-place handler: select label, then tap slot
  const handleSlotClick = (slotId: string) => {
    if (hasChecked) return;
    if (selectedLabel) {
      setPlacements((prev) => ({ ...prev, [slotId]: selectedLabel }));
      setSelectedLabel(null);
    } else if (placements[slotId]) {
      // Remove placed label on tap if no label is selected
      const newP = { ...placements };
      delete newP[slotId];
      setPlacements(newP);
    }
  };

  const handleLabelClick = (label: string) => {
    if (hasChecked) return;
    setSelectedLabel((prev) => (prev === label ? null : label));
  };

  const allFilled = SLOTS.every((s) => !!placements[s.id]);
  const isPerfect = SLOTS.every((s) => placements[s.id] === s.correctLabel);

  const handleCheck = () => {
    setHasChecked(true);
  };

  const handleReset = () => {
    setPlacements({});
    setSelectedLabel(null);
    setHasChecked(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Aktivitas 4 • Membangun Siklus Air
        </span>
        <span>TP2, TP3</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Lengkapi Label Siklus Air!
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Pasangkan 6 label istilah ilmiah ke dalam slot yang tepat pada bagan siklus air di bawah.
      </p>

      <TirtaMascot
        dialogue="Ketuk salah satu kartu label di bawah ini, lalu ketuk kotak slot yang sesuai pada bagan. Jika ingin membatalkan, kamu bisa mengetuk slot itu kembali."
        mood={hasChecked && isPerfect ? 'excited' : 'happy'}
      />

      {/* Label Pool */}
      <div className="mt-4 p-4 rounded-2xl bg-sky-50/80 border border-sky-200">
        <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block mb-2">
          Pilihan Label Istilah:
        </span>
        <div className="flex flex-wrap gap-2">
          {LABELS.map((lbl) => {
            const isSelected = selectedLabel === lbl;
            const isAlreadyPlaced = Object.values(placements).includes(lbl);

            return (
              <button
                key={lbl}
                onClick={() => handleLabelClick(lbl)}
                disabled={hasChecked}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-sky-600 text-white ring-2 ring-sky-300 scale-105'
                    : isAlreadyPlaced
                    ? 'bg-slate-200 text-slate-500 border border-slate-300'
                    : 'bg-white hover:bg-sky-100 text-slate-800 border border-slate-200'
                }`}
              >
                {lbl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Slots List */}
      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        {SLOTS.map((slot) => {
          const placed = placements[slot.id];
          const isCorrect = placed === slot.correctLabel;

          let slotClass = 'bg-white border-slate-200 hover:border-sky-300';
          if (hasChecked) {
            slotClass = isCorrect
              ? 'bg-emerald-50/70 border-emerald-300'
              : 'bg-amber-50/70 border-amber-300';
          } else if (placed) {
            slotClass = 'bg-sky-50 border-sky-300';
          }

          return (
            <div
              key={slot.id}
              onClick={() => handleSlotClick(slot.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between min-h-[110px] ${slotClass}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{slot.name}</span>
                  <span className="text-[11px] text-slate-500 italic">
                    {slot.locationHint}
                  </span>
                </div>

                <div className="mt-2.5">
                  {placed ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs">
                      <span>{placed}</span>
                      {!hasChecked && <span className="text-sky-200 text-xs">✕</span>}
                    </div>
                  ) : (
                    <div className="p-2 border-2 border-dashed border-sky-300 rounded-xl text-xs text-sky-600 font-semibold text-center bg-sky-50/50">
                      + Ketuk untuk menempatkan label
                    </div>
                  )}
                </div>
              </div>

              {/* Reasoned explanation after checking */}
              {hasChecked && (
                <div className="mt-2 text-xs text-slate-700">
                  <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {isCorrect ? '✓ Tepat: ' : '✕ Seharusnya: ' + slot.correctLabel + ' — '}
                  </span>
                  <span>{slot.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {!hasChecked ? (
          <button
            id="check-build-cycle-btn"
            onClick={handleCheck}
            disabled={!allFilled}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-md ${
              allFilled
                ? 'bg-sky-600 hover:bg-sky-700 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Periksa Seluruh Label ({Object.keys(placements).length}/6)
          </button>
        ) : (
          !isPerfect && (
            <button
              id="retry-build-cycle-btn"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Pasang Ulang</span>
            </button>
          )
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
        >
          ← Kembali
        </button>

        {hasChecked && isPerfect && (
          <button
            id="build-cycle-next-btn"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
          >
            <span>Lanjut: Studi Kasus Lingkungan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
