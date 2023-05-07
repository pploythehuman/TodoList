import React from 'react';

interface ProgressBarProps {
  completeAmount: number
  totalAmount: number
}

const ProgressBar:React.FC<ProgressBarProps>= ({ completeAmount, totalAmount }) => {
  const percent = (completeAmount/totalAmount) * 100
  return(
    <div className="progress-bar">
      <h2>Progress</h2>
      <div className="bar-container">
        <div className="background-bar" />
        <div className="fill-bar" style={{ width: `${percent}%`, maxWidth: '100%'}}/>
      </div>
      <p>{completeAmount} completed</p>
    </div>
  );
};

export default ProgressBar;