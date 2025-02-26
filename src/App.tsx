import StepForm from "./components/StepForm";
import { useEffect, useState } from "react";
import Editor from "./page/Editor";

export default function App() {
  const [figmaData, setFigmaData] = useState(null);
  const [mode, setMode] = useState<"create" | "edit">("create");
  useEffect(() => {
    // Listen for messages from Figma
    window.onmessage = (event) => {
      console.log(event, figmaData, "eeeee");
      const { data, type } = event.data.pluginMessage;
      if (type === "selected-data") {
        console.log(data, "data");
        setFigmaData(data);
        setMode("edit");
      }
    };

    return () => {
      window.onmessage = null;
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      {mode === "create" && <StepForm />}
      {mode === "edit" && <Editor data={figmaData} />}
    </div>
  );
}
