/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenId =
  | 'landing' // S1
  | 'map' // S2
  | 'puddle_trigger' // S3
  | 'evap_transp_explore' // S4
  | 'vapor_sources' // S5
  | 'condensation' // S6
  | 'cloud_sequence' // S7
  | 'precipitation' // S8
  | 'water_destination' // S9
  | 'water_path_match' // S10
  | 'complete_cycle' // S11
  | 'build_cycle' // S12
  | 'environment_case' // S13
  | 'detective_cases' // S14
  | 'evaluation' // S15
  | 'summary' // S16
  | 'reflection' // S17
  | 'completion' // S18
  | 'smartboard_lab'; // Smartboard Interactive Activity

export interface LearningObjective {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface MapMilestone {
  id: number;
  screenId: ScreenId;
  title: string;
  subtitle: string;
  stageNumber: number;
}

export interface EvaluationQuestion {
  id: number;
  tpCode: string;
  type: 'multiple_choice' | 'sequencing' | 'classification' | 'diagram' | 'prediction' | 'case_study';
  question: string;
  context?: string;
  options?: { id: string; text: string; isCorrect: boolean; feedback: string }[];
  sequencingItems?: { id: string; text: string; correctIndex: number }[];
  classificationItems?: {
    id: string;
    text: string;
    targetCategory: 'uap' | 'kembali';
  }[];
  explanation: string;
}

export interface DetectiveCase {
  id: number;
  situation: string;
  clue: string;
  correctProcess: string;
  explanation: string;
}
