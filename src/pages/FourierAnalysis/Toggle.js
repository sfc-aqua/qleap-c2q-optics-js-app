import React, { useState } from "react";

const Toggle = ({ onModeChanged }) => {
	const [isViewMode, setViewMode] = useState(true);
	const toggleMode = () => {
	  setViewMode(prev => !isViewMode)
	  onModeChanged(!isViewMode)
	}
	return <input type="checkbox" onClick={toggleMode} />
};

export default Toggle;