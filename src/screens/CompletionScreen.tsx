/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Map, BookOpen, RotateCcw, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface CompletionScreenProps {
  onGoHome: () => void;
  onGoMap: () => void;
  onGoSummary: () => void;
  onRestart: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  onGoHome,
  onGoMap,
  onGoSummary,
  onRestart,
}) => {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 text-center flex flex-col items-center">
      {/* Big Cheerful Badge */}
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center text-4xl shadow-lg mb-4">
        💧
      </div>

      <span className="text-xs font-bold text-sky-800 uppercase tracking-widest bg-sky-100 px-3.5 py-1 rounded-full mb-2">
        Selesai dengan Sukses
      </span>

      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
        PETUALANGAN TIRTA SELESAI!
      </h1>

      <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
        Selamat! Sekarang kamu sudah mengetahui bahwa air terus bergerak melalui siklus tanpa henti yang sangat berharga bagi kelangsungan seluruh makhluk hidup di bumi.
      </p>

      {/* Tirta Dialog */}
      <div className="w-full max-w-lg mb-8">
        <TirtaMascot
          dialogue="Terima kasih banyak sudah menemaniku berkeliling dari laut, naik menjadi awan, lalu turun kembali ke tanah sekolahmu! Ingat untuk selalu menjaga pepohonan dan menghemat air ya, teman pintar!"
          mood="excited"
          size="lg"
        />
      </div>

      {/* Action Navigation Options */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
        <button
          id="completion-summary-btn"
          onClick={onGoSummary}
          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Lihat Rangkuman</span>
        </button>

        <button
          id="completion-map-btn"
          onClick={onGoMap}
          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-sky-50 text-sky-800 border border-sky-200 text-xs sm:text-sm font-bold rounded-2xl shadow-xs transition cursor-pointer"
        >
          <Map className="w-4 h-4" />
          <span>Buka Peta Belajar</span>
        </button>

        <button
          id="completion-home-btn"
          onClick={onGoHome}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-2xl transition cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda Utama</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-xs text-slate-400 font-medium">
        MPI Siklus Air • Dibuat oleh Pak Madi • SDN Sadeng 02 • Kurikulum Merdeka IPAS Kelas V
      </div>
    </div>
  );
};
