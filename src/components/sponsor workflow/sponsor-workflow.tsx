import SponsorPageFive from "./sponsor-page-five";
import SponsorPageFour from "./sponsor-page-four";
import SponsorPageOne from "./sponsor-page-one";
import SponsorPageThree from "./sponsor-page-three";
import SponsorPageTwo from "./sponsor-page-two";
import UserSearch from "../user-search";
import UserService from "../../services/user-service";
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";
import { useEffect, useState } from "react";

interface SponserWorkflowProps {
  backClicked: () => void; // Type the function prop
}

export default function SponsorWorkflow({ backClicked }: SponserWorkflowProps) {
  //! Make a state here to pass into the workflow props rendered below
  //* This state will be used to pass in step number for the progress tracker
  //* rendering it once instead of multiple renders in each workflow step component
  const [workflowStep, setWorkflowStep] = useState(1);

//!  UseEffect for testing
  useEffect(() => {
    console.log("Workflow step: ", workflowStep);
  }, [workflowStep]);

  const [step, setStep] = useState(1);
  const { createUser } = UserService();
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const handleBackClick = () => {
    if (step === 1) {
      backClicked();
    } else {
      setStep(step - 1);
      //! update state of workflow when back is pressed
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
      {step === 1 && (
        <SponsorPageOne
        //!pass in the step number state here
          workflowStep={workflowStep}
          setWorkflowStep={setWorkflowStep}
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
      {/* {step === 6 && <UserSearch />} */}
    </>
  );
}
