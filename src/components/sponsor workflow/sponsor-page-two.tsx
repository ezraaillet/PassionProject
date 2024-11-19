import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";

import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";

interface SponserWorkflowProps {
  backClicked: () => void;
  nextClicked: () => void;
}

export default function SponsorPageTwo({
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
                Become a Sponsor<span className="step">2/5</span>
              </Card.Title>
              <Form>
                <Form.Group controlId="sponsorName" className="card-form-group">
                  <Form.Label className="card-label">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name, Alias, or Initials"
                    value={sponsorWorkflowContext?.formData.sponsorName}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.name}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="sponsorPhone"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    value={sponsorWorkflowContext?.formData.sponsorPhone}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your phone number.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="sponsorMotto"
                  className="card-form-group"
                >
                  <Form.Label className="card-label">Motto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your motto"
                    value={sponsorWorkflowContext?.formData.sponsorMotto}
                    onChange={sponsorWorkflowContext?.handleInputChange}
                    isInvalid={sponsorWorkflowContext?.formErrors.motto}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter your motto.
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
