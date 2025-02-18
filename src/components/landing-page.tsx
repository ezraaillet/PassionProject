import "../styles/buttons.css";
import "../styles/landing-page.css";

import { useEffect, useState } from "react";

import AccountTypes from "./account-type";
import ProfilePage from "./profile-page";
import UserSearch from "./user-search";
import UserService from "../services/user-service";
import { useAuth0 } from "@auth0/auth0-react";

export default function LandingPage() {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const { getUserByEmail } = UserService();
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [showAccountTypeButtons, setShowAccountTypeButtons] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const checkUserAccount = async () => {
      if (user?.email) {
        try {
          const userData = await getUserByEmail(user.email);
          if (userData) {
            setLoggedInUser(userData);
          } else {
            setShowAccountTypeButtons(true);
          }
        } catch (error: any) {
          console.error("Error fetching user:", error);
          setShowAccountTypeButtons(true);
        } finally {
          setLoading(false); // Stop loading after user is fetched
        }
      } else if (!isLoading) {
        setLoading(false); // Stop loading if Auth0 is done and no user exists
      }
    };

    checkUserAccount();
  }, [user, isLoading]);

  return (
    <div>
      {loading && (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      )}

      {!isAuthenticated && !loading && (
        <div className="login-button-container">
          <button
            type="button"
            className="global-button"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
        </div>
      )}

      {loggedInUser && !loading && loggedInUser.userType === 1 && (
        <UserSearch user={loggedInUser} />
      )}

      {loggedInUser && !loading && loggedInUser.userType === 2 && (
        <ProfilePage user={loggedInUser} />
      )}

      {showAccountTypeButtons && !loading && <AccountTypes />}
    </div>
  );
}
