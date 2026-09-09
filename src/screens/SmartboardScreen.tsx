/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  Sun,
  CloudRain,
  Trees,
  Building2,
  PenTool,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Play,
  Layers,
  Thermometer,
  ShieldCheck,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { TirtaMascot } from '../components/TirtaMascot';

interface SmartboardScreenProps {
  onBackToMap: () => void;
  onGoNextScreen?: () => void;
}

type SunLevel = 'rendah' | 'sedang' | 'terik';
type AtmosphereTemp = 'hangat' | 'sejuk' | 'dingin';
type LandType = 'hutan' | 'semen';

interface ClassroomMission {
  id: number;
  title: string;
  goal: string;
  targetCondition: {
    sun?: SunLevel;
    temp?: AtmosphereTemp;
    land?: LandType;
    rainRaining?: boolean;
  };
  explanation: string;
}

const MISSIONS: ClassroomMission[] = [
  {
    id: 1,
    title: 'Misi 1: Ciptakan Hujan Tropis!',
    goal: 'Atur Matahari menjadi TERIK dan Suhu Atmosfer menjadi DINGIN, lalu tekan tombol "Turunkan Hujan".',
    targetCondition: { sun: 'terik', temp: 'dingin', rainRaining: true },
    explanation:
      'Luar biasa! Panas matahari yang kuat menghasilkan banyak uap air (evaporasi & transpirasi), lalu saat naik ke atmosfer yang dingin, uap mengalami kondensasi membentuk awan mendung tebal yang siap menurunkan hujan!',
  },
  {
    id: 2,
    title: 'Misi 2: Cegah Banjir di Pemukiman!',
    goal: 'Saat hujan deras turun, ubah Tutupan Lahan menjadi "HUTAN LINDUNG" agar air dapat meresap ke dalam tanah.',
    targetCondition: { land: 'hutan', rainRaining: true },
    explanation:
      'Tepat sekali! Akar pepohonan dan tanah berpori menyerap sebagian besar air hujan (infiltrasi), mencegah air meluap menjadi banjir dan mengisi cadangan air tanah kita.',
  },
  {
    id: 3,
    title: 'Misi 3: Eksperimen Kemarau & Permukaan Semen',
    goal: 'Pilih lahan "SEMEN PADAT", lalu turunkan hujan. Amati apa yang terjadi pada air tanah dan risiko banjir!',
    targetCondition: { land: 'semen', rainRaining: true },
    explanation:
      'Perhatikan perbedaannya! Lapisan semen kedap air membuat air tidak dapat meresap (infiltrasi 0%). Air langsung melimpas liar di atas permukaan jalanan, memicu genangan banjir!',
  },
];

