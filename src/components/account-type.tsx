import "../styles/buttons.css";

import { Col, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function AccountTypes() {
  return (
    <>
      <ProgressBar striped className="progress-bar" variant="danger" now={80} />
      <div className="account-type-select">
        <Row>
          <Col md={6}>
            <button className="account-type-button">
              Looking for a sponsor
            </button>
          </Col>
          <Col md={6}>
            <button className="account-type-button">Looking to sponsor</button>
          </Col>
        </Row>
      </div>
    </>
  );
}
