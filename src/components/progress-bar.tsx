import React from "react";
import "../styles/progress-bar.css"; // Make sure to create this file for styles

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  // Calculate the percentage dynamically
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="ProgressBarContainer">
      <div className="ProgressBarFill" style={{ width: `${percentage}%` }}><span>{`${currentStep}`}</span></div>
    </div>
  );
};

export default ProgressBar;
