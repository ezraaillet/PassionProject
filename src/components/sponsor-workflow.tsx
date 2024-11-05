import SponsorPageFour from "./sponsor-page-four";
import SponsorPageOne from "./sponsor-page-one";
import SponsorPageThree from "./sponsor-page-three";
import SponsorPageTwo from "./sponsor-page-two";
import { useSponsorWorkflowContext } from "../common/sponsor-workflow-context";
import { useState } from "react";
import SponsorPageFive from "./sponsor-page-five";
import UserService from "../services/user-service";

interface SponserWorkflowProps {
  backClicked: () => void; // Type the function prop
}

export default function SponsorWorkflow({ backClicked }: SponserWorkflowProps) {
  const [step, setStep] = useState(1);
  const { createUser } = UserService();
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const handleBackClick = () => {
    if (step === 1) {
      backClicked();
    } else {
      setStep(step - 1);
    }
  };

  const handleNextClick = () => {
    setStep(step + 1);

    if (step === 5) {
      createUser(sponsorWorkflowContext?.formData);
    }
  };

  return (
    <>
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
      {step === 5 && (
        <SponsorPageFive
          backClicked={handleBackClick}
          nextClicked={handleNextClick}
        />
      )}
    </>
  );
}
