import { FormEvent, createContext, useContext, useState } from "react";

import UserService from "../services/user-service";
import { json } from "stream/consumers";

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
  sponsorTimeForSteps: string;
  sponsorIntensityLevel: string;
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
  stepTime: boolean;
  intensityLevel: boolean;
}

const SponsorWorkflowContext = createContext<{
  formData: SponsorWorkflowFormData;
  setFormData: (data: any) => void;
  formErrors: SponsorWorkflowFormErrors;
  setFormErrors: (errors: any) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  workflowStep: number;
  handleBackClick: () => void;
}>({
  formData: {} as SponsorWorkflowFormData,
  setFormData: () => {},
  formErrors: {} as SponsorWorkflowFormErrors,
  setFormErrors: () => {},
  handleSubmit: () => {},
  workflowStep: 1,
  handleBackClick: () => {},
});

const SponsorWorkflowProvider = ({ children }: { children: any }) => {
  const [workflowStep, setWorkflowStep] = useState(1);
  const { createUser } = UserService();
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
    sponsorTimeForSteps: "",
    sponsorIntensityLevel: "",
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
    stepTime: false,
    intensityLevel: false,
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
      if (workflowStep === 5) {
        createUser(newFormData, 2);
      }

      return newFormData;
    });

    setWorkflowStep(workflowStep + 1);
  };

  const handleBackClick = () => {
    if (workflowStep === 1) {
      // clear forms and errors
      setFormData({
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
        sponsorTimeForSteps: "",
        sponsorIntensityLevel: "",
      });
      setFormErrors({
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
        stepTime: false,
        intensityLevel: false,
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
    <SponsorWorkflowContext.Provider value={props}>
      {children}
    </SponsorWorkflowContext.Provider>
  );
};

const useSponsorWorkflowContext = () => useContext(SponsorWorkflowContext);

export { SponsorWorkflowProvider, useSponsorWorkflowContext };
