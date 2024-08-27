import "../styles/buttons.css";
import "../styles/landing-page.css";

import { Col, Row } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";

export default function LandingPage() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      {!isAuthenticated && !isLoading && (
        <div className="login-button-container">
          <button className="login-button" onClick={() => loginWithRedirect()}>
            Log In
          </button>
        </div>
      )}

      {isAuthenticated && !isLoading && (
        <div className="account-type-select">
          <Row>
            <Col md={6}>
              <button className="account-type-button">
                Looking for a sponsor
              </button>
            </Col>
            <Col md={6}>
              <button className="account-type-button">
                Looking to sponsor
              </button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
