import FormInput from "../../common/form-input";
import { useSponseeWorkflowContext } from "../../common/sponsee-workflow-context";

interface SponseeWorkflowProps {
  backClicked: () => void;
}

export default function SponseePageTwo({ backClicked }: SponseeWorkflowProps) {
  const sponseeWorkflowContext = useSponseeWorkflowContext();

  return (
    <div className="sponsor-container">
      <div className="card">
        <div className="card-header">
          <h2>Become a Sponsee</h2>
        </div>

        <form
          className="sponsor-form"
          onSubmit={sponseeWorkflowContext?.handleSubmit}
          noValidate
        >
          <FormInput
            label="Name"
            required={true}
            name="sponseeName"
            value={sponseeWorkflowContext?.formData.sponseeName}
          />

          <FormInput
            label="Phone Number"
            required={true}
            name="sponseePhone"
            value={sponseeWorkflowContext?.formData.sponseePhone}
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
