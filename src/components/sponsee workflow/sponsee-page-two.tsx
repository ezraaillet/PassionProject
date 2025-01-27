import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";

import { FaInfoCircle } from "react-icons/fa";
import { genders } from "../../common/genders";
import { states } from "../../common/states";
import { useSponseeWorkflowContext } from "../../common/sponsee-workflow-context";
import { useState } from "react";

interface SponseeWorkflowProps {

  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponseePageTwo({
  backClicked,
  nextClicked,
}: SponseeWorkflowProps) {
  const sponseeWorkflowContext = useSponseeWorkflowContext();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      name: !sponseeWorkflowContext?.formData.sponseeName,
      phone: !sponseeWorkflowContext?.formData.sponseePhone
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
            <label htmlFor="sponseeState">Name</label>
            <input
              type="text"
              id="sponseeName"
              placeholder="Enter your name"
              value={sponseeWorkflowContext?.formData.sponseeName}
              onChange={sponseeWorkflowContext?.handleInputChange}
              className={sponseeWorkflowContext?.formErrors.name ? 'error' : ''}
            />
            {sponseeWorkflowContext?.formErrors.name && (
              <span className="error-message">Please Enter your name.</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sponseePhone">Phone</label>
            <input
              type="number"
              id="sponseePhone"
              placeholder="Enter your phone number"
              value={sponseeWorkflowContext?.formData.sponseePhone}
              onChange={sponseeWorkflowContext?.handleInputChange}
              className={
                sponseeWorkflowContext?.formErrors.phone ? "error" : ""
              }
            />
            {sponseeWorkflowContext?.formErrors.phone && (
              <span className="error-message">Please enter your phone number.</span>
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
