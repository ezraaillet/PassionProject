import "../styles/header.css";

import { Col, Row } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { logout, isAuthenticated, isLoading, user } = useAuth0();

  return (
    <div className="header">
      <Row>
        <Col md={9}>
          <div className="header-text">Passion Project</div>
        </Col>
        <Col md={3}>
          {isAuthenticated && !isLoading && user && (
            <div className="d-flex justify-content-space-evenly">
              <p className="username">Welcome, {user.nickname}!</p>
              <button className="logout" onClick={() => logout()}>
                Logout
              </button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
