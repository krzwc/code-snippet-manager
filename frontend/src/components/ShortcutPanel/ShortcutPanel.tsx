import React from "react";
import { Props } from "./types";
import "./ShortcutPanel.scss";
import Shortcut from "../Shortcut";

export default ({ shortcuts }: Props) => {
  return (
    <div className="panel">
      {shortcuts.map(shortcut => (
        <Shortcut {...shortcut} />
      ))}
    </div>
  );
};
