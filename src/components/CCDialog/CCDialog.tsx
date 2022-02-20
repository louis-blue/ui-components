import React, { RefObject, useEffect, useRef } from "react";
import styled from "@emotion/styled";

const LDialogContainer = styled("div", {
  label: "LDialogContainer"
})(({ theme }) => {
  return {
    position: "fixed",
    transition: "opacity ease-out 0.2s",
    zIndex: 1300,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
});

const LDialogContent = styled("div", {
  label: "LDialogContent",
  shouldForwardProp: propName => {
    // console.log(propName);
    if (propName === "width" || propName === "height") {
      return false;
    }
    return true;
  }
})<{ width?: number; height?: number }>(({ theme, width, height }) => {
  return {
    backgroundColor: "white",
    borderRadius: 4,
    width: width || "none",
    height: height || "none",
    boxShadow:
      "0 2px 1px -1px rgba(0, 0, 0, 0.20), 0 1px 1px 0px rgba(0, 0, 0, 0.14), 0 1px 3px 0px rgba(0, 0, 0, 0.12)"
  };
});

interface Props {
  open: Boolean;
  onClose: Function;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

const CCDialog: React.FC<Props> = (props: Props) => {
  const { children, open, onClose, width, height }: Props = props;
  const fieldRef: RefObject<HTMLDivElement> = useRef(null);
  useEffect(() => {
    const listener: EventListenerOrEventListenerObject = (e: any) => {
      if (!fieldRef.current || !e.target.contains(fieldRef.current)) return;
      onClose && onClose();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [fieldRef, onClose]);
  return (
    <>
      {Boolean(open) && (
        <LDialogContainer ref={fieldRef}>
          <LDialogContent width={width} height={height}>
            {children}
          </LDialogContent>
        </LDialogContainer>
      )}
    </>
  );
};

export default CCDialog;
