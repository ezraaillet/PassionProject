import "../styles/profile.css";

import React, { useState } from "react";

import DisableAccount from "./disable-account";
import LandingPage from "./landing-page";
import UserService from "../services/user-service";
import { homegroups } from "../common/homegroups";
import { useAuth0 } from "@auth0/auth0-react";
import { Pencil, X, Save } from "lucide-react";

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

  const getLabelByValue = (value: string) => {
    const group = homegroups.find((group) => group.value === value);
    return group ? group.label : value;
  };

	const handleInputChange = (key: keyof UserProfile, value: string) => {
		setUserProfile((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const saveChanges = async () => {
		// TODO: call updateUserProfile(userProfile) here if needed
		setIsEditing(false);
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
							<Pencil className="pointer" size={24} color="#000" />

							{/* USE THESE WHEN YOU IMPLEMENT THE EDIT BUTTON */}
							{/* <X /> */}
							{/* <Save /> */}
						</div>
						{/* <div>
              <h1>{userProfile.name}</h1>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-profile-button"
                  type="button"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button className="save-button" onClick={saveChanges}>
                    Save
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
            <span className="ProfileContactInfo">
              <p className="ProfileEmail">{userProfile.phone}</p>
              <p className="ProfileEmail">{userProfile.email}</p>
            </span> */}
					</div>

					<div className="ProfilePageData">
						{fieldLabels
							.filter((field) => userProfile[field.key as keyof UserProfile])
							.map((field, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<div className="ProfilePageDataPair" key={index}>
									<p className="ProfilePageDataTitle">{field.label}:</p>
									{isEditing ? (
										<input
											className="ProfilePageDataInput"
											type="text"
											value={
												field.key === "homeGroup"
													? getLabelByValue(userProfile.homeGroup)
													: userProfile[field.key as keyof UserProfile]
											}
											onChange={(e) =>
												handleInputChange(
													field.key as keyof UserProfile,
													e.target.value,
												)
											}
										/>
									) : (
										<p className="ProfilePageDataValue">
											{field.key === "homeGroup"
												? getLabelByValue(userProfile.homeGroup)
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
