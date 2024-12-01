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
                Become a sponsee<span className="step">2/2</span>
              </Card.Title>

              <Form>
                <Form.Group controlId="sponseeName" className="card-form-group">
                  <Form.Label className="card-label">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name, Alias, or Initials"
                    value={sponseeWorkflowContext?.formData.sponseeName}
                    onChange={sponseeWorkflowContext?.handleInputChange}
                    isInvalid={sponseeWorkflowContext?.formErrors.name}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="sponseePhone"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your phone number"
                    value={sponseeWorkflowContext?.formData.sponseePhone}
                    onChange={sponseeWorkflowContext?.handleInputChange}
                    isInvalid={sponseeWorkflowContext?.formErrors.phone}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter your phone number.
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
