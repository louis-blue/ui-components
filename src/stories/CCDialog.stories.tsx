import React, { useState } from "react";
import { CCDialog } from "../components";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export const Dialog: ComponentStory<typeof CCDialog> = ({ ...options }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Dialog 열기</button>
      <CCDialog
        open={open}
        onClose={() => setOpen(false)}
        width={500}
        height={500}
      >
        {"Dialog Content"}
      </CCDialog>
    </>
  );
};

export const DialogNormal = Dialog.bind({});
DialogNormal.args = {};
export default {
  name: "dialog",
  title: "Example/Dialog",
  component: CCDialog,
  argsTypes: {
    open: {
      name: "open"
    }
  }
} as ComponentMeta<typeof CCDialog>;
