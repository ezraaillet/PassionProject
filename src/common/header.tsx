import "../styles/header.css";

import { Col, Row } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { logout, isAuthenticated, isLoading, user } = useAuth0();

  return (
    <div className="header">
      <Row className="align-items-center">
        <Col xs={6} md={9}>
          <div className="header-text">Passion Project</div>
        </Col>
        {isAuthenticated && !isLoading && user && (
          <>
            <Col xs={3} md={2} className="username-section">
              <div className="username">Welcome, {user.nickname}!</div>
            </Col>
            <Col
              xs={3}
              md={1}
              className="button-section"
              onClick={() => logout()}
            >
              <div className="logout">Logout</div>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}
