import React, { useState } from 'react';
import Assistant from './Assistant';

const HoverableComponent = () => {
  const [explanation, setExplanation] = useState('');

  const handleHover = (event) => {
    const info = event.target.getAttribute('data-info');
    setExplanation(info);
  };

  return (
    <div className="hoverable-component">
      <div
        className="hoverable-element"
        data-info="Explanation 1"
        onMouseEnter={handleHover}
        onMouseLeave={() => setExplanation('')}
      >
        Element 1
      </div>
      <div
        className="hoverable-element"
        data-info="Explanation 2"
        onMouseEnter={handleHover}
        onMouseLeave={() => setExplanation('')}
      >
        Element 2
      </div>
      <div
        className="hoverable-element"
        data-info="Explanation 3"
        onMouseEnter={handleHover}
        onMouseLeave={() => setExplanation('')}
      >
        Element 3
      </div>
      <Assistant explanation={explanation} />
    </div>
  );
};

export default HoverableComponent;
