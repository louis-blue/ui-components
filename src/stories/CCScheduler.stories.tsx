import React from "react";
import { CCScheduler } from "../components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import reservation from "./assets/reservation.json";
import DateScheduler from "../Utils/DateScheduler";
import { DateObject } from "../Utils";

export const Scheduler: ComponentStory<typeof CCScheduler> = ({
  ...options
}) => {
  // const { foreground, background, numbers, missings, mode, width, height } =
  //   options;

  const _reservation = reservation.map(item => {
    return {
      ...item,
      dateBegin: new Date(item.dateBegin * 1000),
      dateEnd: new Date(item.dateEnd * 1000)
    };
  });
  const tree = new DateScheduler(_reservation);
  // tree.load(_reservation);
  console.log(_reservation);
  console.log(tree.keys);
  console.log(
    tree.search({
      dateBegin: new DateObject(new Date()).startOf("month").toDate(),
      dateEnd: new DateObject(new Date()).endOf("month").toDate()
    })
  );
  return (
    <div style={{ width: 700, height: 500 }}>
      <CCScheduler
        date={new Date()}
        onChangeView={view => {}}
        contents={_reservation}
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
    // mode: {
    //   control: "select",
    //   options: [TEETH_GRAPH_SYSTEM.FDI, TEETH_GRAPH_SYSTEM.UNIVERSAL],
    //   defaultValue: TEETH_GRAPH_SYSTEM.FDI
    // },
    // foreground: { control: "color", defaultValue: "rgba(0, 0, 0, 1)" },
    // background: { control: "color", defaultValue: "rgba(0, 0, 0, 0)" },
    // numbers: {
    //   control: "object",
    //   defaultValue: [11, 12, 13, 47, 48, 32, 37, 38, 71, 72, 73]
    // },
    // missings: { control: "object", defaultValue: [21, 22, 23] },
    // width: { control: "number", defaultValue: 160 },
    // height: { control: "number", defaultValue: 40 }
  }
} as ComponentMeta<typeof CCScheduler>;
