import { useState } from "react";
import Checkbox from "./Checkbox";

export default function Test() {
  const [checked, setChecked] = useState(false);

  return (
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        label="Mark as completed"
      />
    </div>
  );
}