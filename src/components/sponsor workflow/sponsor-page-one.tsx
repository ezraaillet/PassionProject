import { FaInfoCircle } from "react-icons/fa";
import FormInput from "../../common/form-input";
import { genders } from "../../common/genders";
import { homegroups } from "../../common/homegroups";
import { states } from "../../common/states";
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponserWorkflowProps {
  backClicked: () => void;
}

export default function SponsorPageOne({ backClicked }: SponserWorkflowProps) {
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
            label="Home Group"
            required={true}
            name="sponsorHomeGroup"
            value={sponsorWorkflowContext?.formData.sponsorHomeGroup}
            options={homegroups}
          />

          <FormInput
            label="State"
            required={true}
            name="sponsorState"
            value={sponsorWorkflowContext?.formData.sponsorState}
            options={states}
          />

          <FormInput
            type="text"
            pattern="^\d{5}(?:-\d{4})?$"
            label="Zipcode"
            required={true}
            name="sponsorZipcode"
            value={sponsorWorkflowContext?.formData.sponsorZipcode}
            validationMessage="Please enter a valid zipcode."
          />

          <FormInput
            label="Gender"
            required={true}
            name="sponsorGender"
            value={sponsorWorkflowContext?.formData.sponsorGender}
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
