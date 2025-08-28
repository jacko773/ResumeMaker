import { Outlet } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import Stepper from "../components/Stepper";
import Footer from "./Footer";
import STEPS from "../constant";
import Header from "./Header";

const getCurrentStep = (path: string) => {
    const stepKeys = Object.keys(STEPS) as Array<keyof typeof STEPS>;
    const currentIndex = stepKeys.findIndex(key => path.includes(STEPS[key]));
    return currentIndex === -1 ? 0 : currentIndex;
}
const ResumeBuilder = () =>{
    const location = useLocation();
    const currentStep = getCurrentStep(location.pathname);

    const nav = useNavigate();
    return (
            <div className="min-h-screen bg-white">
                          {/* Header */}
      {/* <Header isNav={false}></Header> */}

                {/* Progress */}
                <div className="mx-auto max-w-6xl px-4">
                    <Stepper current={currentStep} steps={["Heading", "Work History", "Education", "Skills", "Projects", "Summary", "Preview"]} />
                </div>
                <Outlet></Outlet>
            </div>
 
     )
}

export default ResumeBuilder;