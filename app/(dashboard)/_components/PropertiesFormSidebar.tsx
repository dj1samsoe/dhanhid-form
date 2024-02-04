import { Button } from "@/components/ui/button";
import { useDesignerStore } from "@/store/store";
import { X } from "lucide-react";
import React from "react";
import { FormElements } from "./FormElements";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesignerStore();
  if (!selectedElement || typeof selectedElement === "function") return null;

  const PropertiesForm =
    FormElements[selectedElement.type]?.propertiesComponent;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col p-2"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </motion.div>
  );
}
