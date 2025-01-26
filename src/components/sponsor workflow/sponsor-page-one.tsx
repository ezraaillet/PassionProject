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
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";
import { useState } from "react";

interface SponserWorkflowProps {
  //! pass in the step # state here
  workflowStep: number;
  setWorkflowStep: React.Dispatch<React.SetStateAction<number>>;
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponsorPageOne({
  //! pass in the step number state here
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


    //!after errors checked, if valid then update the state of the workflow number passed in



    if (isValid) {
      console.log(
        "Form submitted successfully",
        sponsorWorkflowContext?.formData
      );
      //! Update the state of the workflow number passed in
      setWorkflowStep(workflowStep + 1);
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
              <Card.Title>
                Become a Sponsor<span className="step">1/5</span>
              </Card.Title>

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
                          In 12-step programs, a general rule is that men should
                          not sponsor women, and women should not sponsor men.
                          This guideline exists because romantic relationships
                          can distract from the primary purpose of recovery and
                          potentially compromise progress.
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