export const SmartboardScreen: React.FC<SmartboardScreenProps> = ({ onBackToMap }) => {
  // Simulator State
  const [sunLevel, setSunLevel] = useState<SunLevel>('sedang');
  const [atmosphereTemp, setAtmosphereTemp] = useState<AtmosphereTemp>('sejuk');
  const [landType, setLandType] = useState<LandType>('hutan');
  const [isRaining, setIsRaining] = useState(false);
  const [rainTimerActive, setRainTimerActive] = useState(false);

  // Classroom Missions State
  const [activeMissionId, setActiveMissionId] = useState<number | null>(null);
  const [missionSuccess, setMissionSuccess] = useState<boolean | null>(null);

  // Smartboard Canvas Drawing State
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [penColor, setPenColor] = useState<'#0284c7' | '#ea580c' | '#16a34a' | '#713f12'>('#0284c7');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastCoordRef = useRef<{ x: number; y: number } | null>(null);

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Trigger Rain button
  const handleTriggerRain = () => {
    // Check if clouds are thick enough
    if (atmosphereTemp === 'hangat' && sunLevel === 'rendah') {
      // Cloud too thin
      alert('⚠️ Awan belum cukup tebal untuk menghasilkan hujan! Naikkan panas matahari atau turunkan suhu atmosfer agar uap air mengembun menjadi awan tebal.');
      return;
    }

    setIsRaining(true);
    setRainTimerActive(true);

    // Auto stop rain after 6 seconds
    setTimeout(() => {
      setIsRaining(false);
      setRainTimerActive(false);
    }, 6000);
  };

  // Verify Mission
  const handleVerifyMission = () => {
    if (!activeMissionId) return;
    const mission = MISSIONS.find((m) => m.id === activeMissionId);
    if (!mission) return;

    let satisfied = true;
    if (mission.targetCondition.sun && sunLevel !== mission.targetCondition.sun) satisfied = false;
    if (mission.targetCondition.temp && atmosphereTemp !== mission.targetCondition.temp) satisfied = false;
    if (mission.targetCondition.land && landType !== mission.targetCondition.land) satisfied = false;
    if (mission.targetCondition.rainRaining && !isRaining) satisfied = false;

    setMissionSuccess(satisfied);
  };

  // Smartboard Canvas setup & drawing handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode) return;
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    lastCoordRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !isDrawingRef.current || !lastCoordRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastCoordRef.current.x, lastCoordRef.current.y);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastCoordRef.current = { x: currentX, y: currentY };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastCoordRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Calculated dynamic metrics
  const evaporationRate = sunLevel === 'terik' ? 'Sangat Tinggi (95 ml/jam)' : sunLevel === 'sedang' ? 'Normal (50 ml/jam)' : 'Rendah (15 ml/jam)';
  const cloudThickness =
    atmosphereTemp === 'dingin'
      ? 'Awan Mendung Kumulonimbus (Sangat Tebal)'
      : atmosphereTemp === 'sejuk'
      ? 'Awan Kumulus Putih (Sedang)'
      : 'Uap Tersebar (Tipis Sekali)';
  const infiltrationRate = landType === 'hutan' ? 'Tinggi (85% Meresap)' : 'Sangat Rendah (0% Meresap)';
  const floodRisk =
    landType === 'semen' && isRaining ? 'BAHAYA BANJIR TINGGI ⚠️' : isRaining ? 'Aman (Terserap Alami) ✅' : 'Kondisi Kering';

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-5 lg:p-6 select-none">
      {/* Smartboard Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 rounded-3xl bg-gradient-to-r from-sky-700 via-blue-800 to-indigo-900 text-white shadow-md mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl shadow-xs">
            🖥️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md">
                MODE SMARTBOARD KELAS
              </span>
              <span className="text-[11px] text-sky-200 hidden sm:inline">
                Aktivitas Interaktif Depan Kelas • IPAS Kelas V
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
              Laboratorium Simulasi Siklus Air Bumi
            </h1>
          </div>
        </div>

        {/* Header Right: Fullscreen & Back */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold transition cursor-pointer"
            title="Tampilan Penuh Layar Smartboard"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Kecilkan' : 'Layar Penuh'}</span>
          </button>

          <button
            onClick={onBackToMap}
            className="px-3.5 py-2 rounded-xl bg-white text-sky-900 hover:bg-sky-50 text-xs font-bold transition shadow-xs cursor-pointer"
          >
            ← Kembali ke Peta
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport (Interactive Stage + Drawing Canvas) */}
      <div className="relative rounded-3xl border-3 border-sky-300 overflow-hidden shadow-lg bg-sky-100 min-h-[360px] sm:min-h-[420px]">
        {/* SVG Living Landscape */}
        <svg
          viewBox="0 0 800 450"
          className="w-full h-auto block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dynamic Sky Gradient based on Atmosphere Temp & Rain */}
            <linearGradient id="smartSky" x1="0%" y1="0%" x2="0%" y2="100%">
              {isRaining ? (
                <>
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="60%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </>
              ) : atmosphereTemp === 'dingin' ? (
                <>
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="70%" stopColor="#dbeafe" />
                  <stop offset="100%" stopColor="#eff6ff" />
                </>
              ) : atmosphereTemp === 'sejuk' ? (
                <>
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="70%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#e0f2fe" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#fdba74" />
                  <stop offset="70%" stopColor="#fed7aa" />
                  <stop offset="100%" stopColor="#fff7ed" />
                </>
              )}
            </linearGradient>

            {/* Ground Soil Gradient */}
            <linearGradient id="smartSoil" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="15%" stopColor="#65a30d" />
              <stop offset="35%" stopColor="#a16207" />
              <stop offset="100%" stopColor="#713f12" />
            </linearGradient>

            {/* Concrete Pavement Gradient */}
            <linearGradient id="smartConcrete" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="20%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>

          {/* Sky background */}
          <rect width="800" height="450" fill="url(#smartSky)" />

          {/* 1. SUN OBJECT (Adjusts by SunLevel) */}
          <g transform="translate(110, 80)">
            {/* Sun Rays */}
            <circle
              cx="0"
              cy="0"
              r={sunLevel === 'terik' ? 52 : sunLevel === 'sedang' ? 42 : 32}
              fill={sunLevel === 'terik' ? '#f59e0b' : sunLevel === 'sedang' ? '#fbbf24' : '#fde68a'}
              opacity="0.35"
              className="animate-pulse"
            />
            <circle
              cx="0"
              cy="0"
              r={sunLevel === 'terik' ? 38 : sunLevel === 'sedang' ? 30 : 22}
              fill="#f59e0b"
            />
            <text x="0" y="5" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              {sunLevel === 'terik' ? 'Terik ☀️' : sunLevel === 'sedang' ? 'Hangat' : 'Redup'}
            </text>
            {/* Radiating Heat Lines */}
            {sunLevel !== 'rendah' && (
              <g stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3">
                <line x1="0" y1="45" x2="30" y2="160" />
                <line x1="25" y1="35" x2="160" y2="180" />
                <line x1="-25" y1="35" x2="-40" y2="160" />
              </g>
            )}
          </g>

          {/* Mountains in background */}
          <polygon points="360,280 490,120 620,280" fill="#64748b" opacity="0.6" />
          <polygon points="465,145 490,120 515,148 495,160" fill="#f8fafc" />

          {/* 2. CLOUDS & CONDENSATION (Adjusts by Atmosphere Temp) */}
          <g transform="translate(430, 70)">
            {/* Big Cloud Body */}
            <path
              d="M30 50 Q10 20 45 15 Q65 -15 105 -5 Q135 -20 165 5 Q195 5 190 35 Q210 45 200 70 Q190 90 150 85 L40 85 Q15 85 30 50 Z"
              fill={
                isRaining
                  ? '#334155'
                  : atmosphereTemp === 'dingin'
                  ? '#64748b'
                  : atmosphereTemp === 'sejuk'
                  ? '#f8fafc'
                  : '#ffffff'
              }
              stroke={isRaining ? '#1e293b' : '#38bdf8'}
              strokeWidth="2.5"
              className="transition-colors duration-500"
            />
            {/* Cloud Status Text */}
            <text
              x="115"
              y="45"
              fill={atmosphereTemp === 'dingin' || isRaining ? '#ffffff' : '#0369a1'}
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              {isRaining ? 'Awan Mendung Basah 🌧️' : atmosphereTemp === 'dingin' ? 'Kondensasi Penuh ☁️' : 'Uap Mendingin 🌤️'}
            </text>

            {/* 3. RAIN DROPLETS (When Raining) */}
            {isRaining && (
              <g stroke="#38bdf8" strokeWidth="3" strokeLinecap="round">
                {[30, 60, 90, 120, 150, 180].map((x, i) => (
                  <React.Fragment key={i}>
                    <line x1={x} y1="95" x2={x - 8} y2="135" strokeDasharray="6 4" />
                    <line x1={x + 15} y1="140" x2={x + 7} y2="180" strokeDasharray="6 4" />
                    <line x1={x} y1="185" x2={x - 8} y2="225" strokeDasharray="6 4" />
                  </React.Fragment>
                ))}
              </g>
            )}
          </g>

          {/* 4. EVAPORATION VAPOR PARTICLES RISING FROM WATER */}
          <g stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" fill="none">
            {/* Wavy ascending arrows from lake/ocean */}
            <path d="M640 310 Q630 270 645 230 T635 170" strokeDasharray="5 3" />
            <path d="M690 320 Q680 280 695 240 T685 180" strokeDasharray="5 3" />
            <polygon points="635,160 630,172 640,172" fill="#0284c7" />
            <polygon points="685,170 680,182 690,182" fill="#0284c7" />
            <text x="660" y="240" fill="#0369a1" fontSize="11" fontWeight="bold" stroke="none">
              Evaporasi ↗
            </text>
          </g>

          {/* 5. LANDSCAPE TERRAIN (Forest vs Concrete) */}
          {landType === 'hutan' ? (
            // FOREST GROUND
            <g>
              <path
                d="M0 260 Q150 240 340 270 L340 450 L0 450 Z"
                fill="url(#smartSoil)"
              />
              {/* Trees */}
              {[40, 120, 200, 270].map((tx, idx) => (
                <g key={idx} transform={`translate(${tx}, ${idx % 2 === 0 ? 190 : 205})`}>
                  <rect x="18" y="32" width="10" height="28" fill="#78350f" rx="2" />
                  <circle cx="23" cy="22" r="24" fill="#15803d" />
                  <circle cx="16" cy="14" r="18" fill="#16a34a" />
                  {/* Deep tree roots */}
                  <path
                    d="M23 60 Q15 90 5 110 M23 60 Q32 90 40 115 M23 60 L23 125"
                    stroke="#b45309"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  {/* Transpiration vapor */}
                  <path d="M23 0 Q30 -20 23 -35" stroke="#16a34a" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                </g>
              ))}

              {/* Infiltration Visual: Groundwater soaking */}
              <g transform="translate(40, 360)">
                <rect
                  x="0"
                  y="0"
                  width="260"
                  height="70"
                  rx="14"
                  fill="#38bdf8"
                  opacity={isRaining ? 0.9 : 0.6}
                />
                <text x="130" y="35" fill="#0c4a6e" fontSize="13" fontWeight="bold" textAnchor="middle">
                  💧 Air Tanah Alami (Infiltrasi 85%)
                </text>
                <text x="130" y="55" fill="#0369a1" fontSize="10" fontStyle="italic" textAnchor="middle">
                  Terserap akar & tersimpan jernih
                </text>
              </g>
            </g>
          ) : (
            // CONCRETE GROUND
            <g>
              <path
                d="M0 260 Q150 250 340 270 L340 450 L0 450 Z"
                fill="url(#smartConcrete)"
              />
              {/* Buildings & Paved Streets */}
              <g transform="translate(40, 160)">
                <rect x="10" y="20" width="55" height="80" fill="#94a3b8" rx="2" />
                <rect x="75" y="0" width="70" height="100" fill="#64748b" rx="2" />
                <rect x="155" y="30" width="60" height="70" fill="#cbd5e1" rx="2" />
                {/* Windows */}
                {[20, 40].map((wx) => (
                  <rect key={wx} x={wx} y="35" width="8" height="10" fill="#fef08a" />
                ))}
              </g>

              {/* Flooding surface water layer */}
              {isRaining && (
                <g transform="translate(0, 260)">
                  <rect x="10" y="0" width="320" height="25" fill="#0284c7" opacity="0.8" rx="6" />
                  <text x="160" y="17" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">
                    ⚠️ LIMPASAN BANJIR (TIDAK MERESAP!)
                  </text>
                </g>
              )}

              {/* Blocked Dry Underground */}
              <g transform="translate(40, 360)">
                <rect x="0" y="0" width="260" height="70" rx="14" fill="#475569" />
                <text x="130" y="35" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                  ⛔ Tertutup Semen (Infiltrasi 0%)
                </text>
                <text x="130" y="55" fill="#fca5a5" fontSize="10" fontStyle="italic" textAnchor="middle">
                  Cadangan air sumur menipis
                </text>
              </g>
            </g>
          )}

          {/* 6. OCEAN / LAKE WATER BODY (Right side) */}
          <path
            d="M340 270 Q480 250 800 240 L800 450 L340 450 Z"
            fill="#0284c7"
          />
          <text x="570" y="380" fill="#ffffff" fontSize="15" fontWeight="black" textAnchor="middle">
            DANAU & LAUTAN BUMI 🌊
          </text>
          <text x="570" y="405" fill="#bae6fd" fontSize="11" textAnchor="middle">
            Sumber air utama yang dipanaskan matahari
          </text>
        </svg>

        {/* OVERLAID TRANSPARENT CANVAS FOR SMARTBOARD DRAWING */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className={`absolute inset-0 w-full h-full ${
            isDrawingMode ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'
          }`}
        />

        {/* Floating Live Realtime Dashboard */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-sky-200 shadow-md text-xs space-y-1.5 max-w-[240px]">
          <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5 border-b pb-1">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>Sensor Lingkungan Bumi:</span>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <span>☀️ Laju Evaporasi:</span>
            <span className="font-bold text-amber-700">{evaporationRate}</span>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <span>☁️ Status Awan:</span>
            <span className="font-bold text-sky-800 truncate max-w-[120px]">{cloudThickness}</span>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <span>🌱 Laju Infiltrasi:</span>
            <span className="font-bold text-emerald-800">{infiltrationRate}</span>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <span>🌊 Bahaya Banjir:</span>
            <span className="font-bold text-rose-700">{floodRisk}</span>
          </div>
        </div>

        {/* Floating Rain Active Badge */}
        {isRaining && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
            <CloudRain className="w-4 h-4 text-cyan-200" />
            <span>PRESIPITASI SEDANG BERLANGSUNG!</span>
          </div>
        )}
      </div>

      {/* SMARTBOARD DRAWING TOOLBAR (Pena Coretan Smartboard) */}
      <div className="mt-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDrawingMode(!isDrawingMode)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shadow-xs ${
              isDrawingMode
                ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>{isDrawingMode ? 'Mode Coretan AKTIF (Sentuh Layar)' : 'Aktifkan Spidol Smartboard'}</span>
          </button>

          {isDrawingMode && (
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setPenColor('#0284c7')}
                className={`w-7 h-7 rounded-lg bg-sky-600 border-2 cursor-pointer ${
                  penColor === '#0284c7' ? 'border-white ring-2 ring-sky-400' : 'border-transparent'
                }`}
                title="Spidol Biru (Aliran Air/Hujan)"
              />
              <button
                onClick={() => setPenColor('#ea580c')}
                className={`w-7 h-7 rounded-lg bg-orange-500 border-2 cursor-pointer ${
                  penColor === '#ea580c' ? 'border-white ring-2 ring-orange-300' : 'border-transparent'
                }`}
                title="Spidol Oranye (Panas & Evaporasi)"
              />
              <button
                onClick={() => setPenColor('#16a34a')}
                className={`w-7 h-7 rounded-lg bg-emerald-600 border-2 cursor-pointer ${
                  penColor === '#16a34a' ? 'border-white ring-2 ring-emerald-300' : 'border-transparent'
                }`}
                title="Spidol Hijau (Pohon & Transpirasi)"
              />
              <button
                onClick={() => setPenColor('#713f12')}
                className={`w-7 h-7 rounded-lg bg-amber-800 border-2 cursor-pointer ${
                  penColor === '#713f12' ? 'border-white ring-2 ring-amber-600' : 'border-transparent'
                }`}
                title="Spidol Cokelat (Tanah & Infiltrasi)"
              />
              <button
                onClick={clearCanvas}
                className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Hapus Semua Coretan"
              >
                Hapus
              </button>
            </div>
          )}
        </div>

        <div className="text-xs text-slate-500 font-medium hidden md:block">
          💡 Murid dapat maju ke Smartboard dan menggambar panah arah siklus air langsung di layar!
        </div>
      </div>

      {/* SMARTBOARD INTERACTIVE CONTROLS (TOMBOL KENDALI SENTUH EKSTRA BESAR) */}
      <div className="mt-4 grid md:grid-cols-3 gap-3">
        {/* Control 1: Matahari (Energi Panas) */}
        <div className="p-4 bg-white rounded-3xl border-2 border-amber-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm mb-1">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>1. Energi Panas Matahari</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Mengontrol laju penguapan (evaporasi & transpirasi)
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {(['rendah', 'sedang', 'terik'] as SunLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSunLevel(lvl)}
                className={`py-3 px-2 rounded-2xl text-xs font-black transition cursor-pointer text-center ${
                  sunLevel === lvl
                    ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300 scale-102'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                }`}
              >
                {lvl === 'rendah' ? '⛅ Redup' : lvl === 'sedang' ? '☀️ Hangat' : '🔥 Terik'}
              </button>
            ))}
          </div>
        </div>

        {/* Control 2: Suhu Atmosfer Udara */}
        <div className="p-4 bg-white rounded-3xl border-2 border-sky-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold text-sky-900 text-sm mb-1">
              <Thermometer className="w-5 h-5 text-sky-600" />
              <span>2. Suhu Udara Atmosfer</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Mengontrol proses pengembunan (kondensasi awan)
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {(['hangat', 'sejuk', 'dingin'] as AtmosphereTemp[]).map((temp) => (
              <button
                key={temp}
                onClick={() => setAtmosphereTemp(temp)}
                className={`py-3 px-2 rounded-2xl text-xs font-black transition cursor-pointer text-center ${
                  atmosphereTemp === temp
                    ? 'bg-sky-600 text-white shadow-md ring-2 ring-sky-300 scale-102'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200'
                }`}
              >
                {temp === 'hangat' ? '🌡️ Hangat (30°)' : temp === 'sejuk' ? '🍃 Sejuk (18°)' : '❄️ Dingin (2°)'}
              </button>
            ))}
          </div>
        </div>

        {/* Control 3: Tutupan Lahan Bumi */}
        <div className="p-4 bg-white rounded-3xl border-2 border-emerald-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm mb-1">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>3. Tutupan Permukaan Bumi</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Mengontrol laju infiltrasi vs limpasan banjir
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLandType('hutan')}
              className={`py-3 px-2 rounded-2xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                landType === 'hutan'
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300 scale-102'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
              }`}
            >
              <Trees className="w-4 h-4" />
              <span>Hutan Alami</span>
            </button>

            <button
              onClick={() => setLandType('semen')}
              className={`py-3 px-2 rounded-2xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                landType === 'semen'
                  ? 'bg-slate-700 text-white shadow-md ring-2 ring-slate-400 scale-102'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Semen Padat</span>
            </button>
          </div>
        </div>
      </div>

      {/* GIANT RAIN TRIGGER BUTTON (Tombol Eksekusi Aksi Sentuh Papan Tulis) */}
      <div className="mt-4">
        <button
          id="smartboard-trigger-rain-btn"
          onClick={handleTriggerRain}
          disabled={rainTimerActive}
          className={`w-full py-4 px-6 rounded-3xl text-sm sm:text-base font-black shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-3 cursor-pointer ${
            rainTimerActive
              ? 'bg-blue-800 text-cyan-200 cursor-not-allowed animate-pulse'
              : 'bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-blue-200 hover:shadow-xl'
          }`}
        >
          <CloudRain className="w-6 h-6" />
          <span>
            {rainTimerActive
              ? '🌧️ HUJAN SEDANG MENGGUYUR BUMI... AMATI ALIRAN AIRNYA!'
              : '🌧️ SENTUH UNTUK TURUNKAN HUJAN (PRESIPITASI)'}
          </span>
        </button>
      </div>

      {/* CLASSROOM MISSIONS (Tantangan Giliran Murid / Kelompok di Smartboard) */}
      <div className="mt-6 p-5 bg-white rounded-3xl border-2 border-indigo-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Tantangan Giliran Kelompok di Smartboard
            </h2>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Guru memanggil perwakilan murid ke depan kelas
          </span>
        </div>

        {/* Mission Tabs */}
        <div className="grid sm:grid-cols-3 gap-2 mb-4">
          {MISSIONS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setActiveMissionId(m.id);
                setMissionSuccess(null);
              }}
              className={`p-3 rounded-2xl border text-xs font-bold text-left transition cursor-pointer ${
                activeMissionId === m.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200'
                  : 'bg-slate-50 hover:bg-indigo-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="font-extrabold">{m.title}</div>
            </button>
          ))}
        </div>

        {/* Active Mission Card */}
        {activeMissionId && (
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 animate-in fade-in">
            {(() => {
              const activeM = MISSIONS.find((m) => m.id === activeMissionId);
              if (!activeM) return null;

              return (
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 mb-3">
                    <strong>Tugas Murid:</strong> {activeM.goal}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleVerifyMission}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition cursor-pointer"
                    >
                      Periksa Kondisi Simulasi
                    </button>

                    {missionSuccess !== null && (
                      <div
                        className={`p-3 rounded-xl border text-xs font-medium flex-1 ${
                          missionSuccess
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-950'
                            : 'bg-amber-100 border-amber-300 text-amber-950'
                        }`}
                      >
                        {missionSuccess ? (
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong className="block">Selamat, Misi Berhasil! 🎉</strong>
                              <span>{activeM.explanation}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong className="block">Kondisi Belum Sesuai</strong>
                              <span>
                                Pastikan kamu sudah mengatur Matahari, Suhu Atmosfer, Tutupan Lahan, dan menekan tombol
                                "Turunkan Hujan" sesuai instruksi misi di atas!
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Tirta Mascot Commentary */}
      <div className="mt-5">
        <TirtaMascot
          dialogue="Sentuh tombol kontrol di atas untuk melihat bagaimana panas matahari, dinginnya atmosfer, dan tutupan pohon bekerja sama menjaga siklus air di bumi kita!"
          mood="excited"
        />
      </div>

      {/* Teacher Guide Box for Classroom Smartboard */}
      <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <div className="text-xl">👩‍🏫</div>
        <div className="leading-relaxed">
          <strong>Saran Pembelajaran Smartboard untuk Guru (Pak Madi):</strong>
          <ul className="list-disc list-inside mt-1 space-y-1 text-slate-700">
            <li>
              <strong>Estafet Murid:</strong> Panggil 3 murid berbeda: Murid A bertugas sebagai "Matahari", Murid B sebagai "Atmosfer", dan Murid C sebagai "Penjaga Tanah".
            </li>
            <li>
              <strong>Diskusi Prediksi:</strong> Sebelum menekan tombol hujan, tanyakan ke kelas: <em>"Jika tanah kita ubah menjadi semen, menurut kalian apa yang terjadi pada air sumur?"</em>.
            </li>
            <li>
              <strong>Anotasi Pena Smartboard:</strong> Minta murid maju untuk melingkari proses evaporasi dan transpirasi menggunakan spidol digital.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
