import SponsorPageFour from "./sponsor-page-four";
import SponsorPageOne from "./sponsor-page-one";
import SponsorPageThree from "./sponsor-page-three";
import SponsorPageTwo from "./sponsor-page-two";
import { SponsorWorkflowProvider } from "../common/sponsor-workflow-context";
import { useState } from "react";

interface SponserWorkflowProps {
  backClicked: () => void; // Type the function prop
}

export default function SponsorWorkflow({ backClicked }: SponserWorkflowProps) {
  const [step, setStep] = useState(1);

  const handleBackClick = () => {
    if (step === 1) {
      backClicked();
    } else {
      setStep(step - 1);
    }
  };

  const handleNextClick = () => {
    setStep(step + 1);
  };

  return (
    <>
      <SponsorWorkflowProvider>
        {step === 1 && (
          <SponsorPageOne
            backClicked={handleBackClick}
            nextClicked={handleNextClick}
          />
        )}
        {step === 2 && (
          <SponsorPageTwo
            backClicked={handleBackClick}
            nextClicked={handleNextClick}
          />
        )}
        {step === 3 && (
          <SponsorPageThree
            backClicked={handleBackClick}
            nextClicked={handleNextClick}
          />
        )}
        {step === 4 && (
          <SponsorPageFour
            backClicked={handleBackClick}
            nextClicked={handleNextClick}
          />
        )}
      </SponsorWorkflowProvider>
    </>
  );
}
