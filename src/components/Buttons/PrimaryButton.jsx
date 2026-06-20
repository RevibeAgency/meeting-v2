import { useState } from "react";

import "./button.css";

export default function PrimaryButton({
  options = [],
  selected,
  setSelected,
  icon,
}) {

  const [open, setOpen] =
    useState(false);

  return (

    <div className="dropdown-wrap">

      <button
        className="primary-btn"
        onClick={() =>
          setOpen(!open)
        }
      >

        <div className="icon">

        {icon}

        </div>

        <span>
          {selected}
        </span>

      </button>

      <div className="glow-border"></div>

      {open && (

        <div className="dropdown-content">

          {options.map((item) => (

            <div
              key={item}
              className="dropdown-item"
              onClick={() => {

                setSelected(item);

                setOpen(false);

              }}
            >
              {item}
            </div>

          ))}

        </div>

      )}

    </div>

  );
}