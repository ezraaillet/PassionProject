import { Card, Col, Form, Row } from "react-bootstrap";

import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponserWorkflowProps {
  workflowStep: number;
  setWorkflowStep: React.Dispatch<React.SetStateAction<number>>;
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponsorPageFour({
  workflowStep,
  setWorkflowStep,
  backClicked,
  nextClicked,
}: SponserWorkflowProps) {
  const sponsorWorkflowContext = useSponsorWorkflowContext();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      name: !sponsorWorkflowContext?.formData.sponsorBio,
      phone: !sponsorWorkflowContext?.formData.sponsorAvailability,
      motto: !sponsorWorkflowContext?.formData.sponsorFaith,
    };

    sponsorWorkflowContext?.setFormErrors(errors);

    const isValid = !Object.values(errors).includes(true);

    if (isValid) {
      console.log(
        "Form submitted successfully",
        sponsorWorkflowContext?.formData
      );
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
                Become a Sponsor<span className="step">4/5</span>
              </Card.Title>
              <Form>
                <Form.Group controlId="sponsorBio" className="card-form-group">
                  <Form.Label className="card-label">Bio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="A little about yourself"
                    value={sponsorWorkflowContext?.formData.sponsorBio}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.bio}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid bio.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="sponsorAvailability"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">Availability</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Availability"
                    value={sponsorWorkflowContext?.formData.sponsorAvailability}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.availability}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your availability.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="sponsorFaith"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">Faith</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Faith or Religion"
                    value={sponsorWorkflowContext?.formData.sponsorFaith}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.faith}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter your faith.
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
