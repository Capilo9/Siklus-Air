/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, BookOpen, Target, Sparkles, Droplets, Info, Monitor, Image as ImageIcon, Layers, Eye } from 'lucide-react';
import { HeroLandscapeSvg } from '../components/SvgIllustrations';
import { LEARNING_OBJECTIVES } from '../data/waterCycleData';

interface LandingScreenProps {
  onStart: () => void;
  onOpenTeacherGuide: () => void;
  onOpenSmartboard?: () => void;
}

interface PhotoPerspective {
  id: string;
  title: string;
  url: string;
  alt: string;
  caption: string;
}

const PHOTO_PERSPECTIVES: PhotoPerspective[] = [
  {
    id: 'valley_river',
    title: 'Lembah & Aliran Sungai',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    alt: 'Pemandangan lembah pegunungan asri dengan sungai jernih dan awan di langit',
    caption: 'Air mengalir dari mata air pegunungan menuju danau di bawah terik matahari.',
  },
  {
    id: 'rain_mountain',
    title: 'Awan Mendung & Hujan',
    url: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=1600&q=80',
    alt: 'Gumpalan awan mendung dan hujan menyirami perbukitan hijau',
    caption: 'Kondensasi uap air membentuk awan tebal yang menurunkan hujan (presipitasi).',
  },
  {
    id: 'waterfall_mist',
    title: 'Air Terjun & Kabut Uap',
    url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=80',
    alt: 'Air terjun deras dengan butiran kabut uap air membubung di alam',
    caption: 'Derasnya aliran air menghasilkan butiran uap yang kembali menguap ke udara.',
  },
];

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart, onOpenTeacherGuide, onOpenSmartboard }) => {
  const [showObjectivesModal, setShowObjectivesModal] = useState(false);
  const [activeViewMode, setActiveViewMode] = useState<'photo' | 'diagram'>('photo');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const currentPhoto = PHOTO_PERSPECTIVES[selectedPhotoIndex];

  return (
    <div className="min-h-[calc(100dvh-58px)] flex flex-col justify-between bg-gradient-to-b from-sky-50/80 via-white to-sky-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col items-center text-center">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200 shadow-xs">
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            IPAS • FASE C • KELAS V
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            🏫 SDN Sadeng 02
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            Dibuat oleh Pak Madi
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2">
          PETUALANGAN SETETES AIR
        </h1>
        <p className="text-lg sm:text-xl font-semibold text-sky-700 mb-5">
          Menjelajahi Siklus Air di Bumi
        </p>

        {/* Visual View Switcher (Foto Asli Alam vs Diagram Skematis) */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            onClick={() => setActiveViewMode('photo')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeViewMode === 'photo'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Foto Alam Nyata</span>
          </button>

          <button
            onClick={() => setActiveViewMode('diagram')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeViewMode === 'diagram'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Diagram Skematis</span>
          </button>
        </div>

        {/* Hero Illustration / Photo Visual Container */}
        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-sky-200 shadow-xl bg-slate-900 mb-6 group">
          {activeViewMode === 'photo' ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />

              {/* Gradient Vignette for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/30" />

              {/* Interactive Educational Hotspots on Photo */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Hotspot 1: Matahari / Panas */}
                <button
                  onClick={() => setActiveHotspot(activeHotspot === 'sun' ? null : 'sun')}
                  className="pointer-events-auto absolute top-[12%] right-[22%] bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded-full text-[11px] font-black shadow-md flex items-center gap-1 transition transform hover:scale-108 cursor-pointer animate-pulse"
                >
                  <span>☀️ Sinar Matahari</span>
                </button>

                {/* Hotspot 2: Awan & Kondensasi */}
                <button
                  onClick={() => setActiveHotspot(activeHotspot === 'cloud' ? null : 'cloud')}
                  className="pointer-events-auto absolute top-[26%] left-[30%] bg-white/90 hover:bg-white text-sky-950 px-2.5 py-1 rounded-full text-[11px] font-black shadow-md flex items-center gap-1 transition transform hover:scale-108 cursor-pointer"
                >
                  <span>☁️ Awan Kondensasi</span>
                </button>

                {/* Hotspot 3: Hutan & Presipitasi */}
                <button
                  onClick={() => setActiveHotspot(activeHotspot === 'forest' ? null : 'forest')}
                  className="pointer-events-auto absolute bottom-[38%] left-[16%] bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[11px] font-black shadow-md flex items-center gap-1 transition transform hover:scale-108 cursor-pointer"
                >
                  <span>🌲 Hutan & Resapan</span>
                </button>

                {/* Hotspot 4: Aliran Sungai */}
                <button
                  onClick={() => setActiveHotspot(activeHotspot === 'river' ? null : 'river')}
                  className="pointer-events-auto absolute bottom-[22%] right-[32%] bg-blue-500 hover:bg-blue-400 text-white px-2.5 py-1 rounded-full text-[11px] font-black shadow-md flex items-center gap-1 transition transform hover:scale-108 cursor-pointer"
                >
                  <span>💧 Aliran Sungai</span>
                </button>
              </div>

              {/* Hotspot Explanation Toast */}
              {activeHotspot && (
                <div className="absolute top-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-xs bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl border border-sky-300 shadow-xl text-left text-xs animate-in fade-in">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-amber-300">
                      {activeHotspot === 'sun' && '☀️ Panas Matahari (Energi Penggerak)'}
                      {activeHotspot === 'cloud' && '☁️ Pendinginan Udara (Kondensasi)'}
                      {activeHotspot === 'forest' && '🌲 Hutan & Infiltrasi Air Tanah'}
                      {activeHotspot === 'river' && '💧 Aliran Permukaan (Menuju Laut)'}
                    </span>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="text-slate-400 hover:text-white px-1"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-slate-200 text-[11px] leading-relaxed">
                    {activeHotspot === 'sun' &&
                      'Matahari memanaskan permukaan air sungai, danau, dan laut sehingga menguap (evaporasi) naik ke langit.'}
                    {activeHotspot === 'cloud' &&
                      'Saat uap air membubung tinggi ke atmosfer yang dingin, uap mengembun menjadi butiran air kecil pembentuk awan.'}
                    {activeHotspot === 'forest' &&
                      'Akar pepohonan menyerap air hujan ke dalam tanah (infiltrasi) menjaga cadangan mata air bersih kita.'}
                    {activeHotspot === 'river' &&
                      'Air hujan yang jatuh di pegunungan mengalir melintasi sungai hingga kembali ke laut untuk mengulang siklus!'}
                  </p>
                </div>
              )}

              {/* Photo Perspective Selector Pills */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm p-1 rounded-2xl border border-white/20">
                {PHOTO_PERSPECTIVES.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPhotoIndex(idx);
                      setActiveHotspot(null);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                      selectedPhotoIndex === idx
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <HeroLandscapeSvg className="w-full h-auto" />
          )}

          {/* Floating Tirta Introduction Card */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur rounded-2xl p-3.5 shadow-md border border-sky-100 flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-sky-500 flex-shrink-0 flex items-center justify-center text-white text-2xl shadow-xs">
              💧
            </div>
            <div>
              <div className="text-xs font-bold text-sky-900 flex items-center gap-1">
                <span>Halo, aku Tirta!</span>
                <Sparkles className="w-3 h-3 text-amber-500" />
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Mari ikut perjalananku dari genangan air, naik ke langit membentuk awan, hingga kembali lagi ke bumi!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-xl mb-4">
          <button
            id="start-adventure-btn"
            onClick={onStart}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold text-base rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Mulai Petualangan</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {onOpenSmartboard && (
            <button
              id="smartboard-landing-btn"
              onClick={onOpenSmartboard}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <Monitor className="w-4 h-4 text-amber-100" />
              <span>Aktivitas Smartboard Kelas</span>
            </button>
          )}

          <button
            id="learning-objectives-btn"
            onClick={() => setShowObjectivesModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-800 font-semibold text-sm rounded-2xl border border-slate-200 hover:border-sky-300 shadow-xs transition cursor-pointer"
          >
            <Target className="w-4 h-4 text-sky-600" />
            <span>Tujuan Pembelajaran</span>
          </button>

          <button
            id="teacher-guide-landing-btn"
            onClick={onOpenTeacherGuide}
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-sm rounded-2xl border border-emerald-200 shadow-xs transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Panduan Guru</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto pt-4 border-t border-slate-200/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>MPI Siklus Air — Dibuat oleh Pak Madi • SDN Sadeng 02</span>
        <span>Kurikulum Merdeka • IPAS Kelas V SD</span>
      </footer>

      {/* Learning Objectives Modal */}
      {showObjectivesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-sky-100 p-6 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-lg">
                <Target className="w-5 h-5 text-sky-600" />
                <span>Tujuan Pembelajaran (TP1 – TP7)</span>
              </div>
              <button
                onClick={() => setShowObjectivesModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto flex-1 space-y-2.5 pr-1">
              {LEARNING_OBJECTIVES.map((tp) => (
                <div key={tp.id} className="p-3 bg-sky-50/50 rounded-xl border border-sky-100 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xs bg-sky-600 text-white px-2 py-0.5 rounded-md">
                      {tp.code}
                    </span>
                    <span className="font-bold text-slate-800 text-sm">{tp.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">{tp.description}</p>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-100 text-right mt-2">
              <button
                onClick={() => setShowObjectivesModal(false)}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
