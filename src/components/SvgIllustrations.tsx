/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

/**
 * Hero Landscape Visual (PNG/JPG Photography with Educational Process Badges)
 */
export const HeroLandscapeSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <div className={`relative rounded-2xl overflow-hidden shadow-sm aspect-[16/9] bg-slate-900 ${className}`}>
    <img
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
      alt="Lanskap Alam Siklus Air: Pegunungan, Sungai, Awan, dan Matahari"
      referrerPolicy="no-referrer"
      className="w-full h-full object-cover"
    />
    
    {/* Dark subtle vignette for legibility */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

    {/* Educational Process Badges Overlaid on Real Photo */}
    <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between pointer-events-none">
      {/* Top row: Sun & Condensation */}
      <div className="flex justify-between items-start">
        <div className="bg-amber-500/90 text-white text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-amber-300">
          <span>☀️ Energi Panas Matahari</span>
        </div>
        <div className="bg-sky-600/90 text-white text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-sky-300">
          <span>☁️ Kondensasi (Awan)</span>
        </div>
      </div>

      {/* Middle row: Precipitation & Evaporation */}
      <div className="flex justify-between items-center px-2">
        <div className="bg-emerald-600/90 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-xl shadow-md border border-emerald-300">
          🌲 Transpirasi Tumbuhan
        </div>
        <div className="bg-blue-600/90 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-xl shadow-md border border-blue-300">
          🌧️ Presipitasi (Hujan)
        </div>
        <div className="bg-orange-600/90 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-xl shadow-md border border-orange-300">
          ↗️ Evaporasi Laut & Danau
        </div>
      </div>

      {/* Bottom row: Infiltration & Surface Runoff */}
      <div className="flex justify-between items-end">
        <div className="bg-yellow-800/90 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-md border border-yellow-500">
          💧 Infiltrasi (Air Tanah)
        </div>
        <div className="bg-teal-600/90 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-md border border-teal-300">
          🌊 Aliran Permukaan (Limpasan)
        </div>
      </div>
    </div>
  </div>
);

/**
 * Puddle Comparison (JPG Photography: Morning puddle vs Noon drying)
 */
export const PuddleComparisonSvg: React.FC = () => (
  <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
    <div className="grid sm:grid-cols-2 gap-2 p-2">
      {/* LEFT: Pagi Hari (07.00 WIB) */}
      <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 group border border-sky-200">
        <img
          src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80"
          alt="Genangan air hujan luas dan dalam di atas tanah atau aspal dengan riak air"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
        <div className="absolute top-2.5 left-2.5 bg-sky-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md border border-sky-300 flex items-center gap-1">
          <span>🕒 Pagi Hari (07.00 WIB)</span>
        </div>
        <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-sm p-2 rounded-xl text-slate-800 text-xs font-semibold shadow-md border border-sky-100">
          💧 <strong>Genangan air luas & dalam</strong> setelah diguyur hujan semalaman.
        </div>
      </div>

      {/* RIGHT: Siang Hari (12.30 WIB) */}
      <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 group border border-amber-200">
        <img
          src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80"
          alt="Halaman mengering di bawah sinar matahari terik pada siang hari"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
        <div className="absolute top-2.5 left-2.5 bg-amber-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md border border-amber-300 flex items-center gap-1">
          <span>☀️ Siang Hari (12.30 WIB)</span>
        </div>
        <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-sm p-2 rounded-xl text-slate-800 text-xs font-semibold shadow-md border border-amber-100">
          ↗️ <strong>Genangan mengecil & hampir kering!</strong> Panas matahari mengubah air menjadi uap gas.
        </div>
      </div>
    </div>
  </div>
);

/**
 * Condensation Zoom (JPG Photography: Clouds forming in atmosphere)
 */
