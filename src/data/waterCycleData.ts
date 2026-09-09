/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LearningObjective, MapMilestone, EvaluationQuestion, DetectiveCase } from '../types';

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  {
    id: 'tp1',
    code: 'TP1',
    title: 'Pengertian Siklus Air',
    description: 'Menjelaskan pengertian siklus air sebagai perputaran air yang berlangsung terus-menerus di bumi.',
  },
  {
    id: 'tp2',
    code: 'TP2',
    title: 'Proses Utama Siklus Air',
    description: 'Mengidentifikasi proses evaporasi, transpirasi, kondensasi, presipitasi, infiltrasi, dan aliran permukaan.',
  },
  {
    id: 'tp3',
    code: 'TP3',
    title: 'Urutan Tahapan Siklus Air',
    description: 'Mengurutkan tahapan siklus air dengan tepat dari penguapan hingga kembali ke bumi.',
  },
  {
    id: 'tp4',
    code: 'TP4',
    title: 'Energi Panas Matahari & Penguapan',
    description: 'Menjelaskan hubungan energi panas matahari dengan perubahan air menjadi uap air.',
  },
  {
    id: 'tp5',
    code: 'TP5',
    title: 'Hubungan Antarproses Siklus',
    description: 'Menganalisis hubungan antara pendinginan di atmosfer, pembentukan awan, dan jatuhnya air hujan.',
  },
  {
    id: 'tp6',
    code: 'TP6',
    title: 'Dampak Perubahan Lingkungan',
    description: 'Memprediksi dampak berkurangnya pepohonan atau tertutupnya tanah oleh bangunan terhadap siklus air.',
  },
  {
    id: 'tp7',
    code: 'TP7',
    title: 'Menjaga Ketersediaan Air',
    description: 'Menjelaskan pentingnya menjaga kelestarian lingkungan dan daerah resapan air untuk kehidupan.',
  },
];

export const MAP_MILESTONES: MapMilestone[] = [
  {
    id: 1,
    screenId: 'puddle_trigger',
    title: 'Dari Mana Uap Air Berasal?',
    subtitle: 'Menyelidiki genangan air, panas matahari, dan penguapan',
    stageNumber: 1,
  },
  {
    id: 2,
    screenId: 'condensation',
    title: 'Bagaimana Awan Terbentuk?',
    subtitle: 'Kondensasi uap air menjadi titik-titik air di atmosfer',
    stageNumber: 2,
  },
  {
    id: 3,
    screenId: 'precipitation',
    title: 'Mengapa Hujan Turun?',
    subtitle: 'Presipitasi saat titik air awan semakin membesar dan berat',
    stageNumber: 3,
  },
  {
    id: 4,
    screenId: 'water_destination',
    title: 'Ke Mana Air Hujan Pergi?',
    subtitle: 'Menelusuri infiltrasi ke tanah dan aliran air permukaan',
    stageNumber: 4,
  },
  {
    id: 5,
    screenId: 'complete_cycle',
    title: 'Siklus Air Lengkap',
    subtitle: 'Mengamati perputaran air secara utuh dan terhubung',
    stageNumber: 5,
  },
  {
    id: 6,
    screenId: 'environment_case',
    title: 'Jika Lingkungan Berubah...',
    subtitle: 'Studi kasus dampak semen/beton vs tanah resapan pohon',
    stageNumber: 6,
  },
  {
    id: 7,
    screenId: 'summary',
    title: 'Rangkuman dan Refleksi',
    subtitle: 'Menyimpulkan penemuan belajar bersama Tirta',
    stageNumber: 7,
  },
];

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: 1,
    situation: 'Seragam olahraga basah milik Beni yang dijemur di lapangan sekolah pada pagi hari menjadi kering di siang hari.',
    clue: 'Air di kain seragam menyerap panas dari sinar matahari dan berubah wujud menjadi uap air yang naik ke udara.',
    correctProcess: 'Evaporasi',
    explanation: 'Penguapan air dari benda basah atau permukaan air akibat panas matahari disebut evaporasi.',
  },
  {
    id: 2,
    situation: 'Di pagi hari yang dingin, terlihat titik-titik air menempel pada permukaan luar botol air es atau kaca jendela.',
    clue: 'Uap air di udara sekitar yang hangat bersentuhan dengan kaca yang dingin sehingga suhunya turun.',
    correctProcess: 'Kondensasi',
    explanation: 'Perubahan uap air (gas) menjadi titik-titik air (cair) karena mengalami pendinginan disebut kondensasi.',
  },
  {
    id: 3,
    situation: 'Setelah hujan lebat, air di lapangan rumput sekolah perlahan menghilang masuk ke sela-sela pori tanah.',
    clue: 'Air bergerak ke bawah permukaan tanah dan disimpan sebagai cadangan air tanah.',
    correctProcess: 'Infiltrasi',
    explanation: 'Peresapan air ke dalam lapisan tanah melalui pori-pori tanah disebut infiltrasi.',
  },
  {
    id: 4,
    situation: 'Air hujan mengalir deras di permukaan jalan aspal menuju selokan dan terus mengalir menuju sungai terdekat.',
    clue: 'Air yang tidak dapat meresap ke tanah mengalir di atas permukaan bumi menuju tempat yang lebih rendah.',
    correctProcess: 'Aliran Permukaan',
    explanation: 'Air hujan yang melimpas dan bergerak di atas permukaan tanah/aspal disebut aliran permukaan (runoff).',
  },
  {
    id: 5,
    situation: 'Pohon beringin besar di halaman sekolah melepaskan uap air segar ke udara melalui pori-pori stomata pada daunnya.',
    clue: 'Air diserap dari tanah oleh akar, dialirkan ke daun, lalu diuapkan ke atmosfer oleh tumbuhan.',
    correctProcess: 'Transpirasi',
    explanation: 'Pelepasan uap air oleh tumbuhan hidup ke udara melalui daun disebut transpirasi.',
  },
];

