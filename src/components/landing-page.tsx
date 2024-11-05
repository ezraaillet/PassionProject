import "../styles/buttons.css";
import "../styles/landing-page.css";

import { Col, Row, Spinner } from "react-bootstrap";

import AccountTypes from "./account-type";
import { useAuth0 } from "@auth0/auth0-react";
import UserService from "../services/user-service";
import { useEffect, useState } from "react";
import UserSearch from "./user-search";

export default function LandingPage() {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const { getUserByEmail } = UserService();
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [showAccountTypeButtons, setShowAccountTypeButtons] = useState(false);

  useEffect(() => {
    const checkUserAccount = async () => {
      if (user?.email) {
        try {
          const userLoggedIn = await getUserByEmail(user.email);
          if (userLoggedIn) {
            setLoggedInUser(true);
          }
        } catch (error: any) {
          if (error.message === "Error: Not Found") {
            setShowAccountTypeButtons(true);
          }
          console.error("Error fetching user:", error);
        }
      }
    };
    checkUserAccount();
  }, [user]);

  return (
    <div>
      {isLoading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      {!isAuthenticated && !isLoading && (
        <div className="login-button-container">
          <button className="login-button" onClick={() => loginWithRedirect()}>
            Log In
          </button>
        </div>
      )}

      {loggedInUser && !isLoading && <UserSearch />}
      {showAccountTypeButtons && <AccountTypes />}
    </div>
  );
}
