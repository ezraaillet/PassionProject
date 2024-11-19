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

export default function SponseePageOne({
  backClicked,
  nextClicked,
}: SponseeWorkflowProps) {
  const sponseeWorkflowContext = useSponseeWorkflowContext();

  const handleNext = (e: React.FormEvent) => {
    debugger;
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
    <div className="sponsee-container">
      <Row className="mt-4">
        <Col>
          <Card className="info-card">
            <Card.Body>
              <Card.Title>
                Become a sponsee<span className="step">1/2</span>
              </Card.Title>

              <Form>
                <Form.Group
                  controlId="sponseeState"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">State</Form.Label>
                  <Form.Control
                    as="select"
                    value={sponseeWorkflowContext?.formData.sponseeState}
                    onChange={sponseeWorkflowContext?.handleInputChange}
                    isInvalid={sponseeWorkflowContext?.formErrors.state}
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
                  controlId="sponseeZipcode"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">Zipcode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your zipcode"
                    value={sponseeWorkflowContext?.formData.sponseeZipcode}
                    onChange={sponseeWorkflowContext?.handleInputChange}
                    isInvalid={sponseeWorkflowContext?.formErrors.zipcode}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your zipcode.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="sponseeGender"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">
                    Gender
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-gender">
                          General rule in 12 step programs is that a male may
                          not sponsee a female and vice versa, reason being that
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
                    value={sponseeWorkflowContext?.formData.sponseeGender}
                    onChange={sponseeWorkflowContext?.handleInputChange}
                    isInvalid={sponseeWorkflowContext?.formErrors.gender}
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
