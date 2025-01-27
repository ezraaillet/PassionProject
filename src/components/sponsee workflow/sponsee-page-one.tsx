import { FaInfoCircle } from "react-icons/fa";
import { genders } from "../../common/genders";
import { states } from "../../common/states";
import { useSponseeWorkflowContext } from "../../common/sponsee-workflow-context";

interface SponseeWorkflowProps {
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponseePageOne({
  backClicked,
  nextClicked,
}: SponseeWorkflowProps) {
  const sponseeWorkflowContext = useSponseeWorkflowContext();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      state: !sponseeWorkflowContext?.formData.sponseeState,
      zipcode: !sponseeWorkflowContext?.formData.sponseeZipcode,
      gender: !sponseeWorkflowContext?.formData.sponseeGender,
    };

    sponseeWorkflowContext?.setFormErrors(errors);

    const isValid = !Object.values(errors).includes(true);

    if (isValid) {
      console.log(
        "Form submitted successfully",
        sponseeWorkflowContext?.formData
      );
      nextClicked();
    } else {
      console.log("Please fill out all fields");
    }
  };

  return (
    <div className="sponsor-container">
      <div className="card">
        <div className="card-header">
          <h2>Become a Sponsee</h2>
        </div>

        <form className="sponsor-form" onSubmit={handleNext}>
          <div className="form-group">
            <label htmlFor="sponseeState">State</label>
            <select
              id="sponseeState"
              value={sponseeWorkflowContext?.formData.sponseeState}
              onChange={sponseeWorkflowContext?.handleInputChange}
              className={
                sponseeWorkflowContext?.formErrors.state ? "error" : ""
              }
            >
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            {sponseeWorkflowContext?.formErrors.state && (
              <span className="error-message">Please select your state.</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponseeZipcode">Zipcode</label>
            <input
              type="text"
              id="sponseeZipcode"
              placeholder="Enter your zipcode"
              value={sponseeWorkflowContext?.formData.sponseeZipcode}
              onChange={sponseeWorkflowContext?.handleInputChange}
              className={
                sponseeWorkflowContext?.formErrors.zipcode ? "error" : ""
              }
            />
            {sponseeWorkflowContext?.formErrors.zipcode && (
              <span className="error-message">Please enter your zipcode.</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponseeGender" className="gender-label">
              Gender
              <div className="tooltip-container">
                <FaInfoCircle className="info-icon" />
                <span className="tooltip-text">
                  General rule in 12-step programs: males may not sponsor
                  females and vice versa to avoid distractions and maintain
                  focus on recovery.
                </span>
              </div>
            </label>
            <select
              id="sponseeGender"
              value={sponseeWorkflowContext?.formData.sponseeGender}
              onChange={sponseeWorkflowContext?.handleInputChange}
              className={
                sponseeWorkflowContext?.formErrors.gender ? "error" : ""
              }
            >
              {genders.map((gender) => (
                <option key={gender.value} value={gender.value}>
                  {gender.label}
                </option>
              ))}
            </select>
            {sponseeWorkflowContext?.formErrors.gender && (
              <span className="error-message">Please select your gender.</span>
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
