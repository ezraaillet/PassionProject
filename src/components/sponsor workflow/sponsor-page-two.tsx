import { FaInfoCircle } from "react-icons/fa";
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponserWorkflowProps {
  workflowStep: number;
  setWorkflowStep: React.Dispatch<React.SetStateAction<number>>;
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponsorPageTwo({
  workflowStep,
  setWorkflowStep,
  backClicked,
  nextClicked,
}: SponserWorkflowProps) {
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      name: !sponsorWorkflowContext?.formData.sponsorName,
      phone: !sponsorWorkflowContext?.formData.sponsorPhone,
      motto: !sponsorWorkflowContext?.formData.sponsorMotto,
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
            <label htmlFor="sponsorName">Name</label>
            <input
              type="text"
              id="sponsorName"
              placeholder="Name, Alias, or Initials"
              value={sponsorWorkflowContext?.formData.sponsorName}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={sponsorWorkflowContext?.formErrors.name ? "error" : ""}
            />
            {sponsorWorkflowContext?.formErrors.name && (
              <span className="error-message">Please enter your name.</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponsorPhone">Phone Number</label>
            <input
              type="text"
              id="sponsorPhone"
              placeholder="Enter your phone number"
              value={sponsorWorkflowContext?.formData.sponsorPhone}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={
                sponsorWorkflowContext?.formErrors.phone ? "error" : ""
              }
            />
            {sponsorWorkflowContext?.formErrors.phone && (
              <span className="error-message">
                Please enter your phone number.
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponsorMotto">Motto</label>
            <input
              type="text"
              id="sponsorMotto"
              placeholder="Enter your motto"
              value={sponsorWorkflowContext?.formData.sponsorMotto}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={
                sponsorWorkflowContext?.formErrors.motto ? "error" : ""
              }
            />
            {sponsorWorkflowContext?.formErrors.motto && (
              <span className="error-message">Please enter your motto.</span>
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
