import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormInput from "./form-input";
import { RadioInput } from "./radio-input";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { homegroups } from "./homegroups";
import { useState } from "react";

export type FilterOptions = {
  gender: string;
  ageRange: [number, number];
  zipCode: string;
  homeGroup: string;
};

type UserFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  onChange: (filters: FilterOptions) => void;
};

export const UserFilterDrawer = ({
  open,
  onClose,
  onChange,
}: UserFilterDrawerProps) => {
  const [gender, setGender] = useState<string>("");
  const [minAge, setMinAge] = useState<number>(18);
  const [maxAge, setMaxAge] = useState<number>(100);
  const [zipCode, setZipCode] = useState<string>("");
  const [homeGroup, setHomeGroup] = useState<string>("");

  const defaultFilterOptions: FilterOptions = {
    gender: "",
    ageRange: [18, 100],
    zipCode: "",
    homeGroup: "",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const gender = (formData.get("gender") as string) || "";
    const minAge = Number(formData.get("minAge")) || 18;
    const maxAge = Number(formData.get("maxAge")) || 100;
    const zipCode = (formData.get("zipCode") as string) || "";
    const homeGroup = (formData.get("homeGroup") as string) || "";

    onChange({
      gender,
      ageRange: [minAge, maxAge],
      zipCode,
      homeGroup,
    });

    onClose(); // Close drawer after applying filters
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGender("");
    setMinAge(18);
    setMaxAge(100);
    setZipCode("");
    setHomeGroup("");
    onChange(defaultFilterOptions);
  };

  return (
    <div className={`FilterContainer ${open ? "open" : ""}`}>
      <form className="FilterBox" onSubmit={handleSubmit} onReset={handleReset}>
        <div className="FilterHeader">
          <h2>Filter sponsors</h2>
          <button
            type="button"
            className="CloseButton"
            onClick={() => onClose()}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="FilterSection">
          <h3>Home Group</h3>
          <select
            name="homeGroup"
            value={homeGroup}
            onChange={(e) => setHomeGroup(e.target.value)}
          >
            {homegroups.map((group, index) => (
              <option key={index} value={group.value}>
                {group.label}
              </option>
            ))}
          </select>
        </div>

        <div className="FilterSection">
          <h3>Gender</h3>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            />
            Female
          </label>
        </div>
        <div className="FilterSection">
          <h3>Age Range</h3>
          <RadioInput
            label="Minimum age"
            value={minAge}
            name="minAge"
            min="18"
            max="100"
            onChange={setMinAge}
          />
          <RadioInput
            value={maxAge}
            name="maxAge"
            label="Maximum age"
            min="18"
            max="100"
            onChange={setMaxAge}
          />
          <span>
            {minAge} - {maxAge}
          </span>
        </div>
        <div className="FilterSection">
          <h3>Zip Code</h3>
          <input
            name="zipCode"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter zip code"
          />
        </div>
        <button type="reset" className="ResetButton">
          Reset Filters
        </button>
        <button type="submit" className="ResetButton">
          Apply Filters
        </button>
      </form>
    </div>
  );
};
