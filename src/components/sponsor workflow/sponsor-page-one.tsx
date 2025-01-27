import { FaInfoCircle } from "react-icons/fa";
import { genders } from "../../common/genders";
import { states } from "../../common/states";
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";
import { useState } from "react";

interface SponserWorkflowProps {
  workflowStep: number;
  setWorkflowStep: React.Dispatch<React.SetStateAction<number>>;
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponsorPageOne({
  workflowStep,
  setWorkflowStep,
  backClicked,
  nextClicked,
}: SponserWorkflowProps) {
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      state: !sponsorWorkflowContext?.formData.sponsorState,
      zipcode: !sponsorWorkflowContext?.formData.sponsorZipcode,
      gender: !sponsorWorkflowContext?.formData.sponsorGender,
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

        <form className="sponsor-form">
          <div className="form-group">
            <label htmlFor="sponsorState">State</label>
            <select
              id="sponsorState"
              value={sponsorWorkflowContext?.formData.sponsorState}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={sponsorWorkflowContext?.formErrors.state ? 'error' : ''}
            >
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            {sponsorWorkflowContext?.formErrors.state && (
              <span className="error-message">Please select your state.</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponsorZipcode">Zipcode</label>
            <input
              type="number"
              min={"00000"}
              max="99999"
              id="sponsorZipcode"
              placeholder="Enter your zipcode"
              value={sponsorWorkflowContext?.formData.sponsorZipcode}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={sponsorWorkflowContext?.formErrors.zipcode ? 'error' : ''}
            />
            {sponsorWorkflowContext?.formErrors.zipcode && (
              <span className="error-message">Please enter your zipcode.</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponsorGender" className="gender-label">
              Gender
              <div className="tooltip-container">
                <FaInfoCircle className="info-icon" />
                <span className="tooltip-text">
                  In 12-step programs, a general rule is that men should not sponsor women, 
                  and women should not sponsor men. This guideline exists because romantic 
                  relationships can distract from the primary purpose of recovery and 
                  potentially compromise progress.
                </span>
              </div>
            </label>
            <select
              id="sponsorGender"
              value={sponsorWorkflowContext?.formData.sponsorGender}
              onChange={sponsorWorkflowContext?.handleInputChange}
              className={sponsorWorkflowContext?.formErrors.gender ? 'error' : ''}
            >
              {genders.map((gender) => (
                <option key={gender.value} value={gender.value}>
                  {gender.label}
                </option>
              ))}
            </select>
            {sponsorWorkflowContext?.formErrors.gender && (
              <span className="error-message">Please select your gender.</span>
            )}
          </div>

          <div className="button-container">
            <button type="button" onClick={backClicked} className="btn-secondary">
              Back
            </button>
            <button type="button" onClick={handleNext} className="btn-primary">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}