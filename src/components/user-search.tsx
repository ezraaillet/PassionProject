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

const testDataSponsors: Sponsor[] = [
  {
    email: "john.doe@example.com",
    id: "1",
    sponsorAge: "35",
    sponsorAvailability: "Evenings",
    sponsorBio: "I have been a sponsor for 5 years and love helping others.",
    sponsorFaith: "Christianity",
    sponsorGender: "Male",
    sponsorIntensityLevel: "High",
    sponsorJob: "Software Engineer",
    sponsorMotto: "Helping others is the key to success.",
    sponsorName: "John Doe",
    sponsorNumberOfSponsees: "3",
    sponsorPhone: "555-123-4567",
    sponsorState: "California",
    sponsorTimeForSteps: "6 months",
    sponsorZipcode: "90001",
    userType: 1,
  },
  {
    email: "jane.smith@example.com",
    id: "2",
    sponsorAge: "42",
    sponsorAvailability: "Weekends",
    sponsorBio: "A dedicated sponsor with a passion for guiding sponsees.",
    sponsorFaith: "Buddhism",
    sponsorGender: "Female",
    sponsorIntensityLevel: "Moderate",
    sponsorJob: "Teacher",
    sponsorMotto: "Empathy is my strength.",
    sponsorName: "Jane Smith",
    sponsorNumberOfSponsees: "2",
    sponsorPhone: "555-987-6543",
    sponsorState: "New York",
    sponsorTimeForSteps: "1 year",
    sponsorZipcode: "10001",
    userType: 1,
  },
  {
    email: "alex.johnson@example.com",
    id: "3",
    sponsorAge: "29",
    sponsorAvailability: "Mornings",
    sponsorBio: "New to sponsoring but eager to support.",
    sponsorFaith: "Atheism",
    sponsorGender: "Non-binary",
    sponsorIntensityLevel: "Low",
    sponsorJob: "Freelancer",
    sponsorMotto: "Take it one step at a time.",
    sponsorName: "Alex Johnson",
    sponsorNumberOfSponsees: "1",
    sponsorPhone: "555-654-3210",
    sponsorState: "Texas",
    sponsorTimeForSteps: "3 months",
    sponsorZipcode: "73301",
    userType: 1,
  },
  {
    email: "michael.brown@example.com",
    id: "4",
    sponsorAge: "50",
    sponsorAvailability: "Afternoons",
    sponsorBio: "I’ve been through it all and I’m here to guide you.",
    sponsorFaith: "Islam",
    sponsorGender: "Male",
    sponsorIntensityLevel: "High",
    sponsorJob: "Retired",
    sponsorMotto: "Persistence beats resistance.",
    sponsorName: "Michael Brown",
    sponsorNumberOfSponsees: "5",
    sponsorPhone: "555-333-2222",
    sponsorState: "Florida",
    sponsorTimeForSteps: "2 years",
    sponsorZipcode: "32003",
    userType: 1,
  },
  {
    email: "samantha.green@example.com",
    id: "5",
    sponsorAge: "38",
    sponsorAvailability: "Flexible",
    sponsorBio: "A compassionate listener and a dedicated guide.",
    sponsorFaith: "Hinduism",
    sponsorGender: "Female",
    sponsorIntensityLevel: "Moderate",
    sponsorJob: "Therapist",
    sponsorMotto: "Growth happens step by step.",
    sponsorName: "Samantha Green",
    sponsorNumberOfSponsees: "4",
    sponsorPhone: "555-444-1111",
    sponsorState: "Illinois",
    sponsorTimeForSteps: "8 months",
    sponsorZipcode: "60601",
    userType: 1,
  },
];

export default function UserSearch({ user }: UserSearchProps) {
  const { getUsersByTypeAndState } = UserService();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const sponsorsData = await getUsersByTypeAndState(2, user.sponseeState);
        console.log(sponsorsData);
        // setSponsors(testDataSponsors);
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
