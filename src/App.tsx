/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId } from './types';
import { Navbar } from './components/Navbar';
import { TeacherGuideModal } from './components/TeacherGuideModal';

import { LandingScreen } from './screens/LandingScreen';
import { MapScreen } from './screens/MapScreen';
import { PuddleTriggerScreen } from './screens/PuddleTriggerScreen';
import { EvaporationExplorationScreen } from './screens/EvaporationExplorationScreen';
import { VaporSourcesScreen } from './screens/VaporSourcesScreen';
import { CondensationScreen } from './screens/CondensationScreen';
import { CloudSequencingScreen } from './screens/CloudSequencingScreen';
import { PrecipitationScreen } from './screens/PrecipitationScreen';
import { WaterDestinationScreen } from './screens/WaterDestinationScreen';
import { WaterPathMatchingScreen } from './screens/WaterPathMatchingScreen';
import { CompleteCycleScreen } from './screens/CompleteCycleScreen';
import { BuildCycleScreen } from './screens/BuildCycleScreen';
import { EnvironmentalImpactScreen } from './screens/EnvironmentalImpactScreen';
import { DetectiveCasesScreen } from './screens/DetectiveCasesScreen';
import { EvaluationScreen } from './screens/EvaluationScreen';
import { SummaryScreen } from './screens/SummaryScreen';
import { ReflectionScreen } from './screens/ReflectionScreen';
import { CompletionScreen } from './screens/CompletionScreen';
import { SmartboardScreen } from './screens/SmartboardScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [completedMilestones, setCompletedMilestones] = useState<number[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState<number>(1);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState(false);

  // Guided Reflection State
  const [reflectionData, setReflectionData] = useState({
    learned: '',
    favorite: '',
    action: '',
  });

  const markMilestoneCompleted = (milestoneId: number) => {
    if (!completedMilestones.includes(milestoneId)) {
      setCompletedMilestones((prev) => [...prev, milestoneId]);
    }
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetProgress = () => {
    if (window.confirm('Apakah kamu ingin mengulang petualangan dari awal?')) {
      setCompletedMilestones([]);
      setCurrentMilestone(1);
      setReflectionData({ learned: '', favorite: '', action: '' });
      handleNavigate('landing');
    }
  };

  const handleUpdateReflection = (field: 'learned' | 'favorite' | 'action', val: string) => {
    setReflectionData((prev) => ({ ...prev, [field]: val }));
  };

  // Render the current active screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <LandingScreen
            onStart={() => handleNavigate('map')}
            onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
            onOpenSmartboard={() => handleNavigate('smartboard_lab')}
          />
        );

      case 'map':
        return (
          <MapScreen
            completedMilestones={completedMilestones}
            currentMilestone={currentMilestone}
            onSelectMilestone={(screenId, milestoneId) => {
              setCurrentMilestone(milestoneId);
              handleNavigate(screenId);
            }}
            onOpenSmartboard={() => handleNavigate('smartboard_lab')}
          />
        );

      case 'puddle_trigger':
        return (
          <PuddleTriggerScreen
            onNext={() => handleNavigate('evap_transp_explore')}
            onBackToMap={() => handleNavigate('map')}
          />
        );

      case 'evap_transp_explore':
        return (
          <EvaporationExplorationScreen
            onNext={() => handleNavigate('vapor_sources')}
            onBack={() => handleNavigate('puddle_trigger')}
          />
        );

      case 'vapor_sources':
        return (
          <VaporSourcesScreen
            onNext={() => {
              markMilestoneCompleted(1);
              setCurrentMilestone(2);
              handleNavigate('condensation');
            }}
            onBack={() => handleNavigate('evap_transp_explore')}
          />
        );

      case 'condensation':
        return (
          <CondensationScreen
            onNext={() => handleNavigate('cloud_sequence')}
            onBack={() => handleNavigate('vapor_sources')}
          />
        );

      case 'cloud_sequence':
        return (
          <CloudSequencingScreen
            onNext={() => {
              markMilestoneCompleted(2);
              setCurrentMilestone(3);
              handleNavigate('precipitation');
            }}
            onBack={() => handleNavigate('condensation')}
          />
        );

      case 'precipitation':
        return (
          <PrecipitationScreen
            onNext={() => {
              markMilestoneCompleted(3);
              setCurrentMilestone(4);
              handleNavigate('water_destination')}
            }
            onBack={() => handleNavigate('cloud_sequence')}
          />
        );

      case 'water_destination':
        return (
          <WaterDestinationScreen
            onNext={() => handleNavigate('water_path_match')}
            onBack={() => handleNavigate('precipitation')}
          />
        );

      case 'water_path_match':
        return (
          <WaterPathMatchingScreen
            onNext={() => {
              markMilestoneCompleted(4);
              setCurrentMilestone(5);
              handleNavigate('complete_cycle');
            }}
            onBack={() => handleNavigate('water_destination')}
          />
        );

      case 'complete_cycle':
        return (
          <CompleteCycleScreen
            onNext={() => handleNavigate('build_cycle')}
            onBack={() => handleNavigate('water_path_match')}
          />
        );

      case 'build_cycle':
        return (
          <BuildCycleScreen
            onNext={() => {
              markMilestoneCompleted(5);
              setCurrentMilestone(6);
              handleNavigate('environment_case');
            }}
            onBack={() => handleNavigate('complete_cycle')}
          />
        );

      case 'environment_case':
        return (
          <EnvironmentalImpactScreen
            onNext={() => handleNavigate('detective_cases')}
            onBack={() => handleNavigate('build_cycle')}
          />
        );

      case 'detective_cases':
        return (
          <DetectiveCasesScreen
            onNext={() => {
              markMilestoneCompleted(6);
              setCurrentMilestone(7);
              handleNavigate('evaluation');
            }}
            onBack={() => handleNavigate('environment_case')}
          />
        );

      case 'evaluation':
        return (
          <EvaluationScreen
            onNext={() => handleNavigate('summary')}
            onBack={() => handleNavigate('detective_cases')}
          />
        );

      case 'summary':
        return (
          <SummaryScreen
            onNext={() => handleNavigate('reflection')}
            onBack={() => handleNavigate('evaluation')}
          />
        );

      case 'reflection':
        return (
          <ReflectionScreen
            reflectionData={reflectionData}
            onUpdateReflection={handleUpdateReflection}
            onNext={() => {
              markMilestoneCompleted(7);
              handleNavigate('completion');
            }}
            onBack={() => handleNavigate('summary')}
          />
        );

      case 'completion':
        return (
          <CompletionScreen
            onGoHome={() => handleNavigate('landing')}
            onGoMap={() => handleNavigate('map')}
            onGoSummary={() => handleNavigate('summary')}
            onRestart={handleResetProgress}
          />
        );

      case 'smartboard_lab':
        return (
          <SmartboardScreen
            onBackToMap={() => handleNavigate('map')}
          />
        );

      default:
        return (
          <LandingScreen
            onStart={() => handleNavigate('map')}
            onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans selection:bg-sky-200 selection:text-sky-900">
      {/* Top Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onResetProgress={handleResetProgress}
      />

      {/* Main Learning Content Area */}
      <main className="flex-1 w-full flex flex-col justify-center">
        {renderScreen()}
      </main>

      {/* Teacher Guide Modal */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
    </div>
  );
}
