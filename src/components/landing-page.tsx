import "../styles/buttons.css";
import "../styles/landing-page.css";

import { useEffect, useState } from "react";

import AccountTypes from "./account-type";
import Notification from "../common/notification-popup";
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
  const [notifications, setNotifications] = useState([{}]);

  const addNotification = (message: string, type: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: Date) => {
    setNotifications((prev) =>
      prev.filter((notification: any) => notification.id !== id)
    );
  };

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
      <div className="notifications-container">
        {notifications.map(({ id, message, type }: any) => (
          <Notification
            key={id}
            message={message}
            type={type}
            onClose={() => removeNotification(id)}
          />
        ))}
      </div>

      {loading && (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      )}

      {!isAuthenticated && !loading && (
        <div className="landing-page-container">
          <div className="about-section">
            <h1>About</h1>
            <p>
              Welcome to our website, where we provide innovative solutions to
              meet your needs. Our platform offers a seamless experience,
              ensuring you have all the tools you need at your fingertips.
              Explore our services, learn more about what we do, and get in
              touch with our team today.
            </p>
            <span
              onClick={() =>
                addNotification("Link copied to clipboard!", "success")
              }
              className="share-button"
            >
              Refer a friend
            </span>
          </div>
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
