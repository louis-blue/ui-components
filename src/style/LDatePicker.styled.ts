import styled from "@emotion/styled";

export const LDatePickerContainer = styled("div", {
  label: "LDatePickerContainer"
})<{ width?: number | string }>(({ theme, width = 310 }) => {
  return {
    width: width,
    boxSizing: "border-box",
    padding: 8,
    backgroundColor: "#fff",
    height: 316
  };
});

export const LDatePickerGridContainer = styled("div", {
  label: "LDatePickerGridContainer",
  shouldForwardProp(propName: string): boolean {
    switch (propName) {
      case "justifyContent":
      case "alignItems":
      case "fullWidth":
      case "height":
        return false;
      default:
        return true;
    }
  }
})<{
  justifyContent?: string;
  alignItems?: string;
  fullWidth?: boolean;
  height?: number | string;
}>(
  ({
    theme,
    fullWidth,
    height,
    justifyContent = "flex-start",
    alignItems = "flex-start"
  }) => {
    return {
      height: height,
      width: fullWidth ? "100%" : "auto",
      display: "flex",
      justifyContent,
      alignItems
    };
  }
);
