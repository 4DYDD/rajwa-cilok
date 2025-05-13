"use client";

import React, { useEffect, useRef } from "react";
import useTutorialStore from "@/app/hooks/useTutorialStore"; // Removed TutorialStep import
// Import new step components
import WelcomeStep from "./TutorialSessionStep/WelcomeStep";
import MenuSelectionStep from "./TutorialSessionStep/MenuSelectionStep";
import StoreHoursStep from "./TutorialSessionStep/StoreHoursStep";
import NavigationStep from "./TutorialSessionStep/NavigationStep";
import type { StepContentProps } from "@/app/interfaces/StepContentProps.interface"; // Updated import path

const TutorialSession = () => {
  const {
    isTutorialVisible,
    currentStepIndex,
    tutorialSteps,
    nextStep,
    hideTutorial,
    skipPermanently,
  } = useTutorialStore();

  const textBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTutorialVisible || tutorialSteps.length === 0) {
      return;
    } else {
      const currentStep = tutorialSteps[currentStepIndex];
      if (currentStep && currentStep.highlightedElementId) {
        const highlightedElement = document.getElementById(currentStep.highlightedElementId);
        if (highlightedElement) {
          // TODO: Implementasi penambahan kelas atau style untuk highlight elemen.
        }
      }
    }
  }, [isTutorialVisible, currentStepIndex, tutorialSteps]);

  if (!isTutorialVisible || tutorialSteps.length === 0) {
    return null;
  }

  const currentStep = tutorialSteps[currentStepIndex];

  const handleOverlayClick = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      nextStep();
    } else {
      hideTutorial();
    }
  };

  const defaultTextBoxClasses = "transcenter bg-white p-4 rounded-lg shadow-xl max-w-xs sm:max-w-sm md:max-w-md text-center z-[999]";

  return (
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-[998] cursor-pointer"
        onClick={handleOverlayClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleOverlayClick()}
      >
        {(() => {
          const commonBoxProps = {
            ref: textBoxRef,
            onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),
          };

          // const baseStepClasses = currentStep.textBoxClassName || defaultTextBoxClasses; // This line is removed
          const isLastStep = currentStepIndex >= tutorialSteps.length - 1;

          const stepProps: StepContentProps = {
            currentStep,
            commonBoxProps,
            defaultClasses: defaultTextBoxClasses, // Pass defaultTextBoxClasses as defaultClasses
            nextStep,
            hideTutorial,
            skipPermanently,
            isLastStep,
          };

          switch (currentStepIndex) {
            case 0:
              return <WelcomeStep {...stepProps} />;
            case 1:
              return <MenuSelectionStep {...stepProps} />;
            case 2:
              // Assuming step 2 always corresponds to StoreHoursStep based on InitializeTutorialLogic
              return <StoreHoursStep {...stepProps} />;
            case 3:
              return <NavigationStep {...stepProps} />;
            default:
              // Fallback or handle unexpected step index
              // For now, let's assume InitializeTutorialLogic.tsx covers all valid indices
              // and a default might not be strictly needed if tutorialSteps is well-defined.
              // If a generic fallback is desired, a DefaultStepComponent could be created in TutorialSessionStep.
              console.warn(`TutorialSession: No specific component for step index ${currentStepIndex}`);
              return null; // Or a generic fallback component
          }
        })()}
      </div>
    </>
  );
};

export default TutorialSession;
