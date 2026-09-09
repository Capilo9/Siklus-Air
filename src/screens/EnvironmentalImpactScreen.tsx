/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Trees, Building2, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface EnvironmentalImpactScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const EnvironmentalImpactScreen: React.FC<EnvironmentalImpactScreenProps> = ({
  onNext,
  onBack,
}) => {
  const [q1Answer, setQ1Answer] = useState<'A' | 'B' | null>(null);
  const [q2Answer, setQ2Answer] = useState<string | null>(null);

  const q2Options = [
    {
      id: 'A',
      text: 'Infiltrasi meningkat tajam dan air sumur bertambah sangat banyak.',
      isCorrect: false,
    },
    {
      id: 'B',
      text: 'Aliran permukaan meningkat pesat memicu banjir, sementara cadangan air tanah menipis.',
      isCorrect: true,
    },
    {
      id: 'C',
      text: 'Matahari berhenti bersinar di atas pemukiman tersebut.',
      isCorrect: false,
    },
    {
      id: 'D',
      text: 'Siklus air berhenti total di seluruh planet bumi.',
      isCorrect: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Pos 6 • Studi Kasus Lingkungan
        </span>
        <span>TP6, TP7</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Studi Kasus: Apa yang Terjadi Jika Pohon Berkurang?
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Bandingkan dua kondisi lingkungan di bawah ini saat hujan deras mengguyur bumi:
      </p>

      {/* Side-by-side Visual Comparison SVG */}
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        {/* Condition A: Green & Trees */}
        <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-emerald-700" />
                Kondisi A: Kawasan Hijau
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                Alami
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Banyak pepohonan rindang dengan sistem akar kuat dan hamparan tanah terbuka berpori.
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <div>
              💧 <strong>Infiltrasi Tinggi:</strong> Air hujan diserap cepat ke dalam tanah.
            </div>
            <div>
              🌳 <strong>Transpirasi Berjalan:</strong> Daun pohon melepas uap air sejuk.
            </div>
            <div>
              🛡️ <strong>Aman Banjir:</strong> Limpasan permukaan terkendali.
            </div>
          </div>
        </div>

        {/* Condition B: Concrete & Pavement */}
        <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-700" />
                Kondisi B: Kawasan Padat Beton
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                Penuh Semen
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Pohon ditebang, seluruh halaman ditutup semen/aspal padat tanpa lubang resapan.
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <div>
              ⚠️ <strong>Infiltrasi Sangat Rendah:</strong> Air tidak bisa tembus semen.
            </div>
            <div>
              🌊 <strong>Aliran Permukaan Liar:</strong> Air melimpas memicu genangan banjir.
            </div>
            <div>
              📉 <strong>Air Tanah Menipis:</strong> Sumur warga terancam kekeringan.
            </div>
          </div>
        </div>
      </div>

      <TirtaMascot
        dialogue="Tanah yang subur dan akar pepohonan bertindak seperti spons raksasa yang menyerap air hujan. Namun jika manusia menutup semua tanah dengan semen tebal, aku tidak bisa masuk ke dalam tanah!"
        mood="explaining"
      />

      {/* Question 1 */}
      <div className="mt-5 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-2 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-sky-600" />
          <span>Pertanyaan 1: Kondisi mana yang memungkinkan lebih banyak air meresap ke tanah (infiltrasi)?</span>
        </h3>

        <div className="flex gap-3">
          <button
            id="case-ans-a"
            onClick={() => setQ1Answer('A')}
            className={`flex-1 p-3 rounded-xl border text-xs sm:text-sm font-bold transition cursor-pointer ${
              q1Answer === 'A'
                ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300'
                : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border-slate-200'
            }`}
          >
            Kondisi A (Kawasan Hijau & Pohon)
          </button>

          <button
            id="case-ans-b"
            onClick={() => setQ1Answer('B')}
            className={`flex-1 p-3 rounded-xl border text-xs sm:text-sm font-bold transition cursor-pointer ${
              q1Answer === 'B'
                ? 'bg-amber-600 text-white border-amber-600 ring-2 ring-amber-300'
                : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200'
            }`}
          >
            Kondisi B (Kawasan Padat Semen)
          </button>
        </div>

        {q1Answer && (
          <p className="mt-2 text-xs font-semibold text-emerald-800">
            {q1Answer === 'A'
              ? '✓ Tepat sekali! Tanah berpori dan akar tumbuhan menyerap air dengan cepat.'
              : '✕ Kurang tepat. Semen padat kedap air sehingga mencegah air meresap.'}
          </p>
        )}
      </div>

      {/* Question 2 */}
      {q1Answer === 'A' && (
        <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs animate-in fade-in">
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-2 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>Pertanyaan 2: Apa dampak buruk jika permukaan tanah tertutup semen tanpa daerah resapan?</span>
          </h3>

          <div className="space-y-2">
            {q2Options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setQ2Answer(opt.id)}
                className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition cursor-pointer flex items-center gap-2 ${
                  q2Answer === opt.id
                    ? opt.isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200'
                      : 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-200'
                    : 'bg-slate-50 hover:bg-sky-50 text-slate-700 border-slate-200'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-white border border-slate-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {opt.id}
                </span>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>

          {q2Answer && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
              <strong>Kesimpulan Penting:</strong> Menjaga kelestarian pohon dan membuat lubang biopori / sumur resapan sangat penting agar air hujan dapat meresap ke dalam tanah, mencegah banjir, dan menjaga cadangan air tanah kita!
            </div>
          )}
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

        {q2Answer === 'B' && (
          <button
            id="env-case-next-btn"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
          >
            <span>Lanjut: Aktivitas Detektif Siklus Air</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
