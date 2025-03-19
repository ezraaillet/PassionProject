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

  const referFriend = () => {
    const link = window.location.href; // Get current page URL
    navigator.clipboard
      .writeText(link)
      .then(() => {
        addNotification("Link copied to clipboard!", "success");
      })
      .catch((err) => console.error("Failed to copy:", err));
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
              Welcome to Passion Project. This website is designed to support
              those seeking to become more available as sponsors, as well as to
              serve as a resource for individuals looking for a sponsor in
              12-step programs. Our goal is not to replace traditional methods
              of connection within 12-step programs but to enhance and
              streamline the process, ensuring more people have the opportunity
              to experience recovery.
            </p>
            <span onClick={() => referFriend()} className="share-button">
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
