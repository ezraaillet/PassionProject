import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponserWorkflowProps {
  workflowStep: number;
  setWorkflowStep: React.Dispatch<React.SetStateAction<number>>;
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponsorPageFive({
  workflowStep,
  setWorkflowStep,
  backClicked,
  nextClicked,
}: SponserWorkflowProps) {
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      stepTime: !sponsorWorkflowContext?.formData.sponsorTimeForSteps,
      intensityLevel: !sponsorWorkflowContext?.formData.sponsorIntensityLevel,
    };

    sponsorWorkflowContext?.setFormErrors(errors);

    const isValid = !Object.values(errors).includes(true);

    if (isValid) {
      console.log(
        "Form submitted successfully",
        sponsorWorkflowContext?.formData
      );
      nextClicked();
    } else {
      console.log("Please fill out all fields");
    }
  };

  return (
    <div className="sponsor-container">
      <div className="card">
        <div className="card-header">
          <h2>Become a Sponsor</h2>
        </div>

        <form className="sponsor-form" onSubmit={handleNext}>
          <div className="form-group">
            <label htmlFor="sponsorTimeForSteps">Time to complete steps</label>
            <input
              type="text"
              id="sponsorTimeForSteps"
              placeholder="Time taken to get through steps"
              value={sponsorWorkflowContext?.formData.sponsorTimeForSteps}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={
                sponsorWorkflowContext?.formErrors.stepTime ? "error" : ""
              }
            />
            {sponsorWorkflowContext?.formErrors.stepTime && (
              <span className="error-message">Please enter a time range.</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponsorIntensityLevel">Intensity Level</label>
            <input
              type="text"
              id="sponsorIntensityLevel"
              placeholder="Your intensity level"
              value={sponsorWorkflowContext?.formData.sponsorIntensityLevel}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={
                sponsorWorkflowContext?.formErrors.intensityLevel ? "error" : ""
              }
            />
            {sponsorWorkflowContext?.formErrors.intensityLevel && (
              <span className="error-message">
                Please enter your intensity level.
              </span>
            )}
          </div>

          <div className="button-container">
            <button
              type="button"
              onClick={backClicked}
              className="btn-secondary"
            >
              Back
            </button>
            <button type="submit" className="btn-primary">
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
