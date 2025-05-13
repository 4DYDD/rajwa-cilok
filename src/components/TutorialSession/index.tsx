"use client";

import React, { useEffect, useState, useRef } from "react";
import useTutorialStore from "@/app/hooks/useTutorialStore";
import { PlayIcon } from "@heroicons/react/20/solid";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const TutorialSession = () => {
  const {
    isTutorialVisible,
    currentStepIndex,
    tutorialSteps,
    nextStep,
    hideTutorial,
    skipPermanently,
  } = useTutorialStore();

  const [arrowPosition, setArrowPosition] = useState<{ top: number; left: number } | null>(null);
  const [arrowRotation, setArrowRotation] = useState<string>("");
  const [textBoxStyle, setTextBoxStyle] = useState<React.CSSProperties>({ // For dynamic text box
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999,
    maxWidth: '20rem', // approx max-w-xs
  });
  const textBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTutorialVisible && tutorialSteps.length > 0) {
      const currentStep = tutorialSteps[currentStepIndex];
      let newArrowPos: { top: number; left: number } | null = null;
      let newRotation = "";

      if (currentStep && currentStep.arrow && currentStep.arrow.direction !== "none") {
        const elementIdToPointTo = currentStep.arrow.targetId || currentStep.highlightedElementId;
        if (elementIdToPointTo) {
          const targetElement = document.getElementById(elementIdToPointTo);
          if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const arrowHeight = 24;
            const arrowWidth = 24;
            const arrowMargin = 10;

            let calcArrowTop = 0;
            let calcArrowLeft = 0;

            switch (currentStep.arrow.direction) {
              case "top":
                calcArrowTop = rect.bottom + arrowMargin;
                calcArrowLeft = rect.left + rect.width / 2 - arrowWidth / 2;
                newRotation = "-rotate-90";
                break;
              case "bottom":
                calcArrowTop = rect.top - arrowHeight - arrowMargin;
                calcArrowLeft = rect.left + rect.width / 2 - arrowWidth / 2;
                newRotation = "rotate-90";
                break;
              case "left":
                calcArrowTop = rect.top + rect.height / 2 - arrowHeight / 2;
                calcArrowLeft = rect.right + arrowMargin;
                newRotation = "rotate-180";
                break;
              case "right":
                calcArrowTop = rect.top + rect.height / 2 - arrowHeight / 2;
                calcArrowLeft = rect.left - arrowWidth - arrowMargin;
                newRotation = "rotate-0";
                break;
            }
            newArrowPos = { top: calcArrowTop, left: calcArrowLeft };
          }
        }
      }
      setArrowPosition(newArrowPos);
      setArrowRotation(newRotation);

      // Text box positioning logic
      if (textBoxRef.current) {
        const tbNode = textBoxRef.current;
        const tbRect = tbNode.getBoundingClientRect();
        const tbWidth = tbRect.width;
        const tbHeight = tbRect.height;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const textBoxArrowOffset = 30; // Space between arrow and text box
        const viewportPadding = 20;    // Minimum space from viewport edges
        const arrowVisualHeight = 24;  // Height of the arrow icon (h-6)

        const styleUpdate: React.CSSProperties = {
          position: 'fixed',
          zIndex: 999,
          maxWidth: '20rem', // Keep max-width for responsiveness
        };

        if (newArrowPos) {
          // Position text box to the left of the arrow, vertically centered with the arrow's center
          let idealLeft = newArrowPos.left - tbWidth - textBoxArrowOffset;
          let idealTop = newArrowPos.top + (arrowVisualHeight / 2) - (tbHeight / 2);

          // Clamp to viewport
          idealTop = Math.max(viewportPadding, idealTop);
          idealTop = Math.min(viewportHeight - tbHeight - viewportPadding, idealTop);

          idealLeft = Math.max(viewportPadding, idealLeft);
          idealLeft = Math.min(viewportWidth - tbWidth - viewportPadding, idealLeft);
          
          styleUpdate.top = `${idealTop}px`;
          styleUpdate.left = `${idealLeft}px`;
        } else {
          // Default: Center the text box if no arrow is present or positioned
          styleUpdate.top = '50%';
          styleUpdate.left = '50%';
          styleUpdate.transform = 'translate(-50%, -50%)';
        }
        setTextBoxStyle(styleUpdate);
      } else {
        // Fallback if ref not ready (initial centered position)
        setTextBoxStyle({
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 999,
          maxWidth: '20rem', 
        });
      }
    } else {
      setArrowPosition(null);
      setArrowRotation("");
      setTextBoxStyle({ display: 'none' }); // Hide if tutorial not visible
    }
  }, [isTutorialVisible, currentStepIndex, tutorialSteps]); // Dependencies

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

  return (
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-[998] cursor-pointer"
        onClick={handleOverlayClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleOverlayClick()}
      >
        {/* Arrow Icon */}
        {arrowPosition && currentStep.arrow && currentStep.arrow.direction !== "none" && (
          <div
            className={`fixed text-black`}
            style={{
              top: `${arrowPosition.top}px`,
              left: `${arrowPosition.left}px`,
              zIndex: 1000, // Higher than text box
              ...currentStep.arrow.customStyles,
            }}
          >
            <PlayIcon
              className={`h-6 w-6 animate-pulse transform ${arrowRotation}`}
              style={{
                filter: 'drop-shadow(0px 0px 0.5px white) drop-shadow(0px 0px 0.5px white) drop-shadow(0px 0px 0.5px white) drop-shadow(0px 0px 0.5px white) drop-shadow(0px 0px 0.5px white) drop-shadow(0px 0px 0.5px white) drop-shadow(0px 0px 0.5px white) drop-shadow(0px 0px 0.5px white) drop-shadow(0px 0px 0.5px white) drop-shadow(0px 0px 0.5px white)'
              }}
            />
          </div>
        )}

        {/* Step Content Box */}
        <div
          ref={textBoxRef}
          style={textBoxStyle}
          className="bg-white p-4 rounded-lg shadow-xl w-[700px] text-center" // p-4, max-w-xs
          onClick={(e) => e.stopPropagation()} // Prevent overlay click
        >
          {currentStep.title && (
            <h3 className="text-lg font-semibold mb-2 text-gray-800"> {/* text-lg, mb-2 */}
              {currentStep.title}
            </h3>
          )}
          <p className="text-sm text-gray-700 mb-3">{currentStep.text}</p> {/* text-sm, mb-3 */}

          <div className="flex items-center justify-center"> {/* Container for Next/Finish */}
            {currentStepIndex < tutorialSteps.length - 1 ? (
              <button
                onClick={(e) => { e.stopPropagation(); nextStep(); }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-3 rounded-md text-sm flex items-center" // py-1.5, px-3, text-sm
              >
                Lanjut{" "}
                <ChevronRightIcon className="h-4 w-4 ml-1" /> {/* h-4, w-4 */}
              </button>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); hideTutorial(); }}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1.5 px-3 rounded-md text-sm" // py-1.5, px-3, text-sm
              >
                Akhiri Tutorial
              </button>
            )}
          </div>

          {/* Skip Buttons Container (now inside) */}
          <div className="flex space-x-2 mt-3 justify-center w-full"> {/* space-x-2, mt-3, justify-center */}
            <button
              onClick={(e) => { e.stopPropagation(); hideTutorial(); }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold p-2 w-full rounded-md text-xs" // py-1, px-2, text-xs
            >
              Skip Tutorial
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); skipPermanently(); }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 w-full rounded-md text-xs" // py-1, px-2, text-xs
            >
              Jangan Tampilkan Lagi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialSession;
