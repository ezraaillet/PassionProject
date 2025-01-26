import "../styles/profile.css"; // Make sure to create this CSS file

import React, { useEffect, useState } from "react";

export default function ProfilePage({ user }: any) {
  const [userProfileData, setUserProfileData] = useState({});

  useEffect(() => {
    const cleanupUserDataForDisplay = (user: any) => {
      // Remove the last 7 key-value pairs
      const filteredObject = Object.fromEntries(
        Object.entries(user).slice(0, -7)
      );

      // Rename keys to remove "sponsor"
      const transformedObject = Object.fromEntries(
        Object.entries(filteredObject).map(([key, value]) => [
          key.startsWith("sponsor") ? key.replace("sponsor", "") : key,
          value,
        ])
      );
      setUserProfileData(transformedObject);
    };

    cleanupUserDataForDisplay(user);
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-header">Your Profile</h1>
      <div className="profile-data">
        {Object.entries(userProfileData).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong>{" "}
            {typeof value === "string" || typeof value === "number"
              ? value
              : JSON.stringify(value)}
          </p>
        ))}
      </div>
    </div>
  );
}
