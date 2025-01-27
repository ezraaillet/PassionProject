import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponserWorkflowProps {
  workflowStep: number;
  setWorkflowStep: React.Dispatch<React.SetStateAction<number>>;
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponsorPageThree({
  workflowStep,
  setWorkflowStep,
  backClicked,
  nextClicked,
}: SponserWorkflowProps) {
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      age: !sponsorWorkflowContext?.formData.sponsorAge,
      job: !sponsorWorkflowContext?.formData.sponsorJob,
      numberOfSponsees:
        !sponsorWorkflowContext?.formData.sponsorNumberOfSponsees,
    };

    sponsorWorkflowContext?.setFormErrors(errors);

    const isValid = !Object.values(errors).includes(true);

    if (isValid) {
      console.log(
        "Form submitted successfully",
        sponsorWorkflowContext?.formData
      );
      setWorkflowStep(workflowStep + 1);
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
            <label htmlFor="sponsorAge">Age</label>
            <input
              type="text"
              id="sponsorAge"
              placeholder="Your Age"
              value={sponsorWorkflowContext?.formData.sponsorAge}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={sponsorWorkflowContext?.formErrors.age ? "error" : ""}
            />
            {sponsorWorkflowContext?.formErrors.age && (
              <span className="error-message">Please enter a valid age.</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponsorJob">Job</label>
            <input
              type="text"
              id="sponsorJob"
              placeholder="Enter your job"
              value={sponsorWorkflowContext?.formData.sponsorJob}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={sponsorWorkflowContext?.formErrors.job ? "error" : ""}
            />
            {sponsorWorkflowContext?.formErrors.job && (
              <span className="error-message">Please enter your job.</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponsorNumberOfSponsees">
              Max number of sponsees
            </label>
            <input
              type="text"
              id="sponsorNumberOfSponsees"
              placeholder="Max number of sponsees"
              value={sponsorWorkflowContext?.formData.sponsorNumberOfSponsees}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={
                sponsorWorkflowContext?.formErrors.numberOfSponsees
                  ? "error"
                  : ""
              }
            />
            {sponsorWorkflowContext?.formErrors.numberOfSponsees && (
              <span className="error-message">
                Please enter the number of sponsees.
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
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
