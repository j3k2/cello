import React from "react";

const useOnOutsideClick = (callback) => {
  const ref = React.useRef();

  const handler = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      typeof callback === "function"
    ) {
      callback();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return ref;
};

export default useOnOutsideClick;
