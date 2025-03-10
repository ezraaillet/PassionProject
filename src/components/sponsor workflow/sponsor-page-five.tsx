import FormInput from "../../common/form-input";
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponsorWorkflowProps {
  backClicked: () => void;
}

export default function SponsorPageFive({ backClicked }: SponsorWorkflowProps) {
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
            label="Time to complete steps"
            required={false}
            name="sponsorTimeForSteps"
            value={sponsorWorkflowContext?.formData.sponsorTimeForSteps}
          />

          <FormInput
            label="Intensity Level"
            required={false}
            name="sponsorIntensityLevel"
            value={sponsorWorkflowContext?.formData.sponsorIntensityLevel}
          />

          <FormInput
            label="Recovery Time"
            required={true}
            name="sponsorRecoveryTime"
            value={sponsorWorkflowContext?.formData.sponsorRecoveryTime}
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
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
