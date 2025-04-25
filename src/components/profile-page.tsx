import "../styles/profile.css";

import { Pencil, Save, X } from "lucide-react";
import React, { useState } from "react";

import DisableAccount from "./disable-account";
import LandingPage from "./landing-page";
import UserService from "../services/user-service";
import { genders } from "../common/genders";
import { homegroups } from "../common/homegroups";
import { states } from "../common/states";
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
  const { updateUser } = UserService();
  const { logout } = useAuth0();

  const [open, setOpen] = useState(false);
  const [accountBeingDeleted, setAccountBeingDeleted] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const [initialProfile, setInitialProfile] = useState(userProfile);

  const fieldLabels = [
    { key: "homeGroup", label: "Home Group" },
    { key: "state", label: "State" },
    { key: "zipcode", label: "Zip Code" },
    { key: "gender", label: "Gender" },
    { key: "motto", label: "Motto" },
    { key: "age", label: "Age" },
    { key: "numberOfSponsees", label: "Sponsees" },
    { key: "recoveryTime", label: "Recovery Time" },
    { key: "bio", label: "Bio" },
    { key: "availability", label: "Availability" },
    { key: "faith", label: "Faith" },
    { key: "timeForSteps", label: "Time for Steps" },
    { key: "intensityLevel", label: "Intensity" },
    { key: "job", label: "Job" },
  ];

  async function startDeleteAccount() {
    setOpen(false);
    setAccountBeingDeleted(true);

    try {
      await deleteUserByEmail(userProfile.email);
      await logout();
      setAccountBeingDeleted(false);
      setAccountDeleted(true);
    } catch (error) {
      setAccountBeingDeleted(false);
      console.error("Failed to delete the account:", error);
      alert("An error occurred while deleting the account. Please try again.");
    }
  }

  const getLabelByValue = (
    value: string,
    options: { value: string; label: string }[]
  ) => {
    const match = options.find((item) => item.value === value);
    return match ? match.label : value;
  };

  const handleInputChange = (key: keyof UserProfile, value: string) => {
    setUserProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderInput = (field: { key: string; label: string }) => {
    const value = userProfile[field.key as keyof UserProfile];

    if (field.key === "homeGroup") {
      return (
        <select
          className="ProfilePageDataInput"
          value={userProfile.homeGroup}
          onChange={(e) => handleInputChange("homeGroup", e.target.value)}
        >
          {homegroups.map((group) => (
            <option key={group.value} value={group.value}>
              {group.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.key === "state") {
      return (
        <select
          className="ProfilePageDataInput"
          value={userProfile.state}
          onChange={(e) => handleInputChange("state", e.target.value)}
        >
          {states.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.key === "zipcode") {
      return (
        <input
          className="ProfilePageDataInput"
          type="text"
          pattern="\d{5}"
          title="Enter a valid 5-digit ZIP code"
          value={userProfile.zipcode}
          onChange={(e) => handleInputChange("zipcode", e.target.value)}
        />
      );
    }

    if (field.key === "age") {
      return (
        <input
          className="ProfilePageDataInput"
          type="number"
          min={13}
          max={120}
          value={userProfile.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
        />
      );
    }

    if (field.key === "gender") {
      return (
        <select
          className="ProfilePageDataInput"
          value={userProfile.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
        >
          {genders.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        className="ProfilePageDataInput"
        type="text"
        value={value}
        onChange={(e) =>
          handleInputChange(field.key as keyof UserProfile, e.target.value)
        }
      />
    );
  };

  const saveChanges = async () => {
    const payload = {
      sponsorState: userProfile.state,
      sponsorZipcode: userProfile.zipcode,
      sponsorGender: userProfile.gender,
      sponsorName: userProfile.name,
      sponsorPhone: userProfile.phone,
      sponsorMotto: userProfile.motto,
      sponsorAge: userProfile.age,
      sponsorJob: userProfile.job,
      sponsorNumberOfSponsees: userProfile.numberOfSponsees,
      sponsorBio: userProfile.bio,
      sponsorAvailability: userProfile.availability,
      sponsorFaith: userProfile.faith,
      sponsorTimeForSteps: userProfile.timeForSteps,
      sponsorIntensityLevel: userProfile.intensityLevel,
      sponsorRecoveryTime: userProfile.recoveryTime,
      sponsorHomeGroup: userProfile.homeGroup,
      email: userProfile.email,
      userType: 2,
      id: userProfile.email,
    };

    try {
      await updateUser(payload); // Assuming updateUserProfile is your service method
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Something went wrong while saving your profile.");
    }
  };

  if (accountDeleted) {
    return <LandingPage />;
  }

  return (
    <>
      {accountBeingDeleted && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {open && (
        <DisableAccount
          open={open}
          setOpen={setOpen}
          deleteAccount={startDeleteAccount}
          email={userProfile.email}
        />
      )}

      {!accountBeingDeleted && (
        <div className="ProfilePageContainer">
          <div className="ProfilePageHeader">
            <div className="HeaderInfo">
              <h1>{userProfile.name}</h1>
              <p>{userProfile.phone}</p>
              <p>{userProfile.email}</p>
            </div>
            <div className="HeaderEdit">
              {isEditing ? (
                <>
                  <X
                    className="pointer delete-button"
                    size={24}
                    color="#000"
                    onClick={() => {
                      setUserProfile(initialProfile);
                      setIsEditing(false);
                    }}
                  />
                  <Save
                    className="pointer"
                    size={24}
                    color="#000"
                    onClick={saveChanges}
                  />
                </>
              ) : (
                <Pencil
                  className="pointer"
                  size={24}
                  color="#000"
                  onClick={() => {
                    setInitialProfile(userProfile);
                    setIsEditing(true);
                  }}
                />
              )}
            </div>
          </div>

          <div className="ProfilePageData">
            {fieldLabels
              // .filter((field) => userProfile[field.key as keyof UserProfile])
              .map((field, index) => (
                <div className="ProfilePageDataPair" key={index}>
                  <p className="ProfilePageDataTitle">{field.label}:</p>
                  {isEditing ? (
                    renderInput(field)
                  ) : (
                    <p className="ProfilePageDataValue">
                      {field.key === "homeGroup"
                        ? getLabelByValue(userProfile.homeGroup, homegroups)
                        : field.key === "state"
                        ? getLabelByValue(userProfile.state, states)
                        : userProfile[field.key as keyof UserProfile]}
                    </p>
                  )}
                </div>
              ))}
          </div>

          <div className="ButtonContainer">
            <button
              onClick={() => setOpen(true)}
              className="global-button profile"
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
