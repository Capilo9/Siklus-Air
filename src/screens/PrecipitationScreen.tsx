/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, CloudRain, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { PrecipitationZoomSvg } from '../components/SvgIllustrations';
import { TirtaMascot } from '../components/TirtaMascot';

interface PrecipitationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const PrecipitationScreen: React.FC<PrecipitationScreenProps> = ({ onNext, onBack }) => {
  const [predictionAnswer, setPredictionAnswer] = useState<'yes' | 'no' | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Pos 3 • Terjadinya Hujan
        </span>
        <span>TP2, TP5</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Presipitasi: Mengapa Hujan Bisa Turun?
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Awan tidak serta-merta menjatuhkan air. Amati 3 tahapan pembentukan tetesan hujan pada diagram di bawah ini:
      </p>

      {/* Precipitation Zoom SVG */}
      <div className="bg-white p-3 rounded-2xl border border-sky-100 shadow-sm mb-5">
        <PrecipitationZoomSvg />
      </div>

      <TirtaMascot
        dialogue="Di dalam awan yang gelap dan tebal, aku dan jutaan tetesan air lainnya saling bertabrakan dan bergabung. Saat tubuh kami sudah terlalu besar dan berat, udara tidak kuat lagi menahan kami. Wussshh... kami pun meluncur jatuh ke bumi sebagai hujan!"
        mood="excited"
      />

      {/* Scientific Definition */}
      <div className="mt-5 p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
        <div className="flex items-center gap-2 font-bold text-blue-900 text-sm mb-1">
          <CloudRain className="w-5 h-5 text-blue-600" />
          <span>Istilah Ilmiah: PRESIPITASI</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong>Presipitasi</strong> adalah segala bentuk air (cair seperti hujan/gerimis, atau beku seperti salju dan hujan es) yang jatuh dari awan menuju permukaan bumi. Di wilayah tropis Indonesia, presipitasi hampir selalu berwujud <strong>air hujan</strong>.
        </p>
      </div>

      {/* Prediction Interactive Question */}
      <div className="mt-5 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-3">
          <HelpCircle className="w-4 h-4 text-sky-600" />
          <span>Pertanyaan Prediksi Ilmiah:</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 mb-3 font-medium">
          “Menurutmu, apakah setiap gumpalan awan yang tampak di langit pasti langsung menghasilkan hujan?”
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <button
            id="pred-ans-yes"
            onClick={() => setPredictionAnswer('yes')}
            className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition cursor-pointer text-left ${
              predictionAnswer === 'yes'
                ? 'border-amber-400 bg-amber-50 text-amber-900 ring-2 ring-amber-200'
                : 'border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-700'
            }`}
          >
            A. Ya, karena semua awan terbuat dari air sehingga pasti segera turun hujan.
          </button>

          <button
            id="pred-ans-no"
            onClick={() => setPredictionAnswer('no')}
            className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition cursor-pointer text-left ${
              predictionAnswer === 'no'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200'
                : 'border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-700'
            }`}
          >
            B. Tidak, hujan hanya turun bila butiran air sudah menyatu menjadi cukup besar dan berat.
          </button>
        </div>

        {/* Reasoned Feedback */}
        {predictionAnswer && (
          <div
            className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm animate-in fade-in ${
              predictionAnswer === 'no'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-2">
              {predictionAnswer === 'no' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold mb-1">
                  {predictionAnswer === 'no' ? 'Tepat Sekali!' : 'Mari Renungkan Kembali:'}
                </p>
                <p className="leading-relaxed">
                  Tidak semua awan langsung menghasilkan hujan. Awan putih tipis (seperti awan sirus atau kumulus kecil) butiran airnya masih sangat ringan sehingga tetap melayang ditahan arus udara naik. Hujan baru jatuh ketika butiran air bergabung menjadi cukup besar dan gravitasi bumi menariknya ke tanah!
                </p>
              </div>
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

        <button
          id="precip-next-btn"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
        >
          <span>Lanjut: Ke Mana Air Hujan Pergi?</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
