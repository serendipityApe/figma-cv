import Highlights from "@/components/highlights";

type Props = {
  data: any;
};

function Editor({ data }: Props) {
  const { section, subSection, data: elementsData } = data;
  return (
    <div className="w-[350px] h-[450px] p-6 flex flex-col">
      {section.split("_").at(-1) === "highlights" && (
        <Highlights data={elementsData} initFocusIndex={subSection} />
      )}
    </div>
  );
}

export default Editor;
