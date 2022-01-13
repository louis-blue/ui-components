import React, { RefObject, useEffect, useRef } from "react";
import styled from "@emotion/styled";

const LDialogContainer = styled.div`
  position: fixed;
  transition: opacity ease-in-out 0.2s;
  z-index: 1300;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LDialogContent = styled.div`
  background-color: #fff;
  border-radius: 4px;
  width: ${(props: { width?: number; height?: number }) =>
    props?.width || "none"};
  width: ${(props: { width?: number; height?: number }) =>
    props?.height || "none"};
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
    0 1px 1px 0px rgba(0, 0, 0, 0.14), 0 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

interface Props {
  open: Boolean;
  onClose: Function;
  width: number;
  height: number;
  children: React.ReactNode;
}

const CCDialog: React.FC<Props> = (props: Props) => {
  const { children, open, onClose }: Props = props;
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
          <LDialogContent>{children}</LDialogContent>
        </LDialogContainer>
      )}
    </>
  );
};

export default CCDialog;
