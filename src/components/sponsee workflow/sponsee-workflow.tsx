import "../../styles/sponsor-page.css";

import ProgressBar from "../progress-bar";
import SponseePageOne from "./sponsee-page-one";
import SponseePageTwo from "./sponsee-page-two";
import UserSearch from "../user-search";
import { useSponseeWorkflowContext } from "../../common/sponsee-workflow-context";
import { useState } from "react";

interface SponseeWorkflowProps {
  backClicked: () => void; //
}

export default function SponseeWorkflow({ backClicked }: SponseeWorkflowProps) {
  const [step, setStep] = useState(1);
  const [loggedInUser, setLoggedInUser] = useState<{
    userType: number;
    sponseeState: string;
  } | null>(null);
  const sponseeWorkflowContext = useSponseeWorkflowContext();

  const returnToAccountTypes = () => {
    sponseeWorkflowContext.handleBackClick();
    backClicked();
  };

  debugger;
  return (
    <>
      {sponseeWorkflowContext.workflowStep < 3 && (
        <div className="sponsor-page-container">
          {sponseeWorkflowContext.workflowStep < 3 && (
            <ProgressBar
              currentStep={sponseeWorkflowContext.workflowStep}
              totalSteps={2}
            />
          )}

          {sponseeWorkflowContext.workflowStep === 1 && (
            <SponseePageOne backClicked={returnToAccountTypes} />
          )}
          {sponseeWorkflowContext.workflowStep === 2 && (
            <SponseePageTwo
              backClicked={sponseeWorkflowContext.handleBackClick}
            />
          )}
        </div>
      )}
      {sponseeWorkflowContext.workflowStep === 3 && (
        <UserSearch
          user={{
            userType: 2,
            sponseeState: sponseeWorkflowContext.formData.sponseeState,
          }}
        />
      )}
    </>
  );
}
