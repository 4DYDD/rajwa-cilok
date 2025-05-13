import type { TutorialStep } from "@/app/hooks/useTutorialStore";
import type React from 'react';

export interface StepContentProps {
  currentStep: TutorialStep;
  commonBoxProps: {
    ref: React.RefObject<HTMLDivElement | null>;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  defaultClasses: string;
  nextStep: () => void;
  hideTutorial: () => void;
  skipPermanently: () => void;
  isLastStep: boolean;
}
