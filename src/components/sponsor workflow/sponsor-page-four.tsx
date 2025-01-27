import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponserWorkflowProps {
  workflowStep: number;
  setWorkflowStep: React.Dispatch<React.SetStateAction<number>>;
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponsorPageFour({
  workflowStep,
  setWorkflowStep,
  backClicked,
  nextClicked,
}: SponserWorkflowProps) {
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      bio: !sponsorWorkflowContext?.formData.sponsorBio,
      availability: !sponsorWorkflowContext?.formData.sponsorAvailability,
      faith: !sponsorWorkflowContext?.formData.sponsorFaith,
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
            <label htmlFor="sponsorBio">Bio</label>
            <input
              type="text"
              id="sponsorBio"
              placeholder="A little about yourself"
              value={sponsorWorkflowContext?.formData.sponsorBio}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={
                sponsorWorkflowContext?.formErrors.bio ? "error" : ""
              }
            />
            {sponsorWorkflowContext?.formErrors.bio && (
              <span className="error-message">Please enter a valid bio.</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponsorAvailability">Availability</label>
            <input
              type="text"
              id="sponsorAvailability"
              placeholder="Availability"
              value={sponsorWorkflowContext?.formData.sponsorAvailability}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={
                sponsorWorkflowContext?.formErrors.availability ? "error" : ""
              }
            />
            {sponsorWorkflowContext?.formErrors.availability && (
              <span className="error-message">
                Please enter your availability.
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponsorFaith">Faith</label>
            <input
              type="text"
              id="sponsorFaith"
              placeholder="Your Faith or Religion"
              value={sponsorWorkflowContext?.formData.sponsorFaith}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={
                sponsorWorkflowContext?.formErrors.faith ? "error" : ""
              }
            />
            {sponsorWorkflowContext?.formErrors.faith && (
              <span className="error-message">Please enter your faith.</span>
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
