import "../styles/buttons.css";

import { Col, Row } from "react-bootstrap";

import SponseeWorkflow from "./sponsee-workflow";
import SponsorWorkflow from "./sponsor-workflow";
import { useState } from "react";

export default function AccountTypes() {
  const [workflowType, setWorkflowType] = useState<number | null>(null);

  function handleAccountTypeSelect(accountType: number): void {
    setWorkflowType(accountType);
  }

  function backClicked() {
    setWorkflowType(null);
  }

  return (
    <>
      {workflowType === null && (
        <div className="account-type-select">
          <Row>
            <Col md={6}>
              <button
                onClick={() => handleAccountTypeSelect(1)}
                className="account-type-button"
              >
                I need a Sponsor
              </button>
            </Col>
            <Col md={6}>
              <button
                onClick={() => handleAccountTypeSelect(2)}
                className="account-type-button"
              >
                Become a Sponsor
              </button>
            </Col>
          </Row>
        </div>
      )}
      {workflowType === 1 && <SponseeWorkflow backClicked={backClicked} />}
      {workflowType === 2 && <SponsorWorkflow backClicked={backClicked} />}
    </>
  );
}
