/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Search, CheckCircle2, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import { DETECTIVE_CASES } from '../data/waterCycleData';
import { TirtaMascot } from '../components/TirtaMascot';

interface DetectiveCasesScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const PROCESS_OPTIONS = [
  'Evaporasi',
  'Transpirasi',
  'Kondensasi',
  'Presipitasi',
  'Infiltrasi',
  'Aliran Permukaan',
];

export const DetectiveCasesScreen: React.FC<DetectiveCasesScreenProps> = ({ onNext, onBack }) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const currentCase = DETECTIVE_CASES[currentCaseIndex];
  const selectedAnswer = answers[currentCase.id];
  const isAnswerCorrect = selectedAnswer === currentCase.correctProcess;

  const handleSelect = (process: string) => {
    setAnswers((prev) => ({ ...prev, [currentCase.id]: process }));
    setShowFeedback(true);
  };

  const handleNextCase = () => {
    setShowFeedback(false);
    if (currentCaseIndex < DETECTIVE_CASES.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
    }
  };

  const isAllCasesFinished =
    Object.keys(answers).length === DETECTIVE_CASES.length &&
    currentCaseIndex === DETECTIVE_CASES.length - 1 &&
    showFeedback;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Aktivitas 5 • Detektif Siklus Air
        </span>
        <span>TP2</span>
      </div>

      <div className="flex items-center justify-between gap-2 mb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Kasus Penyelidikan #{currentCaseIndex + 1}
        </h2>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-100 text-sky-800">
          {currentCaseIndex + 1} dari {DETECTIVE_CASES.length} Kasus
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-4">
        Bantulah Tirta menganalisis peristiwa alam nyata berikut. Proses siklus air manakah yang sedang terjadi?
      </p>

      <TirtaMascot
        dialogue="Baca petunjuk penyelidikan dengan cermat. Apakah air menguap, mendingin, meresap, mengalir di permukaan, atau keluar dari daun pohon?"
        mood={showFeedback && isAnswerCorrect ? 'excited' : 'happy'}
      />

      {/* Detective Case Card */}
      <div className="mt-5 p-5 bg-white rounded-3xl border-2 border-sky-200 shadow-sm">
        {/* Situation Badge */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl flex-shrink-0">
            🔍
          </div>
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
              Laporan Peristiwa di Sekitar Kita
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
              “{currentCase.situation}”
            </p>
          </div>
        </div>

        {/* Clue box */}
        <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-950 mb-5">
          <strong>Petunjuk Detektif:</strong> {currentCase.clue}
        </div>

        {/* Options Grid */}
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Pilihlah Proses Ilmiah yang Terjadi:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {PROCESS_OPTIONS.map((proc) => {
            const isSelected = selectedAnswer === proc;
            let btnClass = 'bg-slate-50 border-slate-200 hover:bg-sky-50 hover:border-sky-300 text-slate-700';

            if (showFeedback && isSelected) {
              btnClass = isAnswerCorrect
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200 font-bold'
                : 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-200 font-bold';
            }

            return (
              <button
                key={proc}
                onClick={() => handleSelect(proc)}
                className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition cursor-pointer text-center ${btnClass}`}
              >
                {proc}
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        {showFeedback && (
          <div
            className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm animate-in fade-in ${
              isAnswerCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {isAnswerCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span className="font-bold block mb-1">
                  {isAnswerCorrect ? 'Analisis Tepat!' : 'Analisis Belum Tepat'}
                </span>
                <p className="leading-relaxed">{currentCase.explanation}</p>
              </div>
            </div>

            {/* Next case or finish button */}
            <div className="mt-3 text-right">
              {currentCaseIndex < DETECTIVE_CASES.length - 1 ? (
                <button
                  onClick={handleNextCase}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <span>Lanjut Kasus Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="finish-detective-btn"
                  onClick={onNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <span>Selesai! Lanjut ke Evaluasi Mandiri</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
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
      </div>
    </div>
  );
};
