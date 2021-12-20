import React, { useState } from "react";

function Toggle({ onModeChanged }) {
  const [isViewMode, setViewMode] = useState(true);
  const toggleMode = () => {
    setViewMode(!isViewMode);
    onModeChanged(!isViewMode);
  };
  return <input type="checkbox" onClick={toggleMode} />;
}

export default Toggle;
