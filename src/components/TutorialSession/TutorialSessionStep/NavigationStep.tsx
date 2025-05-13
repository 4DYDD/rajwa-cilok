// c:\Project-Ngoding\rajwa-cilok\src\components\TutorialSession\TutorialSessionStep\NavigationStep.tsx
import React from 'react';
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import type { StepContentProps } from '@/app/interfaces/StepContentProps.interface'; // Updated import path

const NavigationStep: React.FC<StepContentProps> = ({
  currentStep,
  commonBoxProps,
  defaultClasses,
  nextStep, // Though it's the last step, nextStep might be used to close the tutorial or similar action
  hideTutorial,
  skipPermanently,
}) => {
  return (
    <div {...commonBoxProps} className={`bg-indigo-100 p-5 rounded-lg shadow-lg w-[350px] text-indigo-700 ${defaultClasses} animate-squish-kalem`}>
      {currentStep.title && (
        <h3 className="text-xl font-bold mb-3">🗺️ {currentStep.title} 🗺️</h3>
      )}
      <p className="text-base mb-4">{currentStep.text}</p>
      <div className="flexc mb-3">
        <button
          onClick={(e) => { e.stopPropagation(); nextStep(); }} // Or hideTutorial() if that's the desired behavior
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md text-base flex items-center ring-2 ring-indigo-300 focus:ring-4 transition-all duration-150 ease-in-out transform active:scale-95"
        >
          Selesai! <CheckCircleIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
      <div className="flex space-x-2 justify-center w-full">
        {/* Optional: Hide skip buttons on the last step or change their behavior */}
        <button onClick={(e) => { e.stopPropagation(); hideTutorial(); }} className="bg-gray-200 hover:bg-gray-300 text-gray-600 py-1 px-3 rounded text-xs">Tutup</button>
        <button onClick={(e) => { e.stopPropagation(); skipPermanently(); }} className="bg-red-300 hover:bg-red-400 text-red-700 py-1 px-3 rounded text-xs">Gak Usah Lagi</button>
      </div>
    </div>
  );
};

export default NavigationStep;
