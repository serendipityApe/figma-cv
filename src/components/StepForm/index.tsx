import { useState } from "react";
import { Chip, RadioGroup, useRadio, VisuallyHidden } from "@heroui/react";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { cn } from "@heroui/react";
// import Highlights from "../highlights";

type Mode = "brief" | "free" | "import";
type Section = "basics" | "work" | "volunteer" | "education";

export const CustomRadio = (props: {
  value: string;
  description?: string;
  children?: React.ReactNode;
  isDisabled?: boolean;
  chipText?: string;
}) => {
  const { chipText, ...RadioProps } = props;
  const {
    Component,
    children,
    description,
    isDisabled,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(RadioProps);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center justify-between tap-highlight-transparent",
        "max-w-[300px] border-2 rounded-lg gap-4 p-4",
        !isDisabled && "hover:bg-content2",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} disabled={isDisabled} />
      </VisuallyHidden>
      <VisuallyHidden>
        <span {...getWrapperProps()}>
          <span {...getControlProps()} />
        </span>
      </VisuallyHidden>
      <div {...getLabelWrapperProps()}>
        <div className="flex flex-col">
          {children && (
            <div {...getLabelProps()} className="flex gap-2">
              <span>{children}</span>
              {chipText && <Chip>{chipText}</Chip>}
            </div>
          )}
          {description && (
            <span className="text-small text-foreground opacity-70">
              {description}
            </span>
          )}
        </div>
      </div>
    </Component>
  );
};

export default function StepForm() {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<Mode>("brief");
  const [sections, setSections] = useState<Section[]>([]);

  const handleModeSelect = (value: Mode) => {
    console.log("value", value);
    setMode(value);
    if (value === "free") {
      setStep(2);
    }
    if (value === "brief") {
      handleSubmit();
    }
  };

  const handleSectionToggle = (section: Section) => {
    setSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleSubmit = () => {
    if (mode === "free") {
      parent.postMessage(
        { pluginMessage: { type: "create-resume", sections } },
        "*"
      );
    } else {
      parent.postMessage(
        { pluginMessage: { type: "create-resume", mode } },
        "*"
      );
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="w-[350px] h-[450px] p-6 flex flex-col">
      {step === 1 && (
        <>
          <h2 className="text-xl font-semibold mb-6">选择模式</h2>
          <RadioGroup onValueChange={(value) => handleModeSelect(value as any)}>
            <CustomRadio
              description="Generate a resume template directly, preferably edited with figma"
              value="brief"
            >
              quickly mode
            </CustomRadio>
            <CustomRadio
              isDisabled
              chipText="coming soon"
              description="Manually filling in data after pre-defining the resume template using a form. 5-10 minutes"
              value="free"
            >
              free mode
            </CustomRadio>
            <CustomRadio
              isDisabled
              chipText="coming soon"
              description="import from linkedin"
              value="import"
            >
              import
            </CustomRadio>
          </RadioGroup>
        </>
      )}
      {step === 2 && mode === "free" && (
        <>
          <h2 className="text-xl font-semibold mb-6">选择简历内容</h2>
          <div className="space-y-4">
            {["basics", "work", "volunteer", "education"].map((section) => (
              <Checkbox
                key={section}
                isSelected={sections.includes(section as Section)}
                onValueChange={() => handleSectionToggle(section as Section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Checkbox>
            ))}
          </div>
        </>
      )}
      {/* {step === 2 && mode === "brief" && <Highlights />} */}
      <div className="mt-auto flex justify-between space-x-4">
        {step > 1 && (
          <Button variant="light" onPress={handleBack}>
            上一步
          </Button>
        )}
        {step > 1 && (
          <Button
            color="primary"
            isDisabled={mode === "free" && sections.length === 0}
            onPress={handleSubmit}
          >
            确认
          </Button>
        )}
      </div>
    </div>
  );
}
