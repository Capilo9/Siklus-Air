/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Award, CheckCircle2, Lightbulb, Compass, Users } from 'lucide-react';
import { LEARNING_OBJECTIVES } from '../data/waterCycleData';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-sky-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-sky-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              📘
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">PANDUAN GURU</h2>
              <p className="text-xs text-slate-500 font-medium">
                Media Pembelajaran Interaktif (MPI) Siklus Air • SDN Sadeng 02
              </p>
            </div>
          </div>
          <button
            id="close-teacher-guide-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition"
            aria-label="Tutup Panduan Guru"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Local Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-700">
          {/* Section 1: Identitas */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <h3 className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-600" />
              Identitas Pembelajaran
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Nama Media:</span>
                <strong className="text-slate-800">Petualangan Setetes Air</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Mata Pelajaran:</span>
                <strong className="text-slate-800">IPAS (Fase C)</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Sasaran:</span>
                <strong className="text-slate-800">Kelas V SD</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Satuan Pendidikan:</span>
                <strong className="text-slate-800">SDN Sadeng 02</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Penyusun:</span>
                <strong className="text-slate-800">Pak Madi</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Estimasi Waktu:</span>
                <strong className="text-slate-800">±20–25 Menit</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Tujuan Pembelajaran (TP1-TP7) */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Tujuan Pembelajaran (TP1 – TP7)
            </h3>
            <div className="space-y-2">
              {LEARNING_OBJECTIVES.map((tp) => (
                <div
                  key={tp.id}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-sky-50/50 border border-sky-100 text-xs"
                >
                  <span className="font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md flex-shrink-0">
                    {tp.code}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 mr-1">{tp.title}:</span>
                    <span className="text-slate-600">{tp.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Saran Penggunaan */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Saran Penggunaan oleh Guru
            </h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40">
                <h4 className="font-bold text-amber-900 text-xs mb-1.5 flex items-center gap-1">
                  <span>1. Sebelum Belajar</span>
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Ajak siswa mengamati contoh air di sekitar sekolah (genangan, embun pagi, botol minum).</li>
                  <li>Tanyakan dari mana hujan berasal dan ke mana genangan air hilang.</li>
                  <li>Bangkitkan rasa ingin tahu peserta didik.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/40">
                <h4 className="font-bold text-sky-900 text-xs mb-1.5 flex items-center gap-1">
                  <span>2. Saat Menggunakan Media</span>
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Beri kesempatan peserta didik mencoba secara mandiri atau berpasangan.</li>
                  <li>Jangan terburu-buru memberikan jawaban langsung saat siswa keliru.</li>
                  <li>Manfaatkan umpan balik beralasan dan fitur coba kembali pada media untuk bahan telaah.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40">
                <h4 className="font-bold text-emerald-900 text-xs mb-1.5 flex items-center gap-1">
                  <span>3. Setelah Belajar</span>
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Ajak siswa mendiskusikan hubungan siklus air dan kondisi lingkungan di sekitar SDN Sadeng 02.</li>
                  <li>Tinjau lembar refleksi siswa pada akhir media.</li>
                  <li>Rancang aksi nyata pelestarian air dan penanaman pohon sekolah.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: Panduan Khusus Aktivitas Smartboard di Kelas */}
          <div className="p-4 rounded-xl border-2 border-amber-300 bg-amber-50/70">
            <h3 className="text-xs font-bold text-amber-950 mb-2 flex items-center gap-2">
              <span className="text-base">🖥️</span>
              Panduan Aktivitas Smartboard / Layar Sentuh Interaktif di Depan Kelas
            </h3>
            <p className="text-xs text-amber-900 leading-relaxed mb-2">
              Fitur <strong>Lab Aktivitas Smartboard</strong> dirancang khusus untuk pembelajaran tatap muka di kelas menggunakan Interactive Flat Panel (IFP) atau Smartboard:
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              <li>
                <strong>Metode Estafet Siswa:</strong> Bagi kelas menjadi kelompok dan panggil perwakilan ke depan untuk mengendalikan variabel (Matahari, Suhu Atmosfer, dan Tutupan Tanah).
              </li>
              <li>
                <strong>Spidol Smartboard Digital:</strong> Aktifkan <em>"Mode Coretan"</em> agar murid dapat menggambar panah sirkulasi (panah biru untuk aliran air, panah oranye untuk panas matahari, dan hijau untuk transpirasi) langsung di atas layar sentuh.
              </li>
              <li>
                <strong>Tantangan Skenario Berpikir Kritis:</strong> Gunakan 3 misi tantangan (Misi Hujan Tropis, Misi Pencegahan Banjir, dan Misi Kemarau Semen) untuk melatih murid memprediksi dampak lingkungan sebelum menekan tombol hujan.
              </li>
              <li>
                <strong>Layar Penuh (Fullscreen):</strong> Tekan tombol Layar Penuh di pojok kanan atas agar elemen simulasi tampil maksimal dan jelas terlihat dari bangku belakang kelas.
              </li>
            </ul>
          </div>

          {/* Section 5: Bukti Belajar Autentik */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              Bukti Belajar yang Dapat Diamati Guru
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Guru dapat mengamati kemampuan peserta didik dalam:
              <br />• Mengidentifikasi 6 proses utama siklus air melalui studi kasus konkret.
              <br />• Mengurutkan alur terbentuknya awan dan sirkulasi air di alam.
              <br />• Menjelaskan hubungan sebab-akibat (pengaruh panas matahari, pendinginan atmosfer, gravitasi hujan).
              <br />• Memprediksi dampak alih fungsi lahan tanah menjadi semen/aspal terhadap penurunan infiltrasi air tanah.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-medium">
            Pak Madi • SDN Sadeng 02 • Kurikulum Merdeka IPAS Kelas V
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            Mengerti, Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};
