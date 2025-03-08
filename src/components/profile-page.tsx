import "../styles/profile.css";

import React, { useEffect, useState } from "react";

import DisableAccount from "./disable-account";
import LandingPage from "./landing-page";
import UserService from "../services/user-service";
import { get } from "http";
import { homegroups } from "../common/homegroups";
import { useAuth0 } from "@auth0/auth0-react";

interface UserProfile {
  state: string;
  zipcode: string;
  gender: string;
  name: string;
  phone: string;
  motto: string;
  age: string;
  job: string;
  numberOfSponsees: string;
  bio: string;
  availability: string;
  faith: string;
  timeForSteps: string;
  intensityLevel: string;
  email: string;
  homeGroup: string;
  recoveryTime: string;
}

export default function ProfilePage({ user }: any) {
  const { deleteUserByEmail } = UserService();
  const [open, setOpen] = useState(false); // For showing the confirmation popup
  const [accountBeingDeleted, setAccountBeingDeleted] = useState(false); // For showing the spinner
  const [accountDeleted, setAccountDeleted] = useState(false); // For redirecting to the landing page
  const { logout } = useAuth0();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    state: user.sponsorState || "",
    zipcode: user.sponsorZipcode || "",
    gender: user.sponsorGender || "",
    name: user.sponsorName || "",
    phone: user.sponsorPhone || "",
    motto: user.sponsorMotto || "",
    age: user.sponsorAge || "",
    job: user.sponsorJob || "",
    numberOfSponsees: user.sponsorNumberOfSponsees || "",
    bio: user.sponsorBio || "",
    availability: user.sponsorAvailability || "",
    faith: user.sponsorFaith || "",
    timeForSteps: user.sponsorTimeForSteps || "",
    intensityLevel: user.sponsorIntensityLevel || "",
    email: user.email || "",
    homeGroup: user.sponsorHomeGroup || "",
    recoveryTime: user.sponsorRecoveryTime || "",
  });

  // Handles the delete process
  async function startDeleteAccount() {
    setOpen(false); // Close the confirmation popup
    setAccountBeingDeleted(true); // Show the spinner

    try {
      debugger;
      await Promise.all([deleteUserByEmail(userProfile.email), logout()]);
      setAccountBeingDeleted(false); // Stop showing the spinner
      setAccountDeleted(true); // Trigger redirection to the landing page
    } catch (error) {
      setAccountBeingDeleted(false); // Stop the spinner even on failure
      console.error("Failed to delete the account:", error);
      alert("An error occurred while deleting the account. Please try again.");
    }
  }

  const getLabelByValue = (value: string) => {
    const group = homegroups.find((group) => group.value === value);
    return group ? group.label : "Not Found";
  };

  if (accountDeleted) {
    return <LandingPage />;
  }

  return (
    <>
      {/* Show the loading spinner during deletion */}
      {accountBeingDeleted && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {/* Show the confirmation popup */}
      {open && (
        <DisableAccount
          open={open}
          setOpen={setOpen}
          deleteAccount={startDeleteAccount}
          email={userProfile.email}
        />
      )}

      {/* Main profile page */}
      {!accountBeingDeleted && (
        <div className="ProfilePageContainer">
          <div className="ProfilePageHeader">
            <h1>{userProfile.name}</h1>
            <span className="ProfileContactInfo">
              <p className="ProfileEmail">{userProfile.phone}</p>
              <p className="ProfileEmail">{userProfile.email}</p>
            </span>
          </div>
          <div className="ProfilePageData">
            {[
              {
                label: "Home Group",
                value: getLabelByValue(userProfile.homeGroup),
              },
              { label: "State", value: userProfile.state },
              { label: "Zip Code", value: userProfile.zipcode },
              { label: "Gender", value: userProfile.gender },
              { label: "Motto", value: userProfile.motto },
              { label: "Age", value: userProfile.age },
              { label: "Sponsees", value: userProfile.numberOfSponsees },
              { label: "Recovery Time", value: userProfile.recoveryTime },
              { label: "Bio", value: userProfile.bio },
              { label: "Availability", value: userProfile.availability },
              { label: "Faith", value: userProfile.faith },
              { label: "Time for Steps", value: userProfile.timeForSteps },
              { label: "Intensity", value: userProfile.intensityLevel },
              { label: "Job", value: userProfile.job },
            ]
              .filter((field) => field.value) // Only keep fields with a non-empty value
              .map((field, index) => (
                <div className="ProfilePageDataPair" key={index}>
                  <p className="ProfilePageDataTitle">
                    <strong>{field.label}:</strong>
                  </p>
                  <p className="ProfilePageDataValue">{field.value}</p>
                </div>
              ))}
          </div>
          <div className="ButtonContainer">
            <button
              onClick={() => setOpen(true)}
              className="global-button"
              type="button"
            >
              Disable Account
            </button>
          </div>
        </div>
      )}
    </>
  );
}
