import { useState } from "react";

import "./button.css";

export default function PrimaryButton({
  options = [],
  selected,
  setSelected,
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

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >

            <path
              d="M12 5H2"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M6 12H18"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M9 19H15"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M16 5H22"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M19 8V2"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

          </svg>

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