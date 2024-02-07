import { ScrollArea } from "@/components/ui/scroll-area";
import { useDesignerStore } from "@/store/store";
import React from "react";
import FormElementSidebar from "./FormElementSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

export default function MobileSidebar() {
  const { selectedElement } = useDesignerStore();
  return (
    <aside className="h-[70vh] max-h-full w-full overflow-y-auto border-t-2 border-border bg-background p-4">
      <ScrollArea>
        {!selectedElement && <FormElementSidebar />}
        {selectedElement && <PropertiesFormSidebar />}
      </ScrollArea>
    </aside>
  );
}
