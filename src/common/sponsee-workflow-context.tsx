import { FormEvent, createContext, useContext, useState } from "react";

import UserService from "../services/user-service";

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
  setFormData: (data: any) => void;
  formErrors: SponseeWorkflowFormErrors;
  setFormErrors: (errors: any) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  workflowStep: number;
  handleBackClick: () => void;
}>({
  formData: {} as SponseeWorkflowFormData,
  setFormData: () => {},
  formErrors: {} as SponseeWorkflowFormErrors,
  setFormErrors: () => {},
  handleSubmit: () => {},
  workflowStep: 1,
  handleBackClick: () => {},
});

const SponseeWorkflowProvider = ({ children }: { children: any }) => {
  const [workflowStep, setWorkflowStep] = useState(1);
  const { createUser } = UserService();
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    if (!form.checkValidity()) return;

    const updatedFormData = new FormData(form);
    const jsonFormData = Object.fromEntries(updatedFormData.entries()) as {
      [key: string]: string;
    };

    console.log("New Form Data:", jsonFormData);

    // set updated form data
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, ...jsonFormData };

      // if last step of workflow
      if (workflowStep === 2) {
        createUser(newFormData, 1);
      }

      return newFormData;
    });

    setWorkflowStep(workflowStep + 1);
  };

  const handleBackClick = () => {
    if (workflowStep === 1) {
      // clear forms and errors
      setFormData({
        sponseeState: "",
        sponseeZipcode: "",
        sponseeGender: "",
        sponseeName: "",
        sponseePhone: "",
      });
      setFormErrors({
        state: false,
        zipcode: false,
        gender: false,
        name: false,
        phone: false,
      });
      setWorkflowStep(1);
    } else {
      setWorkflowStep(workflowStep - 1);
    }
  };

  const props = {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    handleSubmit,
    workflowStep,
    handleBackClick,
  };

  return (
    <SponseeWorkflowContext.Provider value={props}>
      {children}
    </SponseeWorkflowContext.Provider>
  );
};

const useSponseeWorkflowContext = () => useContext(SponseeWorkflowContext);

export { SponseeWorkflowProvider, useSponseeWorkflowContext };
