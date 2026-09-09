/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, RotateCcw, MoveUp, MoveDown, Check } from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface CloudSequencingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

interface StepCard {
  id: string;
  correctIndex: number;
  text: string;
}

const INITIAL_CARDS: StepCard[] = [
  {
    id: 'step-3',
    correctIndex: 2,
    text: 'Uap air yang ringan naik tinggi ke lapisan atmosfer atas.',
  },
  {
    id: 'step-1',
    correctIndex: 0,
    text: 'Matahari memancarkan energi panas menyinari permukaan air bumi.',
  },
  {
    id: 'step-4',
    correctIndex: 3,
    text: 'Uap air mengalami pendinginan suhu dan berkondensasi menjadi titik-titik air pembentuk awan.',
  },
  {
    id: 'step-2',
    correctIndex: 1,
    text: 'Air di permukaan menyerap panas dan berubah wujud menjadi uap air (evaporasi).',
  },
];

export const CloudSequencingScreen: React.FC<CloudSequencingScreenProps> = ({ onNext, onBack }) => {
  const [cards, setCards] = useState<StepCard[]>(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  // Move a card up or down
  const moveCard = (index: number, direction: 'up' | 'down') => {
    if (hasChecked) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= cards.length) return;

    const newCards = [...cards];
    const temp = newCards[index];
    newCards[index] = newCards[targetIndex];
    newCards[targetIndex] = temp;
    setCards(newCards);
  };

  // Tap-to-select then tap-to-swap accessible interaction
  const handleCardTap = (id: string, index: number) => {
    if (hasChecked) return;
    if (!selectedCardId) {
      setSelectedCardId(id);
    } else if (selectedCardId === id) {
      setSelectedCardId(null);
    } else {
      // Swap the selected card with the tapped card
      const sourceIndex = cards.findIndex((c) => c.id === selectedCardId);
      const newCards = [...cards];
      const temp = newCards[sourceIndex];
      newCards[sourceIndex] = newCards[index];
      newCards[index] = temp;
      setCards(newCards);
      setSelectedCardId(null);
    }
  };

  const isCorrect = cards.every((c, idx) => c.correctIndex === idx);

  const handleCheck = () => {
    setHasChecked(true);
  };

  const handleReset = () => {
    setCards(INITIAL_CARDS);
    setSelectedCardId(null);
    setHasChecked(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Aktivitas 2 • Mengurutkan Peristiwa
        </span>
        <span>TP3, TP4</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Susun Peristiwa Terbentuknya Awan
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Urutkan 4 kartu tahapan berikut dari urutan awal (nomor 1) hingga terbentuknya awan (nomor 4).
      </p>

      <TirtaMascot
        dialogue="Gunakan tombol panah Naik / Turun, atau ketuk satu kartu lalu ketuk kartu lain untuk menukar posisinya sampai alurnya masuk akal!"
        mood={hasChecked && isCorrect ? 'excited' : hasChecked ? 'thinking' : 'happy'}
      />

      {/* Accessible Sorting Container */}
      <div className="mt-5 space-y-3">
        {cards.map((card, index) => {
          const isSelected = selectedCardId === card.id;
          const isItemInCorrectPosition = card.correctIndex === index;

          let cardBorder = 'border-slate-200 bg-white hover:border-sky-300';
          if (isSelected) {
            cardBorder = 'border-sky-500 bg-sky-50 ring-2 ring-sky-300';
          } else if (hasChecked) {
            cardBorder = isItemInCorrectPosition
              ? 'border-emerald-400 bg-emerald-50/60'
              : 'border-amber-400 bg-amber-50/60';
          }

          return (
            <div
              key={card.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 shadow-xs ${cardBorder}`}
            >
              {/* Order Number & Content */}
              <div
                onClick={() => handleCardTap(card.id, index)}
                className="flex items-center gap-3.5 flex-1 cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                    hasChecked
                      ? isItemInCorrectPosition
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 text-white'
                      : 'bg-sky-100 text-sky-800'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                  {card.text}
                </div>
              </div>

              {/* Controls: Up/Down arrow buttons for accessibility */}
              {!hasChecked && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => moveCard(index, 'up')}
                    disabled={index === 0}
                    className={`p-2 rounded-xl transition ${
                      index === 0
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-sky-700 hover:bg-sky-100 cursor-pointer'
                    }`}
                    title="Pindah ke Atas"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => moveCard(index, 'down')}
                    disabled={index === cards.length - 1}
                    className={`p-2 rounded-xl transition ${
                      index === cards.length - 1
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-sky-700 hover:bg-sky-100 cursor-pointer'
                    }`}
                    title="Pindah ke Bawah"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Check & Retry Buttons */}
      <div className="mt-5 flex items-center justify-center gap-3">
        {!hasChecked ? (
          <button
            id="check-cloud-seq-btn"
            onClick={handleCheck}
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            Periksa Urutan Saya
          </button>
        ) : (
          !isCorrect && (
            <button
              id="retry-cloud-seq-btn"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Susun Ulang</span>
            </button>
          )
        )}
      </div>

      {/* Feedback Banner */}
      {hasChecked && (
        <div
          className={`mt-5 p-4 rounded-2xl border text-xs sm:text-sm animate-in fade-in ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className="font-bold">
                {isCorrect
                  ? 'Hebat! Kamu berhasil menunjukkan perjalanan air dari permukaan bumi hingga membentuk awan!'
                  : 'Belum tepat. Ingat konsepnya: air di permukaan harus memperoleh energi panas matahari terlebih dahulu sebelum dapat menguap dan naik ke lapisan udara yang dingin.'}
              </p>
            </div>
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

        {hasChecked && isCorrect && (
          <button
            id="cloud-seq-next-btn"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
          >
            <span>Lanjut: Mengapa Hujan Turun?</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
