import React from 'react';

const PercentageBar = ({ total, endorsed}) => {
  let percentage = Math.round((endorsed / total) * 100);
  percentage = isNaN(percentage)? 0 : `${percentage}%`
  
  let tooltipText = `${endorsed} / ${total}`

  return (
    <div>
    <div className="bar" title={tooltipText}>
      <svg width="100%" height="9">
        <rect x="0" y="0" width="100%" height="9" fill="#F4F4F4" stroke="none" rx="5"></rect>
        <rect x="0" y="0" width={percentage} height="9" fill="#92C2D7" stroke="none" rx="5"></rect>
      </svg>
    </div>
    </div>
  );
};

export default PercentageBar;