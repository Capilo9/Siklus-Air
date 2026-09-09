/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Map, Home, RotateCcw, Monitor } from 'lucide-react';
import { ScreenId } from '../types';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenTeacherGuide: () => void;
  onResetProgress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenTeacherGuide,
  onResetProgress,
}) => {
  const getScreenTitle = (screen: ScreenId): string => {
    switch (screen) {
      case 'landing':
        return 'Beranda';
      case 'map':
        return 'Peta Belajar';
      case 'puddle_trigger':
        return 'Pemantik: Genangan Air';
      case 'evap_transp_explore':
        return 'Eksplorasi: Penguapan Air';
      case 'vapor_sources':
        return 'Aktivitas 1: Sumber Uap Air';
      case 'condensation':
        return 'Kondensasi: Membentuk Awan';
      case 'cloud_sequence':
        return 'Aktivitas 2: Susun Terbentuknya Awan';
      case 'precipitation':
        return 'Presipitasi: Mengapa Hujan Turun';
      case 'water_destination':
        return 'Ke Mana Air Hujan Pergi?';
      case 'water_path_match':
        return 'Aktivitas 3: Pasangkan Jalur Air';
      case 'complete_cycle':
        return 'Siklus Air Lengkap';
      case 'build_cycle':
        return 'Aktivitas 4: Bangun Siklus Air';
      case 'environment_case':
        return 'Studi Kasus: Pohon & Resapan Air';
      case 'detective_cases':
        return 'Aktivitas 5: Detektif Siklus Air';
      case 'evaluation':
        return 'Evaluasi Pemahaman Mandiri';
      case 'summary':
        return 'Rangkuman Materi';
      case 'reflection':
        return 'Refleksi Belajar';
      case 'completion':
        return 'Petualangan Selesai';
      case 'smartboard_lab':
        return 'Lab Aktivitas Smartboard';
      default:
        return 'Petualangan Setetes Air';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-sky-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2.5">
          <button
            id="nav-brand-btn"
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 group text-left cursor-pointer hover:opacity-80 transition"
            title="Kembali ke Beranda"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              💧
            </div>
            <div>
              <div className="text-xs font-bold text-sky-900 tracking-tight flex items-center gap-1.5">
                <span>MPI SIKLUS AIR</span>
                <span className="hidden sm:inline-block text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded-full font-medium">
                  SDN Sadeng 02
                </span>
              </div>
              <div className="text-[11px] text-slate-500 truncate max-w-[160px] sm:max-w-[260px]">
                {getScreenTitle(currentScreen)}
              </div>
            </div>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {currentScreen !== 'landing' && (
            <>
              <button
                id="nav-home-btn"
                onClick={() => onNavigate('landing')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-sky-800 hover:bg-sky-50 rounded-lg transition"
                title="Halaman Awal"
              >
                <Home className="w-4 h-4 text-sky-600" />
                <span className="hidden md:inline">Beranda</span>
              </button>

              <button
                id="nav-map-btn"
                onClick={() => onNavigate('map')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition border border-sky-200 cursor-pointer"
                title="Buka Peta Belajar"
              >
                <Map className="w-4 h-4 text-sky-600" />
                <span className="hidden sm:inline">Peta Belajar</span>
              </button>

              <button
                id="nav-smartboard-btn"
                onClick={() => onNavigate('smartboard_lab')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg transition border cursor-pointer ${
                  currentScreen === 'smartboard_lab'
                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-300'
                }`}
                title="Buka Lab Aktivitas Smartboard"
              >
                <Monitor className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">Smartboard</span>
              </button>
            </>
          )}

          {currentScreen === 'landing' && (
            <button
              id="nav-smartboard-landing-btn"
              onClick={() => onNavigate('smartboard_lab')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition border border-amber-300 cursor-pointer"
              title="Buka Lab Aktivitas Smartboard"
            >
              <Monitor className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Smartboard</span>
            </button>
          )}

          <button
            id="nav-teacher-guide-btn"
            onClick={onOpenTeacherGuide}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition border border-emerald-200"
            title="Buka Panduan Guru"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Panduan Guru</span>
          </button>

          {currentScreen !== 'landing' && (
            <button
              id="nav-reset-btn"
              onClick={onResetProgress}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
              title="Mulai Ulang Progres Belajar"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
