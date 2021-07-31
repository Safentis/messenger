import { FC } from "react";

import { Props } from "./Content.interface";
import "./Content.css";

const Content: FC<Props> = ({ children, className = "" }) => {
  return (
    <section className={"content " + className}>
      <div className="content__inner">{children}</div>
    </section>
  );
};

export default Content;
