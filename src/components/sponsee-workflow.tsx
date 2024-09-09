import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import React, { ChangeEvent, useState } from "react";

import { FaInfoCircle } from "react-icons/fa";
import { genders } from "../common/genders";
import { states } from "../common/states";

interface SponseeWorkflowProps {
  backClicked: () => void;
}

export default function SponseeWorkflow({ backClicked }: SponseeWorkflowProps) {
  const [formData, setFormData] = useState({
    sponseeState: "",
    sponseeZipcode: "",
    sponseeGender: "",
  });

  const [formErrors, setFormErrors] = useState({
    state: false,
    zipcode: false,
    gender: false,
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
    setFormErrors((prevState) => ({ ...prevState, [id]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      state: !formData.sponseeState,
      zipcode: !formData.sponseeZipcode,
      gender: !formData.sponseeGender,
    };

    setFormErrors(errors);

    const isValid = !Object.values(errors).includes(true);

    if (isValid) {
      console.log("Form submitted successfully", formData);
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
              <Card.Title>Find a Sponsor</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  controlId="sponseeState"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">State</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.sponseeState}
                    onChange={handleInputChange}
                    isInvalid={formErrors.state}
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
                    value={formData.sponseeZipcode}
                    onChange={handleInputChange}
                    isInvalid={formErrors.zipcode}
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
                    value={formData.sponseeGender}
                    onChange={handleInputChange}
                    isInvalid={formErrors.gender}
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
                  <Col onClick={backClicked} className="card-buttons">
                    <button className="small-button" type="button">
                      Back
                    </button>
                  </Col>
                  <Col className="card-buttons">
                    <button className="small-button" type="submit">
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
