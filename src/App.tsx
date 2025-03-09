import "./App.css";

import { Analytics } from "@vercel/analytics/react";
import Footer from "./common/footer";
import Header from "./common/header";
import LandingPage from "./components/landing-page";

function App() {
  return (
    <div>
      <Header />
      <LandingPage />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
