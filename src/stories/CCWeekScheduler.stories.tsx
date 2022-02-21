import React from "react";
import { CCTeethGraph } from "../components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TEETH_GRAPH_SYSTEM } from "../components/CCTeethGraph/types";
import reservation from "./assets/reservation.json";
import DateScheduler from "../Utils/DateScheduler";
import { DateObject } from "../Utils";

export const TeethGraph: ComponentStory<typeof CCTeethGraph> = ({
  ...options
}) => {
  const { foreground, background, numbers, missings, mode, width, height } =
    options;

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
  console.log(tree);
  console.log(
    {
      minX: new DateObject(new Date()).startOf("day").format("x"),
      minY: new DateObject(new Date()).startOf("day").format("x"),
      maxX: new DateObject(new Date()).endOf("day").format("x"),
      maxY: new DateObject(new Date()).endOf("day").format("x")
    }
    // tree.search({
    //   minX: new DateObject(new Date()).startOf("day").format("x"),
    //   minY: new DateObject(new Date()).startOf("day").format("x"),
    //   maxX: new DateObject(new Date()).endOf("day").format("x"),
    //   maxY: new DateObject(new Date()).endOf("day").format("x")
    // })
  );
  return (
    <CCTeethGraph
      mode={mode}
      foreground={foreground}
      background={background}
      numbers={numbers}
      missings={missings}
      width={width}
      height={height}
    />
  );
};

export default {
  title: "Example/CCWeekScheduler",
  component: CCTeethGraph,
  argTypes: {
    mode: {
      control: "select",
      options: [TEETH_GRAPH_SYSTEM.FDI, TEETH_GRAPH_SYSTEM.UNIVERSAL],
      defaultValue: TEETH_GRAPH_SYSTEM.FDI
    },
    foreground: { control: "color", defaultValue: "rgba(0, 0, 0, 1)" },
    background: { control: "color", defaultValue: "rgba(0, 0, 0, 0)" },
    numbers: {
      control: "object",
      defaultValue: [11, 12, 13, 47, 48, 32, 37, 38, 71, 72, 73]
    },
    missings: { control: "object", defaultValue: [21, 22, 23] },
    width: { control: "number", defaultValue: 160 },
    height: { control: "number", defaultValue: 40 }
  }
} as ComponentMeta<typeof CCTeethGraph>;
