import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type Item = {
  id: string;
  value: string;
};

export default function Highlights() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = () => {
    const newItem: Item = {
      id: `item-${items.length + 1}`,
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
    <div className="w-[350px] h-[450px] p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dynamic List</h2>
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
                              value={item.value}
                              onChange={(e) =>
                                handleChange(index, e.target.value)
                              }
                              placeholder={`Item ${index + 1}`}
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
                    <Button
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => removeItem(index)}
                    >
                      -
                    </Button>
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
