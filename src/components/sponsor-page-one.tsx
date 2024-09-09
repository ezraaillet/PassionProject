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
import { genders } from "../common/genders";
import { states } from "../common/states";
import { useSponsorWorkflowContext } from "../common/sponsor-workflow-context";
import { useState } from "react";

interface SponserWorkflowProps {
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponsorPageOne({
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
      nextClicked();
    } else {
      console.log("Please fill out all fields");
    }
  };

  return (
    <div className="sponsee-container">
      <Row className="mt-4">
        <Col>
          <Card className="info-card">
            <Card.Body>
              <Card.Title>Become a Sponsor</Card.Title>
              <Form>
                <Form.Group
                  controlId="sponsorState"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">State</Form.Label>
                  <Form.Control
                    as="select"
                    value={sponsorWorkflowContext?.formData.sponsorState}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.state}
                  >
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select your state.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="sponsorZipcode"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">Zipcode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your zipcode"
                    value={sponsorWorkflowContext?.formData.sponsorZipcode}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.zipcode}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your zipcode.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="sponsorGender"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">
                    Gender
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-gender">
                          General rule in 12 step programs is that a male may
                          not sponsor a female and vice versa, reason being that
                          romantic relationships can distract one from their
                          primary purpose and compromise ones recovery.
                        </Tooltip>
                      }
                    >
                      <span className="ml-2">
                        <FaInfoCircle className="info-icon" />
                      </span>
                    </OverlayTrigger>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={sponsorWorkflowContext?.formData.sponsorGender}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.gender}
                  >
                    {genders.map((gender) => (
                      <option key={gender.value} value={gender.value}>
                        {gender.label}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select your gender.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="card-buttons-container">
                  <Col className="card-buttons">
                    <button onClick={backClicked} className="small-button">
                      Back
                    </button>
                  </Col>
                  <Col className="card-buttons">
                    <button onClick={handleNext} className="small-button">
                      Next
                    </button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
