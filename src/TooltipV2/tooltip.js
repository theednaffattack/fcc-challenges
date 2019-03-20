import React from "react";

export default ({ hoveredBar, scales, xpos, ypos }) => {
  //   const { xScale, yScale } = scales;
  const styles = {
    left: `${xpos - 220}px`,
    top: `${ypos - 30}px`
  };

  return (
    <div
      className="Tooltip"
      id="tooltip"
      data-value={hoveredBar.value}
      style={styles}
    >
      {hoveredBar.value}
    </div>
  );
};
