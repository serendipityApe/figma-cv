import Highlights from "@/components/highlights";
import Nav from "@/components/Nav";
import { useState } from "react";

type Props = {
  data: any;
};

function Editor({ data }: Props) {
  const [currentTab, setCurrentTab] = useState("editor");
  const { section, subSection, data: elementsData } = data;
  return (
    <div className="w-[350px] h-[450px] px-6 flex flex-col">
      <Nav
        selectedTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
        }}
      />
      <div className=" py-6 flex flex-col">
        {section.split("_").at(-1) === "highlights" && (
          <Highlights data={elementsData} initFocusIndex={subSection} />
        )}
      </div>
    </div>
  );
}

export default Editor;
