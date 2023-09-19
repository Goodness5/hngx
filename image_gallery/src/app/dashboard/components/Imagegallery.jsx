// components/ImageGallery.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fetchImages = async (category) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `https://api.api-ninjas.com/v1/randomimage?category=${category}`,
      headers: {
        'X-Api-Key': process.env.IMAGES_API_KEY, // Assuming you set your API key in the .env.local file
        'Accept': 'image/jpg'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const category = 'any'; // Replace with your desired category
    fetchImages(category).then((data) => {
      setImages(data);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Image ${index}`} className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
