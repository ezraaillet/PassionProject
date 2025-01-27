import { useEffect, useState } from "react";

import ProfilePage from "../profile-page";
import SponsorPageFive from "./sponsor-page-five";
import SponsorPageFour from "./sponsor-page-four";
import SponsorPageOne from "./sponsor-page-one";
import SponsorPageThree from "./sponsor-page-three";
import SponsorPageTwo from "./sponsor-page-two";
import UserSearch from "../user-search";
import UserService from "../../services/user-service";
import { useSponsorWorkflowContext } from "../../common/sponsor-workflow-context";
import ProgressBar from "../progress-bar";
import "../../styles/sponsor-page.css";
interface SponsorWorkflowProps {
	backClicked: () => void; // Type the function prop
}

export default function SponsorWorkflow({ backClicked }: SponsorWorkflowProps) {
	const [workflowStep, setWorkflowStep] = useState(1);
	const [step, setStep] = useState(1);
	const { createUser } = UserService();
	const sponsorWorkflowContext = useSponsorWorkflowContext();

	const handleBackClick = () => {
		if (step === 1) {
			backClicked();
		} else {
			setStep(step - 1);
			setWorkflowStep(workflowStep - 1);
		}
	};

	const handleNextClick = () => {
		setStep(step + 1);

		if (step === 5) {
			createUser(sponsorWorkflowContext?.formData, 2);
		}
	};

	return (
		<div className="sponsor-page-container">
			<ProgressBar currentStep={step} totalSteps={5} />
			{step === 1 && (
				<SponsorPageOne
					workflowStep={workflowStep}
					setWorkflowStep={setWorkflowStep}
					backClicked={handleBackClick}
					nextClicked={handleNextClick}
				/>
			)}
			{step === 2 && (
				<SponsorPageTwo
					workflowStep={workflowStep}
					setWorkflowStep={setWorkflowStep}
					backClicked={handleBackClick}
					nextClicked={handleNextClick}
				/>
			)}
			{step === 3 && (
				<SponsorPageThree
					workflowStep={workflowStep}
					setWorkflowStep={setWorkflowStep}
					backClicked={handleBackClick}
					nextClicked={handleNextClick}
				/>
			)}
			{step === 4 && (
				<SponsorPageFour
					workflowStep={workflowStep}
					setWorkflowStep={setWorkflowStep}
					backClicked={handleBackClick}
					nextClicked={handleNextClick}
				/>
			)}
			{step === 5 && (
				<SponsorPageFive
					workflowStep={workflowStep}
					setWorkflowStep={setWorkflowStep}
					backClicked={handleBackClick}
					nextClicked={handleNextClick}
				/>
			)}
			{/* {step === 6 && <ProfilePage />} */}
		</div>
	);
}
