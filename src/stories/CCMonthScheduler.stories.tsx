import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import CCMonthScheduler from "../components/CCMonthScheduler";
import { CCMonthCalendarItemComponent } from "../components/CCMonthScheduler/components";
import {
  CCAgendaSchedulerRowHeader,
  CCAgendaSchedulerRowItem
} from "../components/CCAgendaScheduler/components";

export const MonthScheduler: ComponentStory<typeof CCMonthScheduler> = ({
  ...options
}) => {
  const {} = options;
  const [date, setDate] = useState(new Date());
  return (
    <CCMonthScheduler
      onClick={e => {
        if (e) {
          console.log("stories.onChange", e);
        }

        // setValue(e);
      }}
      onClickCell={e => {
        if (e) {
          console.log("stories.onChange", e);
        }

        // setValue(e);
      }}
      component={{
        month: {
          event: event => {
            return <CCMonthCalendarItemComponent {...event} />;
          }
        },
        agenda: {
          header: event => {
            console.log(event);
            return <CCAgendaSchedulerRowHeader {...event} />;
          },
          event: event => {
            console.log(event);
            return <CCAgendaSchedulerRowItem {...event} />;
          }
        }
      }}
      date={date}
      onChangeDate={e => {
        setDate(e);
      }}
      contents={[
        {
          date: new Date(),
          event: { title: "Task 1", staff: "Staff 1", content: "Test Content" }
        }
      ]}
    />
  );
};
// export const NormalMode = MonthScheduler.bind({});
// NormalMode.args = {};

export default {
  title: "Example/MonthScheduler",
  component: CCMonthScheduler,
  parameters: {
    docs: {
      inlineStories: false // Component 밖으로 화면이 그려지는걸 막기 위한 부분
    },
    controls: { sort: "requiredFirst" }
  },
  argsTypes: {}
} as ComponentMeta<typeof CCMonthScheduler>;
