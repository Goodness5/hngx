import React, { useState } from 'react';
import HumanAnimation from './components/animation';

const Home = () => {
  const [explanation, setExplanation] = useState('');
  const [animationVisible, setAnimationVisible] = useState(false);

  const handleHover = (text) => {
    setExplanation(text);
    setAnimationVisible(true);
  }

  const handleLeave = () => {
    setExplanation('');
    setAnimationVisible(false);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl mb-8 text-center">Welcome to Your On-Page Assistant</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          className="hoverable-element p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          onMouseEnter={() => handleHover('Explanation 1')}
          onMouseLeave={handleLeave}
        >
          <h2 className="text-xl mb-4">Element 1</h2>
        </div>
        <div 
          className="hoverable-element p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          onMouseEnter={() => handleHover('Explanation 2')}
          onMouseLeave={handleLeave}
        >
          <h2 className="text-xl mb-4">Element 2</h2>
        </div>
        <div 
          className="hoverable-element p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          onMouseEnter={() => handleHover('Explanation 3')}
          onMouseLeave={handleLeave}
        >
          <h2 className="text-xl mb-4">Element 3</h2>
        </div>
      </div>
      {explanation && <div className="text-center mt-4">{explanation}</div>}
      {animationVisible && <div className="text-center fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <HumanAnimation />
      </div>}
    </div>
  );
};

export default Home;
