import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";
import { Separator } from "@/components/ui/separator";

export default function FormElementsSidebar() {
  const [isShow, setShow] = React.useState(false);
  const handleClick = () => {
    setShow(!isShow);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-foreground/70">Drag and Drop Elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 items-start place-items-center gap-4">
        <p className="my-2 place-self-start text-sm col-span-2">Layout</p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeperatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 items-start place-items-center gap-4">
        <p className="my-2 place-self-start text-sm col-span-2">Form</p>
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.EmailField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />
        <SidebarBtnElement formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
}
