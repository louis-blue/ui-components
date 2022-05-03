import React, { useRef } from "react";
import { CCScheduler } from "../components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import reservation from "./assets/reservation.json";
import { SchedulerEvent, SchedulerView } from "../components/CCScheduler/types";

export const Scheduler: ComponentStory<typeof CCScheduler> = (args, { updateArgs }) => {

  const { date, contents } = args;
  const mapRef = useRef(contents.reduce((acc, cur) => {
    const { dateBegin, dateEnd } = cur;
    acc.set(cur.id, {
      ...cur,
      dateBegin: new Date(dateBegin),
      dateEnd: new Date(dateEnd)
    });
    return acc;
  }, new Map()));

  return (
    <div style={{ width: 700, height: 500 }}>
      <CCScheduler
        {...args}
        date={function(this: { date: Date | number }) {
          if (!(this.date instanceof Date)) {
            const _newDate = new Date();
            _newDate.setTime(date as unknown as number);
            return _newDate;
          }
          return new Date();
        }.call(date as any)}
        onChangeView={view => {
          updateArgs({
            ...args,
            view: view
          });
        }}
        onChangeDate={date => {
          console.log(date);
          updateArgs({
            ...args,
            date: date
          });
        }}
        contents={contents.reduce<SchedulerEvent[]>((acc, cur) => {
          const { dateBegin, dateEnd } = cur;
          acc.push({
            ...cur,
            dateBegin: new Date(dateBegin),
            dateEnd: new Date(dateEnd)
          });
          return acc;
        }, [])}
        onChange={e => {
          let _newMap = new Map(mapRef.current);
          _newMap.set(e.id, e);
          mapRef.current = _newMap;
          updateArgs({
            ...args,
            contents: [..._newMap.values()]
          });
        }}
        onClickCell={e => {
          console.log("onClickCell", e);
        }}
        onClickEvent={e => {
          console.log("onClickEvent", e);
        }}
      />
    </div>
  );
};

export default {
  title: "Example/Scheduler",
  component: CCScheduler,
  parameters: {
    docs: {
      inlineStories: false // Component 밖으로 화면이 그려지는걸 막기 위한 부분
    },
    controls: { sort: "requiredFirst" }
  },
  argTypes: {
    date: {
      name: "date",
      control: {
        type: "date"
      },
      defaultValue: new Date()
    },
    contents: {
      name: "contents",
      defaultValue: reservation
    },
    view: {
      name: "view",
      defaultValue: SchedulerView.Week
    }
  }
} as ComponentMeta<typeof CCScheduler>;
