import React from "react";

export interface Props {
  url?: string;
  className?: string;
  children?: React.ReactNode;
  attrs?: object;
  src?: string;
  height?: number | string;
  width?: number | string;
}
