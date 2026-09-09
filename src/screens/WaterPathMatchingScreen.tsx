/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, RotateCcw, Sparkles } from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface WaterPathMatchingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

interface MatchScenario {
  id: string;
  situation: string;
  icon: string;
  correctTargetId: string;
  explanation: string;
}

const SCENARIOS: MatchScenario[] = [
  {
    id: 'sc-1',
    situation: 'Air hujan jatuh membasahi taman sekolah dengan tanah berumput dan akar pohon.',
    icon: '🌱',
    correctTargetId: 'infiltrasi',
    explanation:
      'Tepat! Tanah yang berpori dan berakar memungkinkan air hujan meresap ke dalam bumi melalui proses infiltrasi menjadi air tanah.',
  },
  {
    id: 'sc-2',
    situation: 'Air hujan deras mengguyur jalan beraspal dan halaman yang disemen padat.',
    icon: '🛣️',
    correctTargetId: 'aliran',
    explanation:
      'Tepat! Aspal dan semen kedap air sehingga air tidak dapat meresap, melainkan melimpas di atas permukaan sebagai aliran permukaan (runoff).',
  },
  {
    id: 'sc-3',
    situation: 'Air mengalir deras menuruni lereng bukit melintasi parit menuju sungai besar.',
    icon: '🏔️',
    correctTargetId: 'badan_air',
    explanation:
      'Tepat! Aliran air permukaan mengikuti kemiringan lereng akibat gaya gravitasi dan bermuara menuju sungai atau danau.',
  },
];

const TARGETS = [
  { id: 'infiltrasi', label: 'Infiltrasi (Meresap ke Dalam Tanah)', color: 'bg-amber-100 border-amber-300 text-amber-900' },
  { id: 'aliran', label: 'Aliran Permukaan (Limpasan di Atas Tanah)', color: 'bg-teal-100 border-teal-300 text-teal-900' },
  { id: 'badan_air', label: 'Menuju Sungai & Badan Air', color: 'bg-blue-100 border-blue-300 text-blue-900' },
];

export const WaterPathMatchingScreen: React.FC<WaterPathMatchingScreenProps> = ({ onNext, onBack }) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [hasChecked, setHasChecked] = useState(false);

  const handleSelectTarget = (scenarioId: string, targetId: string) => {
    if (hasChecked) return;
    setMatches((prev) => ({ ...prev, [scenarioId]: targetId }));
  };

  const allAssigned = SCENARIOS.every((sc) => !!matches[sc.id]);
  const isAllCorrect = SCENARIOS.every((sc) => matches[sc.id] === sc.correctTargetId);

  const handleCheck = () => {
    setHasChecked(true);
  };

  const handleReset = () => {
    setMatches({});
    setHasChecked(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Aktivitas 3 • Memasangkan Jalur Air
        </span>
        <span>TP2, TP5</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Pasangkan Situasi dengan Jalur Air yang Tepat!
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Pilihlah jalur yang paling sesuai untuk setiap peristiwa jatuhnya air hujan berikut ini.
      </p>

      <TirtaMascot
        dialogue="Perhatikan jenis permukaan tempat air hujan jatuh. Apakah tanahnya berpori dan gembur, atau permukaannya keras kedap air?"
        mood={hasChecked && isAllCorrect ? 'excited' : 'happy'}
      />

      {/* Scenarios matching list */}
      <div className="mt-5 space-y-4">
        {SCENARIOS.map((sc) => {
          const selectedTarget = matches[sc.id];
          const isCorrect = selectedTarget === sc.correctTargetId;

          return (
            <div
              key={sc.id}
              className={`p-4 rounded-2xl border transition-all ${
                hasChecked
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-amber-50/70 border-amber-300'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{sc.icon}</span>
                <div className="flex-1">
                  <span className="font-bold text-slate-900 text-sm block">
                    {sc.situation}
                  </span>
                </div>
              </div>

              {/* Target Options Selector */}
              <div className="grid sm:grid-cols-3 gap-2 mt-2">
                {TARGETS.map((tgt) => {
                  const isChosen = selectedTarget === tgt.id;
                  return (
                    <button
                      key={tgt.id}
                      onClick={() => handleSelectTarget(sc.id, tgt.id)}
                      disabled={hasChecked}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer flex items-center gap-1.5 ${
                        isChosen
                          ? 'bg-sky-600 border-sky-600 text-white shadow-xs'
                          : 'bg-slate-50 hover:bg-sky-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
                        {isChosen ? '✓' : ''}
                      </span>
                      <span className="truncate">{tgt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Reasoned Feedback after checking */}
              {hasChecked && (
                <div className="mt-3 p-3 rounded-xl bg-white/90 border border-slate-200 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {isCorrect ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Jawaban Tepat!
                      </span>
                    ) : (
                      <span className="text-amber-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Perlu Dicermati Kembali
                      </span>
                    )}
                  </div>
                  <p>{sc.explanation}</p>
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
            id="check-path-match-btn"
            onClick={handleCheck}
            disabled={!allAssigned}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-md ${
              allAssigned
                ? 'bg-sky-600 hover:bg-sky-700 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Periksa Pasangan ({Object.keys(matches).length}/3)
          </button>
        ) : (
          !isAllCorrect && (
            <button
              id="retry-path-match-btn"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Pasangkan Ulang</span>
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

        {hasChecked && isAllCorrect && (
          <button
            id="path-match-next-btn"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
          >
            <span>Lanjut: Siklus Air Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
