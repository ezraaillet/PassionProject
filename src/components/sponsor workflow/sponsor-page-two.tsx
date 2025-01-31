import { FaInfoCircle } from "react-icons/fa";
import FormInput from "../../common/form-input";
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponsorWorkflowProps {
  backClicked: () => void;
}

export default function SponsorPageTwo({ backClicked }: SponsorWorkflowProps) {
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
            label="Name"
            required={true}
            name="sponsorName"
            value={sponsorWorkflowContext?.formData.sponsorName}
          />

          <FormInput
            label="Phone Number"
            required={true}
            name="sponsorPhone"
            value={sponsorWorkflowContext?.formData.sponsorPhone}
          />

          <FormInput
            label="Motto"
            required={true}
            name="sponsorMotto"
            value={sponsorWorkflowContext?.formData.sponsorMotto}
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
