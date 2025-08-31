import { useResume } from "../context/ResumeContext";
import { ClassicATS } from "../ResumeTemplates/ClassicATS";

const order = ["summary", "experience", "projects", "skills", "education"];
const hidden = {};

const PreviewCard = ({ DEFAULT_DATA, scale }) => {
  const { doc: data } = useResume();
  console.log("data in template", data);
  return (
    <div
      className={`mt-16 rounded-xl bg-gradient-to-br from-gray-50 to-white p-3 h-[${
        297 * scale
      }mm] w-[${
        210 * scale
      }mm] scale-[${scale}] origin-top-left justify-center align-middle `}
    >
      <ClassicATS
        data={data}
        order={order}
        hidden={hidden}
        defaultData={DEFAULT_DATA}
      />
    </div>
  );
};

export default PreviewCard;
