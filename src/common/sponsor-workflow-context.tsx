import { createContext, useContext, useState } from "react";

interface SponsorWorkflowFormData {
  sponsorState: string;
  sponsorZipcode: string;
  sponsorGender: string;
  sponsorName: string;
  sponsorPhone: string;
  sponsorMotto: string;
  sponsorAge: string;
  sponsorJob: string;
  sponsorNumberOfSponsees: string;
  sponsorBio: string;
  sponsorAvailability: string;
  sponsorFaith: string;
}

interface SponsorWorkflowFormErrors {
  state: boolean;
  zipcode: boolean;
  gender: boolean;
  name: boolean;
  phone: boolean;
  motto: boolean;
  age: boolean;
  job: boolean;
  numberOfSponsees: boolean;
  bio: boolean;
  availability: boolean;
  faith: boolean;
}

const SponsorWorkflowContext = createContext<{
  formData: SponsorWorkflowFormData;
  formErrors: SponsorWorkflowFormErrors;
  setFormErrors: (errors: any) => void;
  handleInputChange: (e: any) => void;
} | null>(null);

const SponsorWorkflowProvider = ({ children }: { children: any }) => {
  const [formData, setFormData] = useState({
    sponsorState: "",
    sponsorZipcode: "",
    sponsorGender: "",
    sponsorName: "",
    sponsorPhone: "",
    sponsorMotto: "",
    sponsorAge: "",
    sponsorJob: "",
    sponsorNumberOfSponsees: "",
    sponsorBio: "",
    sponsorAvailability: "",
    sponsorFaith: "",
  });

  const [formErrors, setFormErrors] = useState({
    state: false,
    zipcode: false,
    gender: false,
    name: false,
    phone: false,
    motto: false,
    age: false,
    job: false,
    numberOfSponsees: false,
    bio: false,
    availability: false,
    faith: false,
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
    setFormErrors((prevState) => ({ ...prevState, [id]: false }));
  };

  const props = {
    formData,
    formErrors,
    setFormErrors,
    handleInputChange,
  };

  return (
    <SponsorWorkflowContext.Provider value={props}>
      {children}
    </SponsorWorkflowContext.Provider>
  );
};

const useSponsorWorkflowContext = () => useContext(SponsorWorkflowContext);

export { SponsorWorkflowProvider, useSponsorWorkflowContext };
