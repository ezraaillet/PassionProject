import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RadioInput } from "./radio-input";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export type FilterOptions = {
  gender: string;
  ageRange: [number, number];
  zipCode: string;
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
  const [minAge, setMinAge] = useState<number>(18);
  const [maxAge, setMaxAge] = useState<number>(100);
  const defaultFilterOptions: FilterOptions = {
    gender: "",
    ageRange: [18, 100],
    zipCode: "",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      gender = defaultFilterOptions.gender,
      minAge = defaultFilterOptions.ageRange[0],
      maxAge = defaultFilterOptions.ageRange[1],
      zipCode = defaultFilterOptions.zipCode,
    } = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    ) as any;

    onChange({
      gender,
      ageRange: [minAge, maxAge],
      zipCode,
    });

    onClose();
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
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
          <h3>Gender</h3>
          <label>
            <input type="radio" name="gender" value="male" />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" />
            Female
          </label>
        </div>
        <div className="FilterSection">
          <h3>Age Range</h3>
          <RadioInput
            label="Minimum age"
            defaultValue={minAge}
            name="minAge"
            min="18"
            max="100"
            onChange={setMinAge}
          />
          <RadioInput
            defaultValue={maxAge}
            name="maxAge"
            label="Maximum age"
            min="18"
            max="100"
            onChange={setMaxAge}
          />

          <span>
            {/* todo: show warning if min > max */}
            {minAge} - {maxAge}
          </span>
        </div>
        <div className="FilterSection">
          <h3>Zip Code</h3>
          <input type="text" placeholder="Enter zip code" />
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
