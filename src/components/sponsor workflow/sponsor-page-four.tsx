import FormInput from "../../common/form-input";
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponserWorkflowProps {
  backClicked: () => void;
}

export default function SponsorPageFour({ backClicked }: SponserWorkflowProps) {
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
            label="Bio"
            required={true}
            name="sponsorBio"
            value={sponsorWorkflowContext?.formData.sponsorBio}
          />

          <FormInput
            label="Availability"
            required={false}
            name="sponsorAvailability"
            value={sponsorWorkflowContext?.formData.sponsorAvailability}
          />

          <FormInput
            label="Faith"
            required={false}
            name="sponsorFaith"
            value={sponsorWorkflowContext?.formData.sponsorFaith}
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
