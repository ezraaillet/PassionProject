import { useSponseeWorkflowContext } from "../../common/sponsee-workflow-context";
import { useState } from "react";
import UserService from "../../services/user-service";
import SponseePageOne from "./sponsee-page-one";
import SponseePageTwo from "./sponsee-page-two";

interface SponseeWorkflowProps {
  backClicked: () => void; // Type the function prop
}

export default function SponseeWorkflow({ backClicked }: SponseeWorkflowProps) {
  const [step, setStep] = useState(1);
  const { createUser } = UserService();
  const sponseeWorkflowContext = useSponseeWorkflowContext();

  const handleBackClick = () => {
    if (step === 1) {
      backClicked();
    } else {
      setStep(step - 1);
    }
  };

  const handleNextClick = () => {
    setStep(step + 1);

    if (step === 2) {
      createUser(sponseeWorkflowContext?.formData);
    }
  };

  return (
    <>
      {step === 1 && (
        <SponseePageOne
          backClicked={handleBackClick}
          nextClicked={handleNextClick}
        />
      )}
      {step === 2 && (
        <SponseePageTwo
          backClicked={handleBackClick}
          nextClicked={handleNextClick}
        />
      )}
    </>
  );
}
