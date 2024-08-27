import "../styles/buttons.css";
import "../styles/landing-page.css";

import { Col, Row } from "react-bootstrap";

import AccountTypes from "./account-type";
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

      {isAuthenticated && !isLoading && <AccountTypes />}
    </div>
  );
}
