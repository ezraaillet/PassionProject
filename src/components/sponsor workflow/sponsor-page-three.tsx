import { Card, Col, Form, Row } from "react-bootstrap";

import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponserWorkflowProps {
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponsorPageThree({
  backClicked,
  nextClicked,
}: SponserWorkflowProps) {
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      name: !sponsorWorkflowContext?.formData.sponsorName,
      phone: !sponsorWorkflowContext?.formData.sponsorPhone,
      motto: !sponsorWorkflowContext?.formData.sponsorMotto,
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
              <Card.Title>
                Become a Sponsor<span className="step">3/5</span>
              </Card.Title>
              <Form>
                <Form.Group controlId="sponsorAge" className="card-form-group">
                  <Form.Label className="card-label">Age</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Age"
                    value={sponsorWorkflowContext?.formData.sponsorAge}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.age}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid age.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="sponsorJob" className="card-form-group">
                  <Form.Label className="card-label">Job</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your job"
                    value={sponsorWorkflowContext?.formData.sponsorJob}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.job}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your job.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="sponsorNumberOfSponsees"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">
                    Max number of sponsees
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Max number of sponsees"
                    value={
                      sponsorWorkflowContext?.formData.sponsorNumberOfSponsees
                    }
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={
                      sponsorWorkflowContext?.formErrors.numberOfSponsees
                    }
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter number of sponsees.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="card-buttons-container">
                  <Col className="card-buttons">
                    <button onClick={backClicked} className="small-button">
                      Back
                    </button>
                  </Col>
                  <Col className="card-buttons">
                    <button
                      onClick={handleNext}
                      className="small-button"
                      type="submit"
                    >
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
