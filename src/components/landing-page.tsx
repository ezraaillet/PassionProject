import "../styles/buttons.css";
import "../styles/landing-page.css";

import { Col, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

import AccountTypes from "./account-type";
import UserSearch from "./user-search";
import UserService from "../services/user-service";
import { useAuth0 } from "@auth0/auth0-react";

export default function LandingPage() {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const { getUserByEmail } = UserService();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showAccountTypeButtons, setShowAccountTypeButtons] = useState(false);

  useEffect(() => {
    const checkUserAccount = async () => {
      if (user?.email) {
        try {
          const userLoggedIn = await getUserByEmail(user.email);
          if (userLoggedIn) {
            setLoggedInUser(userLoggedIn);
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
      {isLoading && !loggedInUser && (
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

      {loggedInUser && !isLoading && <UserSearch user={loggedInUser} />}
      {showAccountTypeButtons && <AccountTypes />}
    </div>
  );
}
