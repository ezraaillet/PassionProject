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
        <Col md={2}>
          {isAuthenticated && !isLoading && user && (
            <div className="d-flex justify-content-space-evenly">
              <p className="username">Welcome, {user.nickname}!</p>
              {/* <button className="logout" onClick={() => logout()}>
                Logout
              </button> */}
            </div>
          )}
        </Col>
        {isAuthenticated && !isLoading && (
          <Col md={1} className="button-section" onClick={() => logout()}>
            <div className="logout">Logout</div>
          </Col>
        )}
      </Row>
    </div>
  );
}
