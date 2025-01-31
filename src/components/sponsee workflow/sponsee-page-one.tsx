import FormInput from "../../common/form-input";
import { genders } from "../../common/genders";
import { states } from "../../common/states";
import { useSponseeWorkflowContext } from "../../common/sponsee-workflow-context";

interface SponseeWorkflowProps {
  backClicked: () => void;
}

export default function SponseePageOne({ backClicked }: SponseeWorkflowProps) {
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
            label="State"
            required={true}
            name="sponseeState"
            value={sponseeWorkflowContext?.formData.sponseeState}
            options={states}
          />

          <FormInput
            label="Zipcode"
            required={true}
            name="sponseeZipcode"
            value={sponseeWorkflowContext?.formData.sponseeZipcode}
            pattern="^\d{5}(?:-\d{4})?$"
            validationMessage="Please enter a valid zipcode."
          />

          <FormInput
            label="Gender"
            required={true}
            name="sponseeGender"
            value={sponseeWorkflowContext?.formData.sponseeGender}
            options={genders}
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
