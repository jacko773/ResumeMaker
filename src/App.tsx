import { Routes, Route } from "react-router";
import Home from "./screen/Home";
import Contact from "./screen/Contact";
import ResumeBuilder from "./screen/ResumeBuilder";
import Experience from "./screen/Experience";
import Education from "./screen/Education";
// import Skil from "./screen/Skill";
import STEPS from "./constant";
import Skills from "./screen/Skils";
import Projects from "./screen/Projects";
import Summary from "./screen/Summary";
import { ResumeProvider } from "./context/ResumeContext";

const App = () => {
  return (
    <ResumeProvider>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/builder" element={<ResumeBuilder />}>
          <Route path={STEPS.contact} element={<Contact />} />
          <Route path={STEPS.experience} element={<Experience />} />
          <Route path={STEPS.education} element={<Education />} />
          <Route path={STEPS.skills} element={<Skills />} />
          <Route path={STEPS.projects} element={<Projects />} />
          <Route path={STEPS.summary} element={<Summary />} />
        </Route>
      </Routes>
    </ResumeProvider>
  );
};

export default App;