export const CondensationZoomSvg: React.FC = () => (
  <div className="w-full rounded-2xl overflow-hidden border border-sky-200 shadow-sm bg-sky-50 p-3 sm:p-4">
    <div className="grid sm:grid-cols-2 gap-3 items-center">
      {/* Real Cloud Photo */}
      <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-900 border border-sky-300 shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80"
          alt="Gumpalan awan putih di langit biru hasil kondensasi uap air dingin"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold bg-black/60 backdrop-blur-xs p-2 rounded-lg">
          ☁️ Awan di langit: bukan asap, melainkan titik air cair mikro!
        </div>
      </div>

      {/* Process Card */}
      <div className="space-y-2.5 text-xs text-slate-700">
        <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-xs flex items-start gap-2.5">
          <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center flex-shrink-0 text-xs">
            1
          </span>
          <div>
            <strong className="text-sky-900 block text-xs">Uap Air Naik ke Atas</strong>
            <p className="text-[11px] text-slate-600">
              Gas uap air tak kasat mata membubung tinggi ke lapisan atmosfer yang bersuhu dingin.
            </p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-xs flex items-start gap-2.5">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-xs">
            2
          </span>
          <div>
            <strong className="text-blue-900 block text-xs">Pendinginan Suhu (Kondensasi)</strong>
            <p className="text-[11px] text-slate-600">
              Suhu dingin mengubah uap air kembali menjadi miliaran butiran air cair berukuran sangat kecil.
            </p>
          </div>
        </div>

        <div className="bg-sky-100/70 p-3 rounded-xl border border-sky-300 text-sky-950 font-medium text-[11px]">
          ✨ <strong>Hasil:</strong> Butiran air mikro melayang di udara dan berkumpul menjadi <strong>Awan</strong> yang kita lihat!
        </div>
      </div>
    </div>
  </div>
);

/**
 * Precipitation Zoom (JPG Photography: 3 stages of Rain formation)
 */
export const PrecipitationZoomSvg: React.FC = () => (
  <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white p-3">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Tahap 1 */}
      <div className="rounded-xl overflow-hidden border border-sky-200 bg-sky-50/50 flex flex-col justify-between">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80"
            alt="Awan putih dengan titik air mikro yang masih ringan"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-sky-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Tahap 1
          </div>
        </div>
        <div className="p-2.5 text-xs">
          <div className="font-bold text-sky-900 mb-1">Titik Air Masih Kecil</div>
          <p className="text-slate-600 text-[11px] leading-snug">
            Butiran air di dalam awan masih sangat kecil dan ringan, sehingga masih bisa melayang ditahan angin.
          </p>
        </div>
      </div>

      {/* Tahap 2 */}
      <div className="rounded-xl overflow-hidden border border-blue-200 bg-blue-50/50 flex flex-col justify-between">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=600&q=80"
            alt="Tetesan air menyatu membesar dan memberat"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-blue-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Tahap 2
          </div>
        </div>
        <div className="p-2.5 text-xs">
          <div className="font-bold text-blue-900 mb-1">Menyatu & Memberat</div>
          <p className="text-slate-600 text-[11px] leading-snug">
            Tetesan air saling bertabrakan, bergabung menjadi butiran yang semakin besar dan bertambah berat.
          </p>
        </div>
      </div>

      {/* Tahap 3 */}
      <div className="rounded-xl overflow-hidden border border-emerald-200 bg-emerald-50/50 flex flex-col justify-between">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=600&q=80"
            alt="Hujan lebat jatuh tertarik gravitasi bumi"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Tahap 3 • Presipitasi
          </div>
        </div>
        <div className="p-2.5 text-xs">
          <div className="font-bold text-emerald-900 mb-1">Jatuh Sebagai Hujan</div>
          <p className="text-slate-600 text-[11px] leading-snug">
            Udara tak sanggup lagi menahan beban air. Gaya gravitasi menarik tetesan air jatuh membasahi bumi.
          </p>
        </div>
      </div>
    </div>
  </div>
);
