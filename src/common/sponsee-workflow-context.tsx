import { createContext, useContext, useState } from "react";

interface SponseeWorkflowFormData {
  sponseeState: string;
  sponseeZipcode: string;
  sponseeGender: string;
  sponseeName: string;
  sponseePhone: string;
}

interface SponseeWorkflowFormErrors {
  state: boolean;
  zipcode: boolean;
  gender: boolean;
  name: boolean;
  phone: boolean;
}

const SponseeWorkflowContext = createContext<{
  formData: SponseeWorkflowFormData;
  formErrors: SponseeWorkflowFormErrors;
  setFormErrors: (errors: any) => void;
  handleInputChange: (e: any) => void;
} | null>(null);

const SponseeWorkflowProvider = ({ children }: { children: any }) => {
  const [formData, setFormData] = useState({
    sponseeState: "",
    sponseeZipcode: "",
    sponseeGender: "",
    sponseeName: "",
    sponseePhone: "",
  });

  const [formErrors, setFormErrors] = useState({
    state: false,
    zipcode: false,
    gender: false,
    name: false,
    phone: false,
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
    <SponseeWorkflowContext.Provider value={props}>
      {children}
    </SponseeWorkflowContext.Provider>
  );
};

const useSponseeWorkflowContext = () => useContext(SponseeWorkflowContext);

export { SponseeWorkflowProvider, useSponseeWorkflowContext };
