import { Button } from "@heroui/button";
import { ChangeEvent, useState } from "react";
import Mode from "./page/mode";

export default function App() {
  const [count, setCount] = useState(0);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;

    setCount(parseInt(target?.value));
  }

  function handleCreate() {
    parent.postMessage(
      { pluginMessage: { type: "create-resume", count } },
      "*"
    );
  }

  function handleCancel() {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  }

  return (
    <>
      <Mode />
      <Button color="primary" onPress={handleCreate}>
        Create1
      </Button>
      <button className="text-red-600" id="cancel" onClick={handleCancel}>
        Cancel
      </button>
    </>
  );
}
