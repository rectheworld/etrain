import React from 'react';

const PercentageBar = ({ percentage }) => {
  percentage = `${percentage}%`
  return (
    <div className="bar">
      <svg width="100%" height="10">
        <rect x="0" y="0" width="100%" height="10" fill="#F4F4F4" stroke="none" rx="5"></rect>
        <rect x="0" y="0" width={percentage} height="10" fill="#92C2D7" stroke="none" rx="5"></rect>
      </svg>
    </div>
  );
};

export default PercentageBar;