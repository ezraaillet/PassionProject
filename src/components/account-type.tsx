import "../styles/buttons.css";

import { Col, Row } from "react-bootstrap";

export default function AccountTypes() {
  return (
    <div className="account-type-select">
      <Row>
        <Col md={6}>
          <button className="account-type-button">Looking for a sponsor</button>
        </Col>
        <Col md={6}>
          <button className="account-type-button">Looking to sponsor</button>
        </Col>
      </Row>
    </div>
  );
}