export const EVALUATION_QUESTIONS: EvaluationQuestion[] = [
  {
    id: 1,
    tpCode: 'TP1',
    type: 'multiple_choice',
    question: 'Mengapa air di bumi tidak pernah habis meskipun jutaan manusia, hewan, dan tumbuhan menggunakannya setiap hari?',
    options: [
      {
        id: 'A',
        text: 'Air terus-menerus didatangkan dari luar angkasa ke bumi.',
        isCorrect: false,
        feedback: 'Kurang tepat. Air di bumi tidak datang dari luar angkasa secara terus-menerus.',
      },
      {
        id: 'B',
        text: 'Air mengalami perputaran terus-menerus melalui siklus air dengan bantuan energi matahari.',
        isCorrect: true,
        feedback: 'Tepat sekali! Siklus air membuat jumlah air di bumi selalu berputar dalam berbagai wujud dan tempat.',
      },
      {
        id: 'C',
        text: 'Bebatuan di bawah tanah terus-menerus memproduksi air baru.',
        isCorrect: false,
        feedback: 'Kurang tepat. Batuan menyimpan air tanah, bukan memproduksi air dari ketiadaan.',
      },
      {
        id: 'D',
        text: 'Air hujan selalu menambah jumlah total air di bumi menjadi semakin banyak.',
        isCorrect: false,
        feedback: 'Kurang tepat. Hujan adalah bagian dari air yang sebelumnya sudah menguap dari bumi.',
      },
    ],
    explanation: 'Siklus air memastikan air berputar tanpa henti antara permukaan bumi dan atmosfer, sehingga jumlah total air di bumi tetap terjaga.',
  },
  {
    id: 2,
    tpCode: 'TP2',
    type: 'multiple_choice',
    question: 'Tumbuhan di hutan melepaskan uap air ke udara melalui pori-pori daunnya. Peristiwa pelepasan uap air oleh tumbuhan ini disebut...',
    options: [
      {
        id: 'A',
        text: 'Evaporasi',
        isCorrect: false,
        feedback: 'Belum tepat. Evaporasi adalah penguapan dari badan air tak bernyawa seperti laut, sungai, atau genangan.',
      },
      {
        id: 'B',
        text: 'Transpirasi',
        isCorrect: true,
        feedback: 'Hebat! Penguapan uap air dari jaringan tumbuhan (terutama daun) disebut transpirasi.',
      },
      {
        id: 'C',
        text: 'Kondensasi',
        isCorrect: false,
        feedback: 'Belum tepat. Kondensasi adalah proses pengembunan uap air menjadi titik-titik air awan.',
      },
      {
        id: 'D',
        text: 'Infiltrasi',
        isCorrect: false,
        feedback: 'Belum tepat. Infiltrasi adalah proses peresapan air ke dalam tanah.',
      },
    ],
    explanation: 'Transpirasi adalah proses penguapan air dari makhluk hidup tumbuhan ke atmosfer.',
  },
  {
    id: 3,
    tpCode: 'TP3',
    type: 'sequencing',
    question: 'Susunlah tahapan perjalanan setetes air dari permukaan laut hingga kembali meresap ke dalam tanah dengan urutan yang benar!',
    sequencingItems: [
      { id: 'seq-1', text: 'Panas matahari memanaskan air laut hingga berubah menjadi uap air (Evaporasi)', correctIndex: 0 },
      { id: 'seq-2', text: 'Uap air naik tinggi, mendingin, dan berkumpul menjadi titik-titik air awan (Kondensasi)', correctIndex: 1 },
      { id: 'seq-3', text: 'Butiran air awan semakin membesar, berat, lalu jatuh ke bumi (Presipitasi)', correctIndex: 2 },
      { id: 'seq-4', text: 'Air hujan meresap ke dalam tanah melalui celah pori-pori tanah (Infiltrasi)', correctIndex: 3 },
    ],
    explanation: 'Urutan siklus dimulai dari energi matahari yang memicu penguapan (evaporasi), pendinginan membentuk awan (kondensasi), jatuhnya hujan (presipitasi), dan penyerapan oleh tanah (infiltrasi).',
  },
  {
    id: 4,
    tpCode: 'TP2',
    type: 'classification',
    question: 'Klasifikasikan peristiwa alam berikut ke dalam kelompok yang tepat!',
    classificationItems: [
      { id: 'cl-1', text: 'Air danau menguap di siang terik', targetCategory: 'uap' },
      { id: 'cl-2', text: 'Hujan lebat mengguyur persawahan', targetCategory: 'kembali' },
      { id: 'cl-3', text: 'Uap air keluar dari pori daun pohon jati', targetCategory: 'uap' },
      { id: 'cl-4', text: 'Gerimis membasahi halaman sekolah', targetCategory: 'kembali' },
    ],
    explanation: 'Evaporasi dan transpirasi menambahkan uap air ke udara, sedangkan presipitasi (hujan/gerimis) mengembalikan air ke permukaan bumi.',
  },
  {
    id: 5,
    tpCode: 'TP5',
    type: 'diagram',
    question: 'Jika udara di lapisan atas atmosfer tetap bersuhu panas dan tidak mengalami pendinginan, apa yang akan terjadi pada uap air?',
    options: [
      {
        id: 'A',
        text: 'Uap air akan langsung membeku menjadi batu es besar.',
        isCorrect: false,
        feedback: 'Kurang tepat. Pembekuan membutuhkan udara yang sangat dingin.',
      },
      {
        id: 'B',
        text: 'Uap air akan sulit mengalami kondensasi sehingga awan dan hujan sulit terbentuk.',
        isCorrect: true,
        feedback: 'Luar biasa! Kondensasi memerlukan pendinginan suhu agar uap air dapat berubah menjadi titik-titik air awan.',
      },
      {
        id: 'C',
        text: 'Air laut akan langsung mengering dalam 1 menit.',
        isCorrect: false,
        feedback: 'Kurang tepat. Penguapan air laut tetap terjadi secara wajar.',
      },
      {
        id: 'D',
        text: 'Semua sungai akan berbalik arah mengalir ke puncak gunung.',
        isCorrect: false,
        feedback: 'Kurang tepat. Gravitasi bumi selalu menarik air ke tempat yang lebih rendah.',
      },
    ],
    explanation: 'Kondensasi hanya dapat terjadi ketika uap air mengalami penurunan suhu (pendinginan) di ketinggian atmosfer.',
  },
  {
    id: 6,
    tpCode: 'TP5',
    type: 'prediction',
    question: 'Kamu melihat langit berawan putih bersih di siang hari. Mengapa dari awan tersebut belum turun hujan?',
    options: [
      {
        id: 'A',
        text: 'Karena titik-titik air di awan masih sangat kecil dan ringan sehingga masih mampu melayang di udara.',
        isCorrect: true,
        feedback: 'Tepat! Hujan baru akan turun jika titik-titik air bergabung menjadi cukup besar dan terlalu berat ditopang udara.',
      },
      {
        id: 'B',
        text: 'Karena awan tersebut tidak terbuat dari air melainkan dari kapas.',
        isCorrect: false,
        feedback: 'Belum tepat. Awan terdiri dari miliaran butiran air kecil atau kristal es.',
      },
      {
        id: 'C',
        text: 'Karena matahari melarang hujan turun pada siang hari.',
        isCorrect: false,
        feedback: 'Belum tepat. Waktu turunnya hujan dipengaruhi oleh kejenuhan dan berat butiran air di awan.',
      },
      {
        id: 'D',
        text: 'Karena awan belum menyentuh puncak pohon.',
        isCorrect: false,
        feedback: 'Belum tepat. Awan berada tinggi di atmosfer.',
      },
    ],
    explanation: 'Presipitasi memerlukan butiran air di dalam awan saling bertubrukan, menyatu, hingga ukurannya cukup berat untuk ditarik gravitasi bumi ke bawah.',
  },
  {
    id: 7,
    tpCode: 'TP6',
    type: 'case_study',
    question: 'Di sekitar sebuah pemukiman, hampir seluruh halaman tanah disemen tebal dan pohon-pohon ditebang. Ketika hujan lebat datang, apa dampak yang paling mungkin terjadi?',
    options: [
      {
        id: 'A',
        text: 'Air hujan lebih cepat meresap menjadi air sumur yang melimpah.',
        isCorrect: false,
        feedback: 'Belum tepat. Semen tidak memiliki pori-pori yang dapat dilewati air hujan.',
      },
      {
        id: 'B',
        text: 'Aliran air permukaan meningkat drastis dan memicu genangan banjir karena air tidak bisa meresap ke tanah.',
        isCorrect: true,
        feedback: 'Tepat sekali! Permukaan kedap air menghambat infiltrasi, sehingga air melimpas di permukaan dan rawan memicu banjir.',
      },
      {
        id: 'C',
        text: 'Penguapan air dari laut akan terhenti selamanya.',
        isCorrect: false,
        feedback: 'Belum tepat. Laut tetap menguap seperti biasa.',
      },
      {
        id: 'D',
        text: 'Suhu matahari langsung menjadi dingin seketika.',
        isCorrect: false,
        feedback: 'Belum tepat. Perubahan permukaan tanah tidak mempengaruhi energi matahari.',
      },
    ],
    explanation: 'Tanaman dan tanah terbuka berfungsi sebagai spons alami yang menyerap air (infiltrasi). Bila tertutup semen, air hujan menjadi aliran permukaan liar.',
  },
  {
    id: 8,
    tpCode: 'TP7',
    type: 'multiple_choice',
    question: 'Apa langkah sederhana yang dapat dilakukan peserta didik kelas V SDN Sadeng 02 untuk menjaga kelestarian siklus air di lingkungan sekolah?',
    options: [
      {
        id: 'A',
        text: 'Menghabiskan seluruh air di bak mandi sekolah setiap istirahat.',
        isCorrect: false,
        feedback: 'Kurang tepat. Menghamburkan air bersih merugikan cadangan air.',
      },
      {
        id: 'B',
        text: 'Menanam tanaman di kebun sekolah, membiarkan area tanah terbuka, dan menghemat pemakaian air.',
        isCorrect: true,
        feedback: 'Sangat tepat! Menjaga tanaman dan tanah resapan membantu air hujan meresap menjadi cadangan air tanah.',
      },
      {
        id: 'C',
        text: 'Menutup seluruh lapangan sekolah dengan karpet plastik kedap air.',
        isCorrect: false,
        feedback: 'Kurang tepat. Plastik mencegah air hujan masuk ke tanah.',
      },
      {
        id: 'D',
        text: 'Membuang sampah bekas jajanan ke dalam saluran selokan sekolah.',
        isCorrect: false,
        feedback: 'Kurang tepat. Sampah menyumbat aliran air dan mencemari air.',
      },
    ],
    explanation: 'Menanam pohon dan menjaga daerah resapan air sangat penting untuk menjamin ketersediaan cadangan air tanah bagi kehidupan.',
  },
];
