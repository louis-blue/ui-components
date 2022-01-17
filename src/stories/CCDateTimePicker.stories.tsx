import React from "react";
import { CCDateTimePicker } from "../components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  CALENDAR_VIEW,
  PICKER_FEATURES
} from "../components/CCDateTimePicker/types";

export const DateTimePicker: ComponentStory<typeof CCDateTimePicker> = ({
  ...options
}) => {
  const { open, onClose, onChange, value, features, view } = options;
  return (
    <CCDateTimePicker
      open={open}
      onClose={onClose}
      onChange={onChange}
      value={value}
      features={features}
      view={view}
    />
  );
};

export default {
  title: "Example/DateTimePicker",
  component: CCDateTimePicker,
  argTypes: {
    open: {
      control: "boolean",
      defaultValue: true
    },
    view: {
      control: { type: "radio" },
      options: [CALENDAR_VIEW.DAY, CALENDAR_VIEW.WEEK],
      defaultValue: CALENDAR_VIEW.DAY
    },
    value: {
      control: {
        type: "date"
      },
      defaultValue: new Date()
    },
    features: {
      control: {
        type: "check"
      },
      options: [PICKER_FEATURES.DATE, PICKER_FEATURES.TIME],
      defaultValue: [PICKER_FEATURES.DATE]
    }
  }
} as ComponentMeta<typeof CCDateTimePicker>;
