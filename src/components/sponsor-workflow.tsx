import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";

import { FaInfoCircle } from "react-icons/fa";
import SponsorPageOne from "./sponsor-page-one";
import { genders } from "../common/genders";
import { states } from "../common/states";
import { useState } from "react";

interface SponserWorkflowProps {
  backClicked: () => void; // Type the function prop
}

export default function SponsorWorkflow({ backClicked }: SponserWorkflowProps) {
  const [step, setStep] = useState(1);

  return <>{step === 1 && <SponsorPageOne backClicked={backClicked} />}</>;
}
