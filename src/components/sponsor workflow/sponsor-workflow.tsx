import "../../styles/sponsor-page.css";

import { useEffect, useState } from "react";

import ProfilePage from "../profile-page";
import ProgressBar from "../progress-bar";
import SponsorPageFive from "./sponsor-page-five";
import SponsorPageFour from "./sponsor-page-four";
import SponsorPageOne from "./sponsor-page-one";
import SponsorPageThree from "./sponsor-page-three";
import SponsorPageTwo from "./sponsor-page-two";
import UserSearch from "../user-search";
import UserService from "../../services/user-service";
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponsorWorkflowProps {
  backClicked: () => void; // Type the function prop
}

export default function SponsorWorkflow({ backClicked }: SponsorWorkflowProps) {
  const [workflowStep, setWorkflowStep] = useState(1);
  const [step, setStep] = useState(1);
  const { createUser } = UserService();
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const handleBackClick = () => {
    if (step === 1) {
      // clear forms and errors
      sponsorWorkflowContext?.setFormData({
        sponsorState: "",
        sponsorZipcode: "",
        sponsorGender: "",
        sponsorName: "",
        sponsorPhone: "",
        sponsorMotto: "",
        sponsorAge: "",
        sponsorJob: "",
        sponsorNumberOfSponsees: "",
        sponsorBio: "",
        sponsorAvailability: "",
        sponsorFaith: "",
        sponsorTimeForSteps: "",
        sponsorIntensityLevel: "",
      });
      sponsorWorkflowContext?.setFormErrors({
        state: false,
        zipcode: false,
        gender: false,
        name: false,
        phone: false,
        motto: false,
        age: false,
        job: false,
        numberOfSponsees: false,
        bio: false,
        availability: false,
        faith: false,
        stepTime: false,
        intensityLevel: false,
      });
      backClicked();
    } else {
      setStep(step - 1);
      setWorkflowStep(workflowStep - 1);
    }
  };

  const handleNextClick = () => {
    setStep(step + 1);

    if (step === 5) {
      createUser(sponsorWorkflowContext?.formData, 2);
    }
  };

  return (
    <>
      {step < 6 && (
        <div className="sponsor-page-container">
          {step < 6 && <ProgressBar currentStep={step} totalSteps={5} />}
          {step === 1 && (
            <SponsorPageOne
              workflowStep={workflowStep}
              setWorkflowStep={setWorkflowStep}
              backClicked={handleBackClick}
              nextClicked={handleNextClick}
            />
          )}
          {step === 2 && (
            <SponsorPageTwo
              workflowStep={workflowStep}
              setWorkflowStep={setWorkflowStep}
              backClicked={handleBackClick}
              nextClicked={handleNextClick}
            />
          )}
          {step === 3 && (
            <SponsorPageThree
              workflowStep={workflowStep}
              setWorkflowStep={setWorkflowStep}
              backClicked={handleBackClick}
              nextClicked={handleNextClick}
            />
          )}
          {step === 4 && (
            <SponsorPageFour
              workflowStep={workflowStep}
              setWorkflowStep={setWorkflowStep}
              backClicked={handleBackClick}
              nextClicked={handleNextClick}
            />
          )}
          {step === 5 && (
            <SponsorPageFive
              workflowStep={workflowStep}
              setWorkflowStep={setWorkflowStep}
              backClicked={handleBackClick}
              nextClicked={handleNextClick}
            />
          )}
        </div>
      )}
      {step === 6 && <ProfilePage user={sponsorWorkflowContext?.formData} />}
    </>
  );
}
