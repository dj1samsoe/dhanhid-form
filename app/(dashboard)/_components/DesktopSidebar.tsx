import { useDesignerStore } from "@/store/store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";
import FormElementSidebar from "./FormElementSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

export default function DesktopSidebar() {
  const { selectedElement } = useDesignerStore();
  return (
    <aside className="flex h-full w-[400px] flex-col gap-2 overflow-y-auto border-l-2 border-border bg-background p-4">
      <ScrollArea>
        {!selectedElement && <FormElementSidebar />}
        {selectedElement && <PropertiesFormSidebar />}
      </ScrollArea>
    </aside>
  );
}
