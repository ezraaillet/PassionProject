import "../../styles/sponsor-page.css";

import { useEffect, useState } from "react";

import ProfilePage from "../profile-page";
import ProgressBar from "../progress-bar";
import SponsorPageFive from "./sponsor-page-five";
import SponsorPageFour from "./sponsor-page-four";
import SponsorPageOne from "./sponsor-page-one";
import SponsorPageThree from "./sponsor-page-three";
import SponsorPageTwo from "./sponsor-page-two";
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponsorWorkflowProps {
  backClicked: () => void; // Type the function prop
}

export default function SponsorWorkflow({ backClicked }: SponsorWorkflowProps) {
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const returnToAccountTypes = () => {
    sponsorWorkflowContext.handleBackClick();
    backClicked();
  };

  return (
    <>
      {sponsorWorkflowContext.workflowStep < 6 && (
        <div className="sponsor-page-container">
          {sponsorWorkflowContext.workflowStep < 6 && (
            <ProgressBar
              currentStep={sponsorWorkflowContext.workflowStep}
              totalSteps={5}
            />
          )}
          {sponsorWorkflowContext.workflowStep === 1 && (
            <SponsorPageOne backClicked={returnToAccountTypes} />
          )}
          {sponsorWorkflowContext.workflowStep === 2 && (
            <SponsorPageTwo
              backClicked={sponsorWorkflowContext.handleBackClick}
            />
          )}
          {sponsorWorkflowContext.workflowStep === 3 && (
            <SponsorPageThree
              backClicked={sponsorWorkflowContext.handleBackClick}
            />
          )}
          {sponsorWorkflowContext.workflowStep === 4 && (
            <SponsorPageFour
              backClicked={sponsorWorkflowContext.handleBackClick}
            />
          )}
          {sponsorWorkflowContext.workflowStep === 5 && (
            <SponsorPageFive
              backClicked={sponsorWorkflowContext.handleBackClick}
            />
          )}
        </div>
      )}
      {sponsorWorkflowContext.workflowStep === 6 && (
        <ProfilePage user={sponsorWorkflowContext?.formData} />
      )}
    </>
  );
}
