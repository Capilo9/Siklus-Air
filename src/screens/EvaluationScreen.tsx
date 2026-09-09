/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, RotateCcw, Award, Sparkles, BookOpen } from 'lucide-react';
import { EVALUATION_QUESTIONS } from '../data/waterCycleData';
import { TirtaMascot } from '../components/TirtaMascot';

interface EvaluationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const EvaluationScreen: React.FC<EvaluationScreenProps> = ({ onNext, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isEvaluationFinished, setIsEvaluationFinished] = useState(false);

  // State for sequencing question (Question 3)
  const [seqItems, setSeqItems] = useState(
    EVALUATION_QUESTIONS[2].sequencingItems ? [...EVALUATION_QUESTIONS[2].sequencingItems] : []
  );

  // State for classification question (Question 4)
  const [classMatches, setClassMatches] = useState<Record<string, 'uap' | 'kembali'>>({});

  const q = EVALUATION_QUESTIONS[currentIdx];

  // Sequencing move handler
  const moveSeqItem = (index: number, direction: 'up' | 'down') => {
    if (showFeedback) return;
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= seqItems.length) return;
    const items = [...seqItems];
    const temp = items[index];
    items[index] = items[target];
    items[target] = temp;
    setSeqItems(items);
  };

  // Multiple Choice / Diagram / Prediction / Case Study handler
  const handleOptionSelect = (optionId: string) => {
    setUserAnswers((prev) => ({ ...prev, [q.id]: optionId }));
    setShowFeedback(true);
  };

  // Check Sequencing
  const handleCheckSeq = () => {
    const isCorrect = seqItems.every((item, idx) => item.correctIndex === idx);
    setUserAnswers((prev) => ({ ...prev, [q.id]: isCorrect }));
    setShowFeedback(true);
  };

  // Check Classification
  const handleCheckClassification = () => {
    const isCorrect = q.classificationItems?.every(
      (item) => classMatches[item.id] === item.targetCategory
    );
    setUserAnswers((prev) => ({ ...prev, [q.id]: isCorrect }));
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentIdx < EVALUATION_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsEvaluationFinished(true);
    }
  };

  // Calculate understanding level without competitive scoring
  const correctCount = EVALUATION_QUESTIONS.filter((question) => {
    const ans = userAnswers[question.id];
    if (question.type === 'multiple_choice' || question.type === 'diagram' || question.type === 'prediction' || question.type === 'case_study') {
      const opt = question.options?.find((o) => o.id === ans);
      return opt?.isCorrect;
    }
    return ans === true;
  }).length;

  const isWellUnderstood = correctCount >= 6;

  // Render question types
  const renderQuestionBody = () => {
    if (q.type === 'sequencing') {
      return (
        <div className="space-y-2 mt-4">
          {seqItems.map((item, index) => (
            <div
              key={item.id}
              className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-slate-800 font-medium">{item.text}</span>
              </div>
              {!showFeedback && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveSeqItem(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-sky-700 hover:bg-sky-100 rounded disabled:text-slate-300"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveSeqItem(index, 'down')}
                    disabled={index === seqItems.length - 1}
                    className="p-1 text-sky-700 hover:bg-sky-100 rounded disabled:text-slate-300"
                  >
                    ▼
                  </button>
                </div>
              )}
            </div>
          ))}

          {!showFeedback && (
            <div className="text-center pt-3">
              <button
                onClick={handleCheckSeq}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
              >
                Periksa Urutan Saya
              </button>
            </div>
          )}
        </div>
      );
    }

    if (q.type === 'classification') {
      const allClassified = q.classificationItems?.every((item) => !!classMatches[item.id]);

      return (
        <div className="mt-4 space-y-3">
          {q.classificationItems?.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <span className="text-xs sm:text-sm font-medium text-slate-800">{item.text}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => !showFeedback && setClassMatches((prev) => ({ ...prev, [item.id]: 'uap' }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    classMatches[item.id] === 'uap'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-amber-100'
                  }`}
                >
                  Menambah Uap Air
                </button>
                <button
                  onClick={() => !showFeedback && setClassMatches((prev) => ({ ...prev, [item.id]: 'kembali' }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    classMatches[item.id] === 'kembali'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-blue-100'
                  }`}
                >
                  Mengembalikan Air
                </button>
              </div>
            </div>
          ))}

          {!showFeedback && (
            <div className="text-center pt-3">
              <button
                onClick={handleCheckClassification}
                disabled={!allClassified}
                className={`px-5 py-2 text-xs font-bold rounded-xl shadow-xs transition ${
                  allClassified
                    ? 'bg-sky-600 hover:bg-sky-700 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Periksa Klasifikasi
              </button>
            </div>
          )}
        </div>
      );
    }

    // Default: Options (MC, diagram, prediction, case_study)
    return (
      <div className="space-y-2.5 mt-4">
        {q.options?.map((opt) => {
          const isSelected = userAnswers[q.id] === opt.id;
          let optStyle = 'bg-white border-slate-200 hover:border-sky-300 text-slate-700 hover:bg-sky-50/40';

          if (showFeedback && isSelected) {
            optStyle = opt.isCorrect
              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200 font-bold'
              : 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-200 font-bold';
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleOptionSelect(opt.id)}
              disabled={showFeedback}
              className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition cursor-pointer flex items-start gap-2.5 ${optStyle}`}
            >
              <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                {opt.id}
              </span>
              <span className="leading-snug">{opt.text}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // Feedback renderer for current question
  const isCurrentCorrect = () => {
    if (q.type === 'multiple_choice' || q.type === 'diagram' || q.type === 'prediction' || q.type === 'case_study') {
      return q.options?.find((o) => o.id === userAnswers[q.id])?.isCorrect;
    }
    return userAnswers[q.id] === true;
  };

  if (isEvaluationFinished) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
          🏆
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          Kamu Sudah Menyelesaikan Evaluasi Siklus Air!
        </h2>
        <p className="text-sm text-slate-600 mb-6 max-w-lg mx-auto">
          Terima kasih sudah belajar dengan tekun. Di bawah ini adalah ringkasan pemahaman konsepmu:
        </p>

        {/* Non-competitive understanding indicator */}
        <div
          className={`p-6 rounded-3xl border text-left max-w-xl mx-auto mb-6 shadow-sm ${
            isWellUnderstood
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-sky-50 border-sky-300 text-sky-950'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-base">
              {isWellUnderstood
                ? 'Pemahaman Konsep Sangat Baik!'
                : 'Proses Belajar yang Hebat! Tetap Semangat'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
            {isWellUnderstood
              ? 'Kamu telah memahami seluruh 6 proses siklus air, peran penting energi panas matahari, perbedaan uap air dan awan, serta pentingnya tanah resapan dan pepohonan bagi ketersediaan air.'
              : 'Kamu sudah berusaha dengan sangat baik. Untuk memperkuat pemahaman, kamu dapat membuka kembali materi Kondensasi (Layar 6) dan Infiltrasi Tanah (Layar 9) melalui Peta Belajar.'}
          </p>
        </div>

        <TirtaMascot
          dialogue="Hebat sekali! Sekarang ayo kita lihat rangkuman visual dari seluruh petualangan kita, lalu tuliskan refleksimu di lembar belajar!"
          mood="excited"
        />

        <div className="mt-6">
          <button
            id="eval-to-summary-btn"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-2xl shadow-md transition cursor-pointer"
          >
            <span>Lanjut ke Rangkuman Materi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span className="font-bold text-sky-700 uppercase tracking-wider">
          Evaluasi Pemahaman Mandiri • {q.tpCode}
        </span>
        <span>
          Soal {currentIdx + 1} dari {EVALUATION_QUESTIONS.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl border-2 border-sky-200 p-5 shadow-sm">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {q.question}
        </h3>

        {renderQuestionBody()}

        {/* Feedback Section */}
        {showFeedback && (
          <div
            className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm animate-in fade-in ${
              isCurrentCorrect()
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-2">
              {isCurrentCorrect() ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span className="font-bold block mb-1">
                  {isCurrentCorrect() ? 'Jawaban Tepat!' : 'Perlu Diingat Kembali:'}
                </span>
                <p className="leading-relaxed">{q.explanation}</p>
              </div>
            </div>

            <div className="mt-3 text-right">
              <button
                id="next-eval-question-btn"
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <span>
                  {currentIdx < EVALUATION_QUESTIONS.length - 1
                    ? 'Soal Berikutnya'
                    : 'Lihat Hasil Evaluasi'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
        >
          ← Kembali
        </button>
      </div>
    </div>
  );
};
