import { useDesignerStore } from "@/store/store";
import FormElementSidebar from "./FormElementSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DesignerSidebar() {
  const { selectedElement } = useDesignerStore();

  return (
    <aside className="flex h-full md:w-[250px] w-[110px] flex-col gap-2 overflow-y-auto border-l-2 border-border bg-background p-4">
      <ScrollArea>
        {!selectedElement && <FormElementSidebar />}
        {selectedElement && <PropertiesFormSidebar />}
      </ScrollArea>
    </aside>
  );
}
