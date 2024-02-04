"use client";

import {
  ElementsType,
  FormElement,
} from "@/app/(dashboard)/_components/FormElements";
import { Label } from "@radix-ui/react-label";
import { Minus } from "lucide-react";
import { Separator } from "../ui/separator";

const type: ElementsType = "SeperatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: <Minus className="h-5 w-5" />,
    label: "Separator Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function FormComponent() {
  return <Separator />;
}

function DesignerComponent() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground">Separator Field</Label>
      <Separator />
    </div>
  );
}

function PropertiesComponent() {
  return <p>No properties for this element</p>;
}
