import { useResume } from "../context/ResumeContext";
import { ClassicATS } from "../ResumeTemplates/ClassicATS";

const order = ["summary", "experience", "projects", "skills", "education"];
const hidden = {};

const PreviewCard = ({ DEFAULT_DATA }) => {
  const { doc: data } = useResume();
  console.log("data in template", data);
  return (
    <>
      <ClassicATS
        data={data}
        order={order}
        hidden={hidden}
        defaultData={DEFAULT_DATA}
      />
    </>
  );
};

export default PreviewCard;
