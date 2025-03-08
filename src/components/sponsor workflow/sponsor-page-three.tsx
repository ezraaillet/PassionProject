import FormInput from "../../common/form-input";
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponsorWorkflowProps {
  backClicked: () => void;
}

export default function SponsorPageThree({
  backClicked,
}: SponsorWorkflowProps) {
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  return (
    <div className="sponsor-container">
      <div className="card">
        <div className="card-header">
          <h2>Become a Sponsor</h2>
        </div>

        <form
          className="sponsor-form"
          onSubmit={sponsorWorkflowContext?.handleSubmit}
          noValidate
        >
          <FormInput
            label="Age"
            required={false}
            name="sponsorAge"
            value={sponsorWorkflowContext?.formData.sponsorAge}
          />

          <FormInput
            label="Job"
            required={false}
            name="sponsorJob"
            value={sponsorWorkflowContext?.formData.sponsorJob}
          />

          <FormInput
            label="Number of Sponsees"
            required={false}
            name="sponsorNumberOfSponsees"
            value={sponsorWorkflowContext?.formData.sponsorNumberOfSponsees}
          />

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
