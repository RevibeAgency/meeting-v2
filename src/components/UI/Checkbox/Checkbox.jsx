import { useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "./Checkbox.css";

const CHECK_PATH = "M5 13l4 4L19 7";
const INDETERMINATE_PATH = "M6 12h12";

export default function Checkbox({
  checked = false,
  onCheckedChange,
  onCommit,
  onAnimationComplete,
  disabled = false,
  indeterminate = false,
  label = "",
  className = "",
  id,
}) {
  const autoId = useId();

  const checkboxId = id || autoId;

  const reduceMotion = useReducedMotion();

  const [visualChecked, setVisualChecked] = useState(checked);

  const pendingValue = useRef(checked);

  useEffect(() => {
    setVisualChecked(checked);
  }, [checked]);

  const showMark = visualChecked || indeterminate;

  const path = indeterminate ? INDETERMINATE_PATH : CHECK_PATH;

  return (
    <label
      htmlFor={checkboxId}
      className={`cortex-checkbox-wrapper ${className} ${
        disabled ? "disabled" : ""
      }`}
    >
      <input
        id={checkboxId}
        type="checkbox"
        checked={visualChecked}
        disabled={disabled}
        onChange={(e) => {
          const next = e.target.checked;

          pendingValue.current = next;
          setVisualChecked(next);
          // Immediate callback
          onCheckedChange?.(next);
        }}
        className="cortex-checkbox-input"
      />

      <motion.div
        className={`cortex-checkbox ${showMark ? "checked" : ""}`}
        whileTap={reduceMotion || disabled ? undefined : { scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <AnimatePresence initial={false}>
          {showMark && (
            <motion.svg
              key={indeterminate ? "minus" : "check"}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={
                reduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      scale: 0.5,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
              transition={{
                duration: 0.18,
              }}
            >
              <motion.path
                d={path}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{
                  duration: indeterminate ? 0.18 : 0.28,
                }}
                onAnimationComplete={() => {
                  onAnimationComplete?.();
                  // Delayed callback
                  onCommit?.(pendingValue.current);
                }}
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>

      {label && <span className="cortex-checkbox-label">{label}</span>}
    </label>
  );
}
