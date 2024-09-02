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
import { useState } from "react";

interface SponserWorkflowProps {
  backClicked: () => void; // Type the function prop
}

export default function SponsorPageOne({ backClicked }: SponserWorkflowProps) {
  const [formData, setFormData] = useState({
    sponsorState: "",
    sponsorZipcode: "",
    sponsorGender: "",
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
      state: !formData.sponsorState,
      zipcode: !formData.sponsorZipcode,
      gender: !formData.sponsorGender,
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
          <Card className="sponsee-info-card">
            <Card.Body>
              <Card.Title>Become a Sponsor</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  controlId="sponsorState"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">State</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.sponsorState}
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
                  controlId="sponsorZipcode"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">Zipcode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your zipcode"
                    value={formData.sponsorZipcode}
                    onChange={handleInputChange}
                    isInvalid={formErrors.zipcode}
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
                    value={formData.sponsorGender}
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
                    <button className="small-button">Back</button>
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
