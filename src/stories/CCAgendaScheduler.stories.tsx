import React, { useMemo, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CCAgendaScheduler } from "../components";
import { DateObject } from "../Utils";
import { CCAgendaSchedulerEvent } from "../components/CCAgendaScheduler/types";
import {
  CCAgendaSchedulerRowHeader,
  CCAgendaSchedulerRowItem
} from "../components/CCAgendaScheduler/components";

export const AgendaScheduler: ComponentStory<typeof CCAgendaScheduler> = ({
  ...options
}) => {
  const {} = options;
  console.log(options);
  const [date, setDate] = useState(new Date());
  const content = useMemo(() => {
    return [
      {
        date: date,
        event: { title: "Task 1", staff: "Staff 1", content: "Test Content" }
      },
      {
        date: (() => {
          let _date = new Date(date);
          date.setDate(1);
          return _date;
        })(),
        event: { title: "Task 2", staff: "Staff 2", content: "Test Content" }
      },
      {
        date: (() => {
          let _date = new Date(date);
          date.setDate(22);
          return _date;
        })(),
        event: { title: "Task 3", staff: "Staff 2", content: "Test Content" }
      },
      {
        date: (() => {
          let _date = new Date(date);
          date.setDate(13);
          return _date;
        })(),
        event: { title: "Task 4", staff: "Staff 2", content: "Test Content" }
      },
      {
        date: (() => {
          let _date = new Date(date);
          date.setDate(15);
          return _date;
        })(),
        event: { title: "Task 5", staff: "Staff 2", content: "Test Content" }
      }
    ];
  }, [date]);
  // console.log(content);
  return (
    <CCAgendaScheduler
      onClick={(e: CCAgendaSchedulerEvent) => {
        if (e) {
          console.log("stories.onChange", e);
        }
      }}
      date={{
        begin: new DateObject(date).startOf("month").toDate(),
        end: new DateObject(date).endOf("month").toDate()
      }}
      component={{
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
      contents={content}
    />
  );
};

export default {
  title: "Example/AgendaScheduler",
  component: CCAgendaScheduler,
  parameters: {
    docs: {
      inlineStories: false // Component 밖으로 화면이 그려지는걸 막기 위한 부분
    },
    controls: { sort: "requiredFirst" }
  },
  argsTypes: {
    "date.begin": {
      name: "date.begin",
      type: { name: "date", required: true },
      control: {
        type: "date"
      }
    }
  }
} as ComponentMeta<typeof CCAgendaScheduler>;
