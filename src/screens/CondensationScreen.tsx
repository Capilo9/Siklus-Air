/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, ThermometerSnowflake, Cloud, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { CondensationZoomSvg } from '../components/SvgIllustrations';
import { TirtaMascot } from '../components/TirtaMascot';

interface CondensationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const CondensationScreen: React.FC<CondensationScreenProps> = ({ onNext, onBack }) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'difference'>('visual');

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Pos 2 • Pembentukan Awan
        </span>
        <span>TP2, TP5</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Kondensasi: Bagaimana Awan Terbentuk?
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Saat uap air membubung tinggi ke langit, suhu udara semakin dingin. Apa yang terjadi pada uap air tersebut?
      </p>

      {/* Condensation Zoom Diagram */}
      <div className="bg-white p-3 rounded-2xl border border-sky-100 shadow-sm mb-5">
        <CondensationZoomSvg />
      </div>

      <TirtaMascot
        dialogue="Banyak orang mengira awan adalah asap atau gas uap air. Padahal sebenarnya tidak! Ketika aku (uap air) naik ke lapisan udara dingin, aku berubah wujud menjadi tetesan air kecil dan berkumpul bersama teman-temanku membentuk awan putih yang kamu lihat!"
        mood="explaining"
      />

      {/* Scientific Comparison Card (Preventing Misconception 3) */}
      <div className="mt-5 bg-sky-50/70 rounded-2xl border border-sky-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            Catatan Sains Penting: Jangan Sampai Keliru!
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          {/* Box 1: Uap Air */}
          <div className="p-3.5 bg-white rounded-xl border border-sky-200">
            <div className="flex items-center gap-2 font-bold text-sky-800 mb-1">
              <Eye className="w-4 h-4 text-slate-400" />
              <span>UAP AIR (Gas)</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Wujud berupa <strong>gas transparan tak kasat mata</strong>. Berada di sekeliling udara yang kita hirup tanpa bisa kita lihat secara langsung.
            </p>
          </div>

          {/* Box 2: Titik Air Awan */}
          <div className="p-3.5 bg-white rounded-xl border border-sky-200">
            <div className="flex items-center gap-2 font-bold text-sky-800 mb-1">
              <Cloud className="w-4 h-4 text-sky-600" />
              <span>AWAN (Cair / Padat Mikro)</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Bukan gas! Awan adalah kumpulan <strong>miliaran tetesan air cair sangat kecil</strong> atau kristal es yang memantulkan sinar matahari sehingga tampak putih atau kelabu.
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white/90 rounded-xl border border-sky-100 flex items-start gap-2 text-xs text-sky-950">
          <ThermometerSnowflake className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Definisi KONDENSASI:</strong> Perubahan wujud dari uap air (gas) menjadi titik-titik air (cair) akibat penurunan suhu / pendinginan udara di atmosfer.
          </span>
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
          id="cond-next-btn"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
        >
          <span>Lanjut: Susun Proses Pembentukan Awan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
