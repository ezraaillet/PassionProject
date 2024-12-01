import "../styles/user-search.css";

import { useEffect, useState } from "react";

import UserService from "../services/user-service";

interface User {
  userType: number;
  sponseeState: string;
}

interface UserSearchProps {
  user: User;
}

interface Sponsor {
  email: string;
  id: string;
  sponsorAge: string;
  sponsorAvailability: string;
  sponsorBio: string;
  sponsorFaith: string;
  sponsorGender: string;
  sponsorIntensityLevel: string;
  sponsorJob: string;
  sponsorMotto: string;
  sponsorName: string;
  sponsorNumberOfSponsees: string;
  sponsorPhone: string;
  sponsorState: string;
  sponsorTimeForSteps: string;
  sponsorZipcode: string;
  userType: number;
}

export default function UserSearch({ user }: UserSearchProps) {
  const { getUsersByTypeAndState } = UserService();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const sponsorsData = await getUsersByTypeAndState(2, user.sponseeState);
        console.log(sponsorsData);
        setSponsors(sponsorsData || []);
      } catch (error: any) {
        if (error.message === "Error: Not Found") {
          console.warn("No sponsors found for this user.");
        } else {
          console.error("Error fetching sponsors:", error);
        }
      }
    };

    // Ensure the `user` object is valid before making the call.
    if (user?.userType && user?.sponseeState) {
      loadSponsors();
    }
  }, []); // Add dependencies to avoid unnecessary re-renders.

  return (
    <div className="page-container">
      <h1 className="user-search-title">User Search</h1>
      <div className="card-container">
        {sponsors.map((sponsor) => (
          <div className="card" key={sponsor.id}>
            <h2>{sponsor.sponsorName}</h2>
            <p>
              {sponsor.sponsorJob} | {sponsor.sponsorFaith}
            </p>
            <p>{sponsor.sponsorBio}</p>
            <p>
              Age: {sponsor.sponsorAge} | Gender: {sponsor.sponsorGender}
            </p>
            <p>Availability: {sponsor.sponsorAvailability}</p>
            <p>Motto: {sponsor.sponsorMotto}</p>
            <p>
              <a href={`tel:${sponsor.sponsorPhone}`}>
                Call: {sponsor.sponsorPhone}
              </a>
              <br />
              <a href={`mailto:${sponsor.email}`}>Email</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
