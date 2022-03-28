import React from "react";
import { CCTeethGraph } from "../components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TEETH_GRAPH_SYSTEM } from "../components/CCTeethGraph/types";

export const TeethGraph: ComponentStory<typeof CCTeethGraph> = ({
  ...options
}) => {
  const { foreground, background, numbers, missings, mode, width, height } =
    options;
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
  title: "Example/TeethGraph",
  component: CCTeethGraph,
  argTypes: {
    mode: {
      control: "select",
      options: [TEETH_GRAPH_SYSTEM],
      defaultValue: TEETH_GRAPH_SYSTEM[0]
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
