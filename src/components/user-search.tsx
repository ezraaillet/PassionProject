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
import { homegroups } from "../common/homegroups";

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
  sponsorHomeGroup: string;
  sponsorRecoveryTime: string;
  userType: number;
}

export default function UserSearch({ user }: UserSearchProps) {
  const { getUsersByTypeAndState } = UserService();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    gender: "",
    ageRange: [18, 100],
    zipCode: "",
    homeGroup: "",
  });

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const sponsorsData = await getUsersByTypeAndState(2, user.sponseeState);

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

  const getLabelByValue = (value: string) => {
    const group = homegroups.find((group) => group.value === value);
    return group ? group.label : "Not Found";
  };

  const getFilteredSponsors = (): Sponsor[] => {
    const { gender, ageRange, zipCode, homeGroup } = filterOptions;

    return sponsors.filter((sponsor) => {
      if (gender && sponsor.sponsorGender !== gender) return false;

      if (zipCode && sponsor.sponsorZipcode !== zipCode) return false;

      if (homeGroup && sponsor.sponsorHomeGroup !== homeGroup) return false;

      const sponsorAge = Number(sponsor.sponsorAge);
      if (sponsorAge === 0) return true;
      if (sponsorAge < ageRange[0] || sponsorAge > ageRange[1]) return false;

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
              {/* Primary Information */}
              <div className="primary-info">
                {sponsor.sponsorHomeGroup && (
                  <p>
                    <strong>Home Group:</strong>{" "}
                    {getLabelByValue(sponsor.sponsorHomeGroup)}
                  </p>
                )}
                {sponsor.sponsorGender && (
                  <p>
                    <strong>Gender:</strong> {sponsor.sponsorGender}
                  </p>
                )}
                {sponsor.sponsorAge && (
                  <p>
                    <strong>Age:</strong> {sponsor.sponsorAge}
                  </p>
                )}
                {sponsor.sponsorState && (
                  <p>
                    <strong>State:</strong> {sponsor.sponsorState}
                  </p>
                )}
              </div>

              {/* Secondary Information */}
              <div className="secondary-info">
                {sponsor.sponsorZipcode && (
                  <p>
                    <strong>Zip Code:</strong> {sponsor.sponsorZipcode}
                  </p>
                )}
                {sponsor.sponsorFaith && (
                  <p>
                    <strong>Religion:</strong> {sponsor.sponsorFaith}
                  </p>
                )}
                {sponsor.sponsorJob && (
                  <p>
                    <strong>Job:</strong> {sponsor.sponsorJob}
                  </p>
                )}
                {sponsor.sponsorAvailability && (
                  <p>
                    <strong>Availability:</strong> {sponsor.sponsorAvailability}
                  </p>
                )}
              </div>

              {/* Additional Details */}
              <div className="additional-details">
                {sponsor.sponsorMotto && (
                  <p>
                    <strong>Motto:</strong> {sponsor.sponsorMotto}
                  </p>
                )}
                {sponsor.sponsorNumberOfSponsees && (
                  <p>
                    <strong>Number of Sponsees:</strong>{" "}
                    {sponsor.sponsorNumberOfSponsees}
                  </p>
                )}
                {sponsor.sponsorTimeForSteps && (
                  <p>
                    <strong>Time for Steps:</strong>{" "}
                    {sponsor.sponsorTimeForSteps}
                  </p>
                )}
              </div>

              {/* Other Information */}
              <div className="other-info">
                {sponsor.sponsorIntensityLevel && (
                  <p>
                    <strong>Intensity Level:</strong>{" "}
                    {sponsor.sponsorIntensityLevel}
                  </p>
                )}
                {sponsor.sponsorRecoveryTime && (
                  <p>
                    <strong>Recovery Time:</strong>{" "}
                    {sponsor.sponsorRecoveryTime}
                  </p>
                )}
              </div>
            </div>

            <div className="CardFooter">
              <p>Bio: </p>
              <p>{sponsor.sponsorBio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
