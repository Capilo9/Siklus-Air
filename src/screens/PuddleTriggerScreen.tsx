/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, HelpCircle, CheckCircle2, AlertCircle, RotateCcw, Lightbulb } from 'lucide-react';
import { PuddleComparisonSvg } from '../components/SvgIllustrations';
import { TirtaMascot } from '../components/TirtaMascot';

interface PuddleTriggerScreenProps {
  onNext: () => void;
  onBackToMap: () => void;
}

export const PuddleTriggerScreen: React.FC<PuddleTriggerScreenProps> = ({ onNext, onBackToMap }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const options = [
    {
      id: 'A',
      text: 'Air menghilang begitu saja tanpa jejak.',
      isCorrect: false,
      feedback: 'Zat cair tidak pernah musnah atau hilang begitu saja ke ketiadaan!',
    },
    {
      id: 'B',
      text: 'Air masuk seluruhnya ke dalam tanah.',
      isCorrect: false,
      feedback: 'Sebagian air mungkin meresap, namun pada permukaan keras di siang hari yang terik, ada proses penting lain yang terjadi di udara.',
    },
    {
      id: 'C',
      text: 'Sebagian besar air berubah wujud menjadi uap air karena panas matahari.',
      isCorrect: true,
      feedback: 'Tepat sekali! Energi panas matahari membuat molekul air bergerak semakin cepat hingga berubah menjadi uap air tak kasat mata. Proses ini disebut evaporasi (penguapan).',
    },
    {
      id: 'D',
      text: 'Air berubah menjadi debu kering di halaman.',
      isCorrect: false,
      feedback: 'Air tidak berubah menjadi debu. Debu adalah partikel tanah kering yang tertinggal setelah air menguap.',
    },
  ];

  const handleSelect = (id: string) => {
    setSelectedOption(id);
    setShowFeedback(true);
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const isSelectedCorrect = options.find((o) => o.id === selectedOption)?.isCorrect;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Breadcrumb / Step Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Pos 1 • Pemantik Masalah
        </span>
        <span>TP1, TP4</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Ke Mana Air Genangan Itu Pergi?
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Amati perubahan halaman sekolah SDN Sadeng 02 pada gambar perbandingan di bawah ini.
      </p>

      {/* Comparison SVG Illustration */}
      <div className="bg-white p-3 rounded-2xl border border-sky-100 shadow-sm mb-5">
        <PuddleComparisonSvg />
      </div>

      {/* Tirta Mascot Prompt */}
      <TirtaMascot
        dialogue="Pagi tadi sebelum bel masuk sekolah berbunyi, ada genangan air hujan di lapangan. Namun saat istirahat siang di bawah terik matahari, genangan itu mengecil dan mengering. Menurutmu, ke mana air itu pergi?"
        mood={isSelectedCorrect ? 'excited' : selectedOption ? 'thinking' : 'happy'}
      />

      {/* Question & Options */}
      <div className="mt-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-3">
          <HelpCircle className="w-4 h-4 text-sky-600" />
          <span>Pilihlah dugaan ilmiah yang paling tepat:</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-2.5">
          {options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            let btnStyle = 'border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-700';

            if (showFeedback && isSelected) {
              btnStyle = opt.isCorrect
                ? 'border-emerald-400 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                : 'border-amber-400 bg-amber-50 text-amber-900 ring-2 ring-amber-200';
            }

            return (
              <button
                key={opt.id}
                id={`puddle-option-${opt.id}`}
                onClick={() => handleSelect(opt.id)}
                disabled={showFeedback && isSelectedCorrect}
                className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition cursor-pointer flex items-start gap-2.5 ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {opt.id}
                </span>
                <span className="flex-1 leading-snug">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {showFeedback && (
          <div
            className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm animate-in fade-in duration-200 ${
              isSelectedCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {isSelectedCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="space-y-2 flex-1">
                <p className="font-semibold leading-relaxed">
                  {options.find((o) => o.id === selectedOption)?.feedback}
                </p>

                {!isSelectedCorrect && (
                  <div className="p-3 bg-white/80 rounded-lg border border-amber-200 flex items-start gap-2 text-xs text-amber-800">
                    <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Petunjuk dari Tirta:</strong> Coba pikirkan apa yang terjadi pada pakaian basah yang dijemur ibumu di bawah terik sinar matahari. Mengapa pakaian itu bisa kering?
                    </span>
                  </div>
                )}
              </div>
            </div>

            {!isSelectedCorrect && (
              <div className="mt-3 text-right">
                <button
                  id="puddle-retry-btn"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Coba Pikirkan Lagi</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onBackToMap}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
        >
          ← Peta Belajar
        </button>

        {isSelectedCorrect && (
          <button
            id="puddle-next-btn"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
          >
            <span>Lanjut Eksplorasi: Penguapan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
