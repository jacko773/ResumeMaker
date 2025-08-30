import { createContext, useReducer, useContext } from "react";

type ResumeDoc = {
  _id?: string;
  title?: string;
  sections?: Record<string, any>;
};

type ResumeContextValue = {
  resumeId: string | null;
  templateId?: string | null;
  doc: ResumeDoc;
};

const ResumeContext = createContext<ResumeContextValue | null>(null);
const ResumeDispatchContext = createContext<React.Dispatch<{
  type: string;
  payload?: any;
}> | null>(null);

const dispatchFunction = (
  state: ResumeContextValue,
  action: { type: string; payload?: any }
): ResumeContextValue => {
  switch (action.type) {
    case "SET_RESUME_ID":
      return { ...state, resumeId: action.payload };
    case "SET_TEMPLATE_ID":
      return { ...state, templateId: action.payload };
    case "SET_DOC":
      return { ...state, doc: action.payload };
    case "UPDATE_SECTION":
      return {
        ...state,
        doc: {
          ...state.doc,
          sections: {
            ...state.doc.sections,
            [action.payload.section]: action.payload.data,
          },
        },
      };
    default:
      return state;
  }
};

const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const resumeId = localStorage.getItem("resumeId");
  const doc: ResumeDoc = {};
  const [contextValue, dispatch] = useReducer(dispatchFunction, {
    resumeId,
    doc,
  });
  return (
    <ResumeContext value={contextValue}>
      <ResumeDispatchContext value={dispatch}>{children}</ResumeDispatchContext>
    </ResumeContext>
  );
};

const useResumeDispatch = () => {
  const context = useContext(ResumeDispatchContext);
  if (context === null) {
    throw new Error("useResumeDispatch must be used within a ResumeProvider");
  }
  return context;
};

const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === null) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

const useResumeSection = <T = any,>(sectionKey: string): T | undefined => {
  const { doc } = useResume();
  const dispatch = useResumeDispatch();
  return [
    doc.sections?.[sectionKey],
    (data: T) =>
      dispatch({
        type: "UPDATE_SECTION",
        payload: { section: sectionKey, data },
      }),
  ] as unknown as T;
};

const useContactSection = () => useResumeSection("contact");
const useEducationSection = () => useResumeSection("education");
const useExperinenceSection = () => useResumeSection("experinence");
const useSkillsSection = () => useResumeSection("skills");
const useProjectsSection = () => useResumeSection("projects");
const useSummarySection = () => useResumeSection("summary");

export {
  useContactSection,
  useEducationSection,
  useExperinenceSection,
  useSkillsSection,
  useProjectsSection,
  useSummarySection,
};
export { useResume, useResumeDispatch, ResumeProvider };
