import "../styles/user-search.css";

import { FilterOptions, UserFilterDrawer } from "../common/user-filter-drawer";
import {
  faFilter,
  faPhone,
  faUpLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    sponsorBio:
      "I have been a sponsor for 5 years and love helping others. My main goal is to blow up, and act like I dont know nobody ahahahahahahahhahahaahha",
    sponsorFaith: "Christianity",
    sponsorGender: "Male",
    sponsorIntensityLevel: "High",
    sponsorJob: "Software Engineer",
    sponsorMotto: "Helping others is the key to success.",
    sponsorName: "John Doe",
    sponsorNumberOfSponsees: "3",
    sponsorPhone: "+15551234567",
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
    sponsorBio:
      "I have been a sponsor for 5 years and love helping others. My main goal is to blow up, and act like I dont know nobody ahahahahahahahhahahaahha",
    sponsorFaith: "Buddhism",
    sponsorGender: "Female",
    sponsorIntensityLevel: "Moderate",
    sponsorJob: "Teacher",
    sponsorMotto: "Empathy is my strength.",
    sponsorName: "Jane Smith",
    sponsorNumberOfSponsees: "2",
    sponsorPhone: "+15559876543",
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
    sponsorBio:
      "I have been a sponsor for 5 years and love helping others. My main goal is to blow up, and act like I dont know nobody ahahahahahahahhahahaahha",
    sponsorFaith: "Atheism",
    sponsorGender: "Female",
    sponsorIntensityLevel: "Low",
    sponsorJob: "Freelancer",
    sponsorMotto: "Take it one step at a time.",
    sponsorName: "Alex Johnson",
    sponsorNumberOfSponsees: "1",
    sponsorPhone: "+15556543210",
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
    sponsorBio:
      "I have been a sponsor for 5 years and love helping others. My main goal is to blow up, and act like I dont know nobody ahahahahahahahhahahaahha",
    sponsorFaith: "Islam",
    sponsorGender: "Male",
    sponsorIntensityLevel: "High",
    sponsorJob: "Retired",
    sponsorMotto: "Persistence beats resistance.",
    sponsorName: "Michael Brown",
    sponsorNumberOfSponsees: "5",
    sponsorPhone: "+15553332222",
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
    sponsorBio:
      "I have been a sponsor for 5 years and love helping others. My main goal is to blow up, and act like I dont know nobody ahahahahahahahhahahaahha",
    sponsorFaith: "Hinduism",
    sponsorGender: "Female",
    sponsorIntensityLevel: "Moderate",
    sponsorJob: "Therapist",
    sponsorMotto: "Growth happens step by step.",
    sponsorName: "Samantha Green",
    sponsorNumberOfSponsees: "4",
    sponsorPhone: "+15554441111",
    sponsorState: "Illinois",
    sponsorTimeForSteps: "8 months",
    sponsorZipcode: "60601",
    userType: 1,
  },
];

export default function UserSearch({ user }: UserSearchProps) {
  const { getUsersByTypeAndState } = UserService();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  // const [filteredSponsors, setFilteredSponsors] = useState<Sponsor[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    gender: "",
    ageRange: [18, 100],
    zipCode: "",
  });

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const sponsorsData = await getUsersByTypeAndState(2, user.sponseeState);
        console.log(sponsorsData);
        setSponsors(sponsorsData || []);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    };

    if (user?.userType && user?.sponseeState) {
      loadSponsors();
    }
  }, []);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getFilteredSponsors = (): Sponsor[] => {
    const { gender, ageRange, zipCode } = filterOptions;

    return sponsors.filter((sponsor) => {
      if (gender && sponsor.sponsorGender !== gender) {
        return false;
      }

      const sponsorAge = Number.parseInt(sponsor.sponsorAge, 10);
      if (sponsorAge < ageRange[0] || sponsorAge > ageRange[1]) {
        return false;
      }

      if (zipCode && sponsor.sponsorZipcode !== zipCode) {
        return false;
      }

      return true;
    });
  };

  const filtered = getFilteredSponsors();

  return (
    <div className="SearchContainer">
      <div
        className="UpArrowContainer"
        onClick={handleScrollUp}
        onKeyDown={handleScrollUp}
      >
        <FontAwesomeIcon icon={faUpLong} style={{ color: "#fff" }} />
      </div>

      <UserFilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onChange={setFilterOptions}
      />

      <div className="SearchHeading">
        <h1>Search Sponsors:</h1>
        <button type="button" onClick={() => setFilterOpen(!filterOpen)}>
          Filters{" "}
          <FontAwesomeIcon icon={faFilter} style={{ color: "#000000" }} />
        </button>
      </div>
      <div className="SearchContent">
        {filtered.length === 0 && (
          <h1>No sponsors found matching your criteria.</h1>
        )}
        {filtered.map((sponsor) => (
          <div className="Card" key={sponsor.id}>
            <div className="CardTitle">
              <h1>{sponsor.sponsorName}</h1>
              <a href={`tel:${sponsor.sponsorPhone}`}>
                <span>
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ color: "#4D68B9" }}
                  />
                </span>
                {sponsor.sponsorPhone}
              </a>
            </div>
            <div className="CardBody">
              <span>
                <p>{`Age: ${sponsor.sponsorAge}`}</p>
                <p>{`Gender: ${sponsor.sponsorGender}`}</p>
              </span>
              <p>{`Religion: ${sponsor.sponsorFaith}`}</p>
              <p>{`Job: ${sponsor.sponsorJob}`}</p>
              <p>{`Availability: ${sponsor.sponsorAvailability}`}</p>
            </div>
            <div className="CardFooter">
              <p>bio: </p>
              <p>{sponsor.sponsorBio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
