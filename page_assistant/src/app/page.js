import React from 'react';
// import Layout from './Layout';

const Home = () => {
  return (
    
      <div className="container mx-auto p-8">
      

    <link rel="stylesheet" href="index.css">


		

        <div class="container">
            <h1>ThreeJS</h1>
            
            

            <button id="addCube">Button 1</button>
            <button id="removeCube">Button 2</button>

            <div id="canvas"></div>

        </div>

      

        <h1 className="text-4xl mb-8 text-center">Welcome to Your On-Page Assistant</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="hoverable-element p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <h2 className="text-xl mb-4">Element 1</h2>
            {/* <p>Explaination 1</p> */}
          </div>
          <div className="hoverable-element p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <h2 className="text-xl mb-4">Element 2</h2>
            {/* <p>Explaination 2</p> */}
          </div>
          <div className="hoverable-element p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <h2 className="text-xl mb-4">Element 3</h2>
            {/* <p>Explaination 3</p> */}
          </div>
        </div>
      </div>
    
  );
};

export default Home;
