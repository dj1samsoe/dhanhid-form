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
    <div>
      <p className="text-sm text-foreground/70 md:block hidden">
        Drag and Drop Elements
      </p>
      <Separator className="my-2" />
      <div className="flex flex-col items-start place-items-center gap-4">
        <p className="col-span-1 my-2 place-self-start text-sm md:col-span-2">
          Layout
        </p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeperatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />

        <p className="col-span-1 my-2 place-self-start text-sm md:col-span-2">
          Form
        </p>
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
