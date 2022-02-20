import React, { useState } from "react";
import { CCDateTimePicker } from "../components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  CALENDAR_VIEW,
  CCDateTimePickerWeekValue,
  PICKER_FEATURES
} from "../components/CCDateTimePicker/types";
import { DateObject } from "../Utils";

export const DateTimePicker: ComponentStory<typeof CCDateTimePicker> = ({
  ...options
}) => {
  const {
    open,
    onClose,
    onChange,
    value: storyValue,
    features,
    view
  } = options;
  const [value, setValue] = useState(storyValue);
  // console.log("stroies", storyValue, value);
  // console.log(options);

  return (
    <CCDateTimePicker
      open={open}
      onClose={onClose}
      onChange={e => {
        if (e) {
          onChange && onChange(e);
          console.log("stories.onChange", e);
        }

        // setValue(e);
      }}
      value={storyValue}
      features={features}
      view={view}
    />
  );
};
export const DatePickerDayMode = DateTimePicker.bind({});
DatePickerDayMode.args = {
  view: CALENDAR_VIEW.DAY,
  value: new Date()
};

export const TimePicker = DateTimePicker.bind({});
TimePicker.args = {
  view: CALENDAR_VIEW.DAY,
  value: new Date(),
  features: [PICKER_FEATURES.TIME]
};

export const DatePickerWeekMode = DateTimePicker.bind({});
DatePickerWeekMode.args = {
  view: CALENDAR_VIEW.WEEK,
  value: {
    begin: new DateObject(new Date()).startOf("week").toDate(),
    end: new DateObject(new Date()).endOf("week").toDate()
  }
};

export const DateTimePickerMode = DateTimePicker.bind({});
DateTimePickerMode.args = {
  view: CALENDAR_VIEW.DAY,
  value: new Date(),
  features: [PICKER_FEATURES.DATE, PICKER_FEATURES.TIME]
};

export default {
  title: "Example/DateTimePicker",
  component: CCDateTimePicker,
  parameters: {
    docs: {
      inlineStories: false // Component 밖으로 화면이 그려지는걸 막기 위한 부분
    },
    controls: { sort: "requiredFirst" }
  },
  argTypes: {
    open: {
      name: "open",
      type: { name: "boolean", required: true },
      control: { type: "boolean" },
      defaultValue: true,
      description: "Open dialog",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      }
    },
    onClose: {
      name: "onClose",
      description: "Callback function when close",
      table: {
        type: { summary: "function" },
        defaultValue: {
          summary: (): void => {},
          detail: "(): void => {}"
        }
      }
    },
    onChange: {
      name: "onChange",
      description: "Callback function when date changed",
      table: {
        type: { summary: "function" },
        defaultValue: {
          summary: (date: Date | CCDateTimePickerWeekValue): void => {},
          detail: "(date: Date | CCDateTimePickerWeekValue): void  => {}"
        }
      }
    },
    view: {
      name: "view",
      description: "View mode of DatePicker",
      control: { type: "radio" },
      options: [CALENDAR_VIEW.DAY, CALENDAR_VIEW.WEEK],
      defaultValue: CALENDAR_VIEW.DAY,
      table: {
        type: {
          summary: "enum",
          detail: JSON.stringify(CALENDAR_VIEW)
        },
        defaultValue: {
          summary: "CALENDAR_VIEW.DAY"
        }
      }
    },
    features: {
      name: "features",
      description: "feature sets",
      control: {
        type: "check"
      },
      options: [PICKER_FEATURES.DATE, PICKER_FEATURES.TIME],
      defaultValue: [PICKER_FEATURES.DATE],
      table: {
        type: {
          summary: [PICKER_FEATURES.DATE],
          detail: JSON.stringify([PICKER_FEATURES.DATE, PICKER_FEATURES.TIME])
        },
        defaultValue: {
          summary: "[PICKER_FEATURES.DATE]"
        }
      }
    },
    value: {
      name: "value",
      description: "picker value",
      control: {
        type: "date"
      },
      defaultValue: new Date(),
      table: {
        type: {
          summary: "Date | null | CCDateTimePickerWeekValue",
          detail: "Date | null | {begin : Date, end : Date}"
        },
        defaultValue: {
          summary: "Date",
          detail: "new Date()"
        }
      }
    }
  }
} as ComponentMeta<typeof CCDateTimePicker>;
