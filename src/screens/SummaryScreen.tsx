/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sun, Droplet, Cloud, CloudRain, Trees, Layers, RefreshCw, Heart } from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface SummaryScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({ onNext, onBack }) => {
  const summarySteps = [
    {
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      title: '1. Matahari Memberikan Energi Panas',
      desc: 'Pancaran sinar matahari menghangatkan permukaan laut, danau, sungai, dan daratan.',
      color: 'bg-amber-50 border-amber-200 text-amber-950',
    },
    {
      icon: <Droplet className="w-5 h-5 text-orange-500" />,
      title: '2. Evaporasi & Transpirasi (Penguapan)',
      desc: 'Air di permukaan bumi menguap (evaporasi) dan tumbuhan melepaskan uap air melalui daun (transpirasi).',
      color: 'bg-orange-50 border-orange-200 text-orange-950',
    },
    {
      icon: <Cloud className="w-5 h-5 text-sky-500" />,
      title: '3. Kondensasi (Membentuk Awan)',
      desc: 'Uap air naik ke udara dingin, mengalami pendinginan, lalu berubah menjadi miliaran tetesan air mikro yang berkumpul membentuk awan.',
      color: 'bg-sky-50 border-sky-200 text-sky-950',
    },
    {
      icon: <CloudRain className="w-5 h-5 text-blue-600" />,
      title: '4. Presipitasi (Turunnya Hujan)',
      desc: 'Saat butiran air di awan saling menyatu menjadi cukup besar dan berat, air jatuh tertarik gravitasi bumi sebagai hujan.',
      color: 'bg-blue-50 border-blue-200 text-blue-950',
    },
    {
      icon: <Layers className="w-5 h-5 text-yellow-700" />,
      title: '5. Infiltrasi & Aliran Permukaan',
      desc: 'Sebagian air hujan meresap ke dalam tanah menjadi air tanah (infiltrasi), dan sebagian lagi mengalir di permukaan tanah (runoff).',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-950',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-emerald-600" />,
      title: '6. Air Terkumpul & Siklus Terus Berulang',
      desc: 'Air mengalir kembali ke sungai, danau, atau samudra, siap untuk kembali dipanaskan oleh matahari. Siklus berputar tiada akhir!',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Pos 7 • Rangkuman Materi
        </span>
        <span>TP1 – TP7</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Rangkuman Visual Siklus Air
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Berikut adalah intisari perjalanan air di planet bumi yang sudah kita pelajari bersama:
      </p>

      {/* Structured Flow Cards */}
      <div className="space-y-2.5 mb-5">
        {summarySteps.map((step, i) => (
          <div
            key={i}
            className={`p-3.5 rounded-2xl border flex items-start gap-3 shadow-xs ${step.color}`}
          >
            <div className="p-2 rounded-xl bg-white/90 shadow-xs flex-shrink-0">
              {step.icon}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Environmental Care Message Card */}
      <div className="p-4 rounded-2xl bg-emerald-100/70 border border-emerald-300 flex items-start gap-3 text-xs sm:text-sm text-emerald-950 mb-5">
        <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Pesan Peduli Lingkungan:</strong> Air tidak akan pernah habis jumlahnya, namun ketersediaan <em>air bersih yang siap minum</em> sangat bergantung pada kelestarian alam kita. Menjaga pohon, memperbanyak taman tanah resapan, serta tidak mencemari sungai adalah tanggung jawab kita semua!
        </div>
      </div>

      <TirtaMascot
        dialogue="Sekarang saatnya kamu menuliskan kesan dan temuan menarikmu pada lembar refleksi diri!"
        mood="happy"
      />

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
        >
          ← Kembali
        </button>

        <button
          id="summary-to-reflection-btn"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
        >
          <span>Lanjut ke Lembar Refleksi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
