import "../styles/buttons.css";

import SponseeWorkflow from "./sponsee workflow/sponsee-workflow";
import { SponseeWorkflowProvider } from "../common/sponsee-workflow-context";
import SponsorWorkflow from "./sponsor workflow/sponsor-workflow";
import { SponsorWorkflowProvider } from "../common/sponsor-workflow-context";
import { useState } from "react";

export default function AccountTypes() {
  const [workflowType, setWorkflowType] = useState<number | null>(null);

  function handleAccountTypeSelect(accountType: number): void {
    setWorkflowType(accountType);
  }

  function backClicked() {
    setWorkflowType(null);
  }

  return (
    <>
      {workflowType === null && (
        <div className="account-type-select">
          <div className="account-type-button-container">
              <button
              type="button"
                onClick={() => handleAccountTypeSelect(1)}
                className="global-button"
              >
                I need a Sponsor
              </button>
              <button
              type="button"
                onClick={() => handleAccountTypeSelect(2)}
                className="global-button"
              >
                Become a Sponsor
              </button>
          </div>
        </div>
      )}
      <SponseeWorkflowProvider>
        {workflowType === 1 && <SponseeWorkflow backClicked={backClicked} />}
      </SponseeWorkflowProvider>

      <SponsorWorkflowProvider>
        {workflowType === 2 && <SponsorWorkflow backClicked={backClicked} />}
      </SponsorWorkflowProvider>
    </>
  );
}
