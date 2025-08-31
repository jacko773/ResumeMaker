import { Routes, Route } from "react-router";
import Home from "./Resume/screen/Home";
import Contact from "./Resume/screen/Contact";
import ResumeBuilder from "./Resume/screen/ResumeBuilder";
import Experience from "./Resume/screen/Experience";
import Education from "./Resume/screen/Education";
import STEPS from "./constant";
import Skills from "./Resume/screen/Skils";
import Projects from "./Resume/screen/Projects";
import Summary from "./Resume/screen/Summary";
import { ResumeProvider } from "./Resume/context/ResumeContext";

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
