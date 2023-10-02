import React from 'react';

const Assistant = ({ explanation }) => {
  return (
    <div className="assistant">
      <div className="speech-bubble">
        {explanation && <p>{explanation}</p>}
      </div>
    </div>
  );
};

export default Assistant;
