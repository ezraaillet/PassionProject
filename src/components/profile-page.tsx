import "../styles/profile.css"; // Make sure to create this CSS file
import React, { useEffect, useState } from "react";
import DisableAccount from "./disable-account";

export default function ProfilePage({ user }: any) {
  const [open, setOpen] = useState(false);
	const [userProfileData, setUserProfileData] = useState({});
	const [userProfile, setUserProfile] = useState({
		state: "",
		zipcode: "",
		gender: "",
		name: "",
		phone: "",
		motto: "",
		age: "",
		job: "",
		numberOfSponsees: "",
		bio: "",
		availability: "",
		faith: "",
		timeForSteps: "",
		intensityLevel: "",
		email: "",
	});

	useEffect(() => {
		const cleanupUserDataForDisplay = (user: any) => {
			console.log(user);
			// Remove the last 7 key-value pairs
			const filteredObject = Object.fromEntries(
				Object.entries(user).slice(0, -7),
			);

			// Rename keys to remove "sponsor"
			const transformedObject = Object.fromEntries(
				Object.entries(filteredObject).map(([key, value]) => [
					key.startsWith("sponsor") ? key.replace("sponsor", "") : key,
					value,
				]),
			);
			setUserProfileData(transformedObject);
			setUserProfile({
				state: user.sponsorState || "Not specified",
				zipcode: user.zipcode || "Not specified",
				gender: user.sponsorGender || "Not specified",
				name: user.sponsorName || "Unknown",
				phone: user.sponsorPhone || "Not available",
				motto: user.sponsorMotto || "No motto provided",
				age: user.sponsorAge || "Not specified",
				job: user.sponsorJob || "Not specified",
				numberOfSponsees: user.sponsorNumberOfSponsees || "0",
				bio: user.sponsorBio || "No bio available",
				availability: user.sponsorAvailability || "Not specified",
				faith: user.sponsorFaith || "Not specified",
				timeForSteps: user.sponsorTimeForSteps || "Not specified",
				intensityLevel: user.sponsorIntensityLevel || "Not specified",
				email: user.email || "No email provided",
			});
		};

		cleanupUserDataForDisplay(user);
	}, []);

  return (
    <>
    {open && (
      <DisableAccount 
        open={open}
        setOpen={setOpen}
      />
    )}


    <div className="ProfilePageContainer">
      <div className="ProfilePageHeader">

        {/* //! Uncomment after adding profile images to the DB -- the styling already exists */}
        {/* <img
          className="ProfileImage"
          src="https://via.placeholder.com/150" 
          alt="Profile"
        /> */}
        <h1>{userProfile.name}</h1>
        <p className="ProfileEmail">
          {userProfile.email}{" "}
          {/* //! uncomment when adding edit functionality */}
          {/* <span className="edit-icon material-symbols-outlined">edit</span> */}
        </p>
      </div>
      <div className="ProfilePageData">
        {[
          { label: "State", value: userProfile.state },
          { label: "Zip Code", value: userProfile.zipcode },
          { label: "Gender", value: userProfile.gender },
          { label: "Phone", value: userProfile.phone },
          { label: "Motto", value: userProfile.motto },
          { label: "Age", value: userProfile.age },
          { label: "Job", value: userProfile.job },
          { label: "Number of Sponsees", value: userProfile.numberOfSponsees },
          { label: "Bio", value: userProfile.bio },
          { label: "Availability", value: userProfile.availability },
          { label: "Faith", value: userProfile.faith },
          { label: "Time for Steps", value: userProfile.timeForSteps },
          { label: "Intensity Level", value: userProfile.intensityLevel },
        ].map((field, index) => (
          <div className="ProfilePageDataItem" key={index}>
            <p className="ProfilePageDataTitle">{field.label}:</p>
            <p>{field.value}</p>
            {/* //!uncomment when adding edit functionality */}
            {/* <span className="edit-icon material-symbols-outlined">edit</span> */}
          </div>
        ))}
        <div className="deleteButtonContainer">
          <button onClick={() => setOpen(true)} className="DeleteAccountButton" type="button">Disable Account</button>
        </div>
      </div>
    </div>
    </>
  );
}