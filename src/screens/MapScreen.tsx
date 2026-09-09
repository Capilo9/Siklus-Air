/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2, Circle, Clock, Sparkles, Monitor } from 'lucide-react';
import { MAP_MILESTONES } from '../data/waterCycleData';
import { ScreenId } from '../types';
import { TirtaMascot } from '../components/TirtaMascot';

interface MapScreenProps {
  completedMilestones: number[];
  currentMilestone: number;
  onSelectMilestone: (screenId: ScreenId, milestoneId: number) => void;
  onOpenSmartboard?: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  completedMilestones,
  currentMilestone,
  onSelectMilestone,
  onOpenSmartboard,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-sky-700 uppercase tracking-widest bg-sky-100 px-3 py-1 rounded-full">
          Alur Konsep Siklus Air
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
          Peta Belajar Petualangan Tirta
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto mt-1">
          Ikuti perjalanan setetes air melalui 7 tahapan konsep. Amati, pikirkan, dan temukan bagaimana air terus berputar di bumi kita.
        </p>
      </div>

      <TirtaMascot
        dialogue="Klik salah satu pos petualangan untuk mulai menyelidiki. Kamu bisa belajar secara berurutan agar pemahamanmu semakin kokoh!"
        mood="happy"
      />

      {/* Smartboard Lab Classroom Banner */}
      {onOpenSmartboard && (
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl flex-shrink-0">
              🖥️
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wide text-amber-100">
                <span>Khusus Belajar di Kelas</span>
                <span className="bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded text-[10px]">Interaktif</span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                Aktivitas Smartboard: Lab Simulasi Bumi & Coretan Digital
              </h3>
              <p className="text-xs text-amber-100 line-clamp-1">
                Ajak murid maju ke papan tulis interaktif untuk mengontrol panas matahari, atmosfer, dan infiltrasi tanah!
              </p>
            </div>
          </div>

          <button
            id="map-open-smartboard-btn"
            onClick={onOpenSmartboard}
            className="w-full sm:w-auto px-4 py-2.5 bg-white text-amber-900 hover:bg-amber-50 font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer"
          >
            <span>Buka di Smartboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Milestones Flow List */}
      <div className="mt-6 space-y-3 relative">
        {/* Subtle connecting line */}
        <div className="absolute left-6 top-8 bottom-8 w-1 bg-sky-100 -z-0 hidden sm:block" />

        {MAP_MILESTONES.map((m) => {
          const isCompleted = completedMilestones.includes(m.id);
          const isCurrent = currentMilestone === m.id;

          let statusIcon = <Circle className="w-5 h-5 text-slate-300" />;
          let statusText = 'Belum dipelajari';
          let statusBadgeClass = 'bg-slate-100 text-slate-500';

          if (isCompleted) {
            statusIcon = <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
            statusText = 'Selesai dipelajari';
            statusBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
          } else if (isCurrent) {
            statusIcon = <Clock className="w-5 h-5 text-amber-500 animate-pulse" />;
            statusText = 'Sedang dipelajari';
            statusBadgeClass = 'bg-amber-100 text-amber-800 border-amber-200';
          }

          return (
            <div
              key={m.id}
              onClick={() => onSelectMilestone(m.screenId, m.id)}
              className={`relative z-10 flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${
                isCurrent
                  ? 'bg-sky-50/90 border-sky-300 shadow-md ring-2 ring-sky-200'
                  : isCompleted
                  ? 'bg-white border-emerald-200 hover:border-emerald-300 hover:shadow-sm'
                  : 'bg-white/80 border-slate-200 hover:border-sky-200 hover:bg-sky-50/30'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-sky-600 text-white ring-2 ring-sky-300'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-700'
                  }`}
                >
                  {m.stageNumber}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-900">
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{m.subtitle}</p>
                </div>
              </div>

              <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-3 pl-13 sm:pl-0">
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusBadgeClass}`}>
                  {statusIcon}
                  <span>{statusText}</span>
                </span>

                <button
                  id={`go-stage-${m.stageNumber}-btn`}
                  className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-400 group-hover:text-sky-700 group-hover:bg-sky-100'
                  }`}
                >
                  <span className="hidden md:inline">Buka</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend Information */}
      <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-around gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Circle className="w-4 h-4 text-slate-300" />
          <span>○ Belum dipelajari</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-amber-500" />
          <span>◐ Sedang dipelajari</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>● Selesai</span>
        </div>
      </div>
    </div>
  );
};
