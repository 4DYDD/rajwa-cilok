// c:\Project-Ngoding\rajwa-cilok\src\components\TutorialSession\TutorialSessionStep\MenuSelectionStep.tsx
import React from 'react';
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import type { StepContentProps } from '@/app/interfaces/StepContentProps.interface'; // Updated import path

const MenuSelectionStep: React.FC<StepContentProps> = ({
  currentStep,
  commonBoxProps,
  defaultClasses,
  nextStep,
  hideTutorial,
  skipPermanently,
}) => {
  return (
    <div {...commonBoxProps} className={`bg-teal-100 p-5 rounded-lg shadow-lg w-[350px] text-teal-700 ${defaultClasses} animate-squish-kalem`}>
      {currentStep.title && (
        <h3 className="text-xl font-bold mb-3">🎯 {currentStep.title} 🎯</h3>
      )}
      <p className="text-base mb-4">{currentStep.text}</p>
      <div className="flexc mb-3">
        <button
          onClick={(e) => { e.stopPropagation(); nextStep(); }}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md text-base flex items-center ring-2 ring-teal-300 focus:ring-4 transition-all duration-150 ease-in-out transform active:scale-95"
        >
          Lanjut <ChevronRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
      <div className="flex space-x-2 justify-center w-full">
        <button onClick={(e) => { e.stopPropagation(); hideTutorial(); }} className="bg-gray-200 hover:bg-gray-300 text-gray-600 py-1 px-3 rounded text-xs">Skip</button>
        <button onClick={(e) => { e.stopPropagation(); skipPermanently(); }} className="bg-red-300 hover:bg-red-400 text-red-700 py-1 px-3 rounded text-xs">Gak Usah Lagi</button>
      </div>
    </div>
  );
};

export default MenuSelectionStep;
