import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { nanoid } from "nanoid";

type Item = {
  id: string;
  value: string;
};
//a svg icon
const DeleteIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <span
      className="cursor-pointer hover:opacity-80"
      onClick={() => {
        onClick?.();
      }}
    >
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1665"
        width="20"
        height="20"
      >
        <path
          d="M0 0h1024v1024H0z"
          fill="#f31260"
          opacity=".01"
          p-id="1666"
        ></path>
        <path
          d="M343.074133 57.480533A34.133333 34.133333 0 0 1 375.466667 34.133333h273.066666a34.133333 34.133333 0 0 1 32.392534 23.3472L695.876267 102.4H887.466667a68.266667 68.266667 0 0 1 68.266666 68.266667v68.266666a68.266667 68.266667 0 0 1-68.266666 68.266667v512a170.666667 170.666667 0 0 1-170.666667 170.666667H307.2a170.666667 170.666667 0 0 1-170.666667-170.666667V307.2a68.266667 68.266667 0 0 1-68.266666-68.266667V170.666667a68.266667 68.266667 0 0 1 68.266666-68.266667h191.5904l14.9504-44.919467zM716.8 307.2H204.8v512a102.4 102.4 0 0 0 102.4 102.4h409.6a102.4 102.4 0 0 0 102.4-102.4V307.2h-102.4z m170.666667-68.266667V170.666667h-216.1664a34.133333 34.133333 0 0 1-32.392534-23.3472L623.9232 102.4h-223.8464l-14.984533 44.919467a34.133333 34.133333 0 0 1-32.392534 23.3472H136.533333v68.266666h750.933334z m-477.866667 204.8a34.133333 34.133333 0 1 0-68.266667 0v341.333334a34.133333 34.133333 0 1 0 68.266667 0V443.733333z m273.066667 0a34.133333 34.133333 0 1 0-68.266667 0v341.333334a34.133333 34.133333 0 1 0 68.266667 0V443.733333z"
          fill="#f31260"
          p-id="1667"
        ></path>
      </svg>
    </span>
  );
};
export default function Highlights({
  data,
  initFocusIndex,
  section,
  subSection,
}: {
  data: string[];
  section: string;
  subSection?: number;
  initFocusIndex?: number;
}) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [items, setItems] = useState<Item[]>(() =>
    data.map((value) => ({
      id: nanoid(),
      value,
    }))
  );

  useEffect(() => {
    if (initFocusIndex !== undefined && inputRefs.current[initFocusIndex]) {
      inputRefs.current[initFocusIndex]?.focus();
    }
  }, [initFocusIndex]);

  useEffect(() => {
    console.log("resume-edit", items);
    const messageData = {
      type: "resume-edit",
      data: {
        data: items.map((item) => item.value),
        section,
        subSection,
        type: "highlights",
      },
    };
    parent.postMessage({ pluginMessage: messageData }, "*");
  }, [items]);
  const addItem = () => {
    const newItem: Item = {
      id: nanoid(),
      value: "",
    };
    setItems([...items, newItem]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index].value = value;
    setItems(newItems);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = [...items];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  return (
    <div className="w-[302px] h-[450px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Highlights</h2>
        <Button size="sm" color="primary" onPress={addItem}>
          Add Item
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {items.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Draggable draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="w-full"
                          >
                            <Input
                              ref={(el) => {
                                if (el) {
                                  inputRefs.current[index] = el;
                                }
                              }}
                              value={item.value}
                              onChange={(e) =>
                                handleChange(index, e.target.value)
                              }
                              placeholder={`Highlight ${index + 1}`}
                              className="w-full"
                              startContent={
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-move px-2"
                                >
                                  ⋮⋮
                                </div>
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    </div>
                    <DeleteIcon onClick={() => removeItem(index)} />
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
