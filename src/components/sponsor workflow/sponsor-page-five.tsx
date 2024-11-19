import { Card, Col, Form, Row } from "react-bootstrap";

import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponserWorkflowProps {
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponsorPageFive({
  backClicked,
  nextClicked,
}: SponserWorkflowProps) {
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      stepTime: !sponsorWorkflowContext?.formData.sponsorTimeForSteps,
      intensityLevel: !sponsorWorkflowContext?.formData.sponsorIntensityLevel,
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
                Become a Sponsor<span className="step">5/5</span>
              </Card.Title>
              <Form>
                <Form.Group
                  controlId="sponsorTimeForSteps"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">
                    Time to complete steps
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Time taken to get through steps"
                    value={sponsorWorkflowContext?.formData.sponsorTimeForSteps}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.stepTime}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a time range.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="sponsorIntensityLevel"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">
                    Intensity Level
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your intensity level"
                    value={
                      sponsorWorkflowContext?.formData.sponsorIntensityLevel
                    }
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={
                      sponsorWorkflowContext?.formErrors.intensityLevel
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your intensity level.
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
                      Finish
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
