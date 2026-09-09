/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Compass, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface WaterDestinationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const WaterDestinationScreen: React.FC<WaterDestinationScreenProps> = ({ onNext, onBack }) => {
  const [activePath, setActivePath] = useState<'infiltrasi' | 'aliran' | 'pengumpulan'>('infiltrasi');

  const pathDetails = {
    infiltrasi: {
      title: '1. Infiltrasi (Meresap ke Dalam Tanah)',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description:
        'Air hujan yang jatuh ke tanah berumput, perkebunan, atau hutan akan meresap ke bawah melalui pori-pori tanah dan celah bebatuan. Air ini menjadi AIR TANAH yang sangat bersih, tersimpan di bawah bumi, dan menjadi sumber air sumur atau mata air pegunungan yang kita minum.',
    },
    aliran: {
      title: '2. Aliran Permukaan / Limpasan (Runoff)',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      description:
        'Jika tanah sudah jenuh (penuh air) atau air jatuh di permukaan kedap air seperti bebatuan cadas, jalan aspal, dan lantai semen, air tidak dapat meresap. Air ini akan mengalir di atas permukaan tanah mengikuti gaya gravitasi menuju tempat yang lebih rendah, seperti selokan dan anak sungai.',
    },
    pengumpulan: {
      title: '3. Pengumpulan (Badan Air & Muara Laut)',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      description:
        'Aliran sungai membawa air melintasi lembah hingga akhirnya terkumpul kembali di danau, waduk penampungan, atau bermuara ke samudra luas. Di sinilah air siap kembali dipanaskan oleh matahari untuk memulai siklus selanjutnya!',
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Pos 4 • Perjalanan Air di Bumi
        </span>
        <span>TP2, TP5</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Ke Mana Air Hujan Pergi Setelah Menyentuh Bumi?
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Saat tetesan air hujan jatuh dari awan ke daratan, air tidak langsung mengalir semuanya ke sungai. Ada 3 jalur utama perjalanan air:
      </p>

      {/* Interactive Path Diagram (SVG Landscape) */}
      <div className="bg-white rounded-3xl border-2 border-sky-200 overflow-hidden shadow-sm p-4">
        {/* Toggle Path Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <button
            id="path-infiltrasi-btn"
            onClick={() => setActivePath('infiltrasi')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activePath === 'infiltrasi'
                ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-slate-100 text-slate-700 hover:bg-amber-50'
            }`}
          >
            🌱 Infiltrasi (Air Tanah)
          </button>

          <button
            id="path-aliran-btn"
            onClick={() => setActivePath('aliran')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activePath === 'aliran'
                ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-300'
                : 'bg-slate-100 text-slate-700 hover:bg-teal-50'
            }`}
          >
            🌊 Aliran Permukaan (Limpasan)
          </button>

          <button
            id="path-pengumpulan-btn"
            onClick={() => setActivePath('pengumpulan')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activePath === 'pengumpulan'
                ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300'
                : 'bg-slate-100 text-slate-700 hover:bg-blue-50'
            }`}
          >
            🏞️ Pengumpulan (Sungai & Laut)
          </button>
        </div>

        {/* Photographic Visualization of Water Pathways */}
        <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden bg-slate-900 border border-sky-100 shadow-md aspect-[16/9]">
          {activePath === 'infiltrasi' && (
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80"
              alt="Hutan dan tanah berpori menyerap air hujan (infiltrasi)"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover animate-in fade-in duration-500"
            />
          )}

          {activePath === 'aliran' && (
            <img
              src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80"
              alt="Aliran limpasan permukaan air menuruni lereng menuju lembah"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover animate-in fade-in duration-500"
            />
          )}

          {activePath === 'pengumpulan' && (
            <img
              src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1000&q=80"
              alt="Air terkumpul di danau dan laut luas"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover animate-in fade-in duration-500"
            />
          )}

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

          {/* Educational Process Badges Overlaid on Photo */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                🌧️ Air Hujan Turun ke Permukaan Bumi
              </span>
              <span className="bg-sky-600 text-white px-2.5 py-1 rounded-lg text-xs font-black shadow-md">
                {activePath === 'infiltrasi' && '🌱 Infiltrasi Tanah'}
                {activePath === 'aliran' && '🌊 Limpasan Permukaan'}
                {activePath === 'pengumpulan' && '🏞️ Penampungan Air'}
              </span>
            </div>

            <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-white/50 text-slate-900 text-xs shadow-lg max-w-lg">
              {activePath === 'infiltrasi' && (
                <p>
                  💧 <strong>Air meresap ke akar & tanah:</strong> Menjadi cadangan air tanah bersih yang kita gunakan untuk sumur dan mata air alami.
                </p>
              )}
              {activePath === 'aliran' && (
                <p>
                  🌊 <strong>Air mengalir di atas tanah:</strong> Karena tanah jenuh atau permukaan keras, air melimpas mengalir menuruni lereng menuju anak sungai.
                </p>
              )}
              {activePath === 'pengumpulan' && (
                <p>
                  🏞️ <strong>Terkumpul di badan air:</strong> Aliran air bermuara ke danau atau samudra luas, bersiap kembali mengulang siklus evaporasi!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Detail Card */}
        <div className={`mt-4 p-4 rounded-2xl border ${pathDetails[activePath].badgeColor} transition-all`}>
          <h3 className="font-bold text-sm mb-1">{pathDetails[activePath].title}</h3>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
            {pathDetails[activePath].description}
          </p>
        </div>
      </div>

      <TirtaMascot
        dialogue="Saat sampai di bumi, sebagian dari kami masuk ke dalam tanah (infiltrasi) menjadi air tanah yang segar. Sebagian lagi mengalir di permukaan (aliran permukaan) menuju sungai dan laut. Keduanya sama-sama penting bagi kehidupan!"
        mood="explaining"
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
          id="water-dest-next-btn"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
        >
          <span>Lanjut: Aktivitas Pasangkan Jalur Air</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
