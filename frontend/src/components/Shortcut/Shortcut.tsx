import React from "react";
import { Props } from "./types";
import "./Shortcut.scss";

export default ({ shortcut, description }: Props) => (
  <div className="row">
    <kbd>{shortcut}</kbd>
    <span>{description}</span>
  </div>
);
