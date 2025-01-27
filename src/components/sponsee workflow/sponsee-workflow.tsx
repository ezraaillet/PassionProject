import "../../styles/sponsor-page.css";

import ProgressBar from "../progress-bar";
import SponseePageOne from "./sponsee-page-one";
import SponseePageTwo from "./sponsee-page-two";
import UserSearch from "../user-search";
import UserService from "../../services/user-service";
import { useSponseeWorkflowContext } from "../../common/sponsee-workflow-context";
import { useState } from "react";

interface SponseeWorkflowProps {
  backClicked: () => void; // Type the function prop
}

export default function SponseeWorkflow({ backClicked }: SponseeWorkflowProps) {
  const [workflowStep, setWorkflowStep] = useState(1);
  const [step, setStep] = useState(1);
  const [loggedInUser, setLoggedInUser] = useState<{
    userType: number;
    sponseeState: string;
  } | null>(null);

  const { createUser } = UserService();
  const sponseeWorkflowContext = useSponseeWorkflowContext();

  const handleBackClick = () => {
    if (step === 1) {
      // clear forms and errors
      sponseeWorkflowContext?.setFormData({
        sponseeState: "",
        sponseeZipcode: "",
        sponseeGender: "",
        sponseeName: "",
        sponseePhone: "",
      });
      sponseeWorkflowContext?.setFormErrors({
        state: false,
        zipcode: false,
        gender: false,
        name: false,
        phone: false,
      });
      backClicked();
    } else {
      setStep(step - 1);
    }
  };

  const handleNextClick = () => {
    setStep(step + 1);

    if (step === 2) {
      createUser(sponseeWorkflowContext?.formData, 1);

      // Ensure the `state` is a valid string, or provide a fallback if it's undefined
      const userState = sponseeWorkflowContext?.formData.sponseeState || ""; // Empty string as fallback

      const user = {
        userType: 2,
        sponseeState: userState, // Ensure `state` is always a string
      };

      if (userState) {
        setLoggedInUser(user); // Will only set if `userState` is not empty
      } else {
        console.error("Error: user state is undefined or empty");
      }
    }
  };

  return (
    <>
      {step < 3 && (
        <div className="sponsor-page-container">
          {step < 3 && <ProgressBar currentStep={step} totalSteps={2} />}

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
        </div>
      )}
      {step === 3 && loggedInUser && <UserSearch user={loggedInUser} />}
    </>
  );
}
