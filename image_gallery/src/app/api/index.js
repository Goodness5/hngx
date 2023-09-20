// utils/api.js
export const signupUser = async (username, email, password) => {
    const BASE_URL = 'https://ctfapi.onrender.com';
  
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
  
    // if (response.ok) {
      return response.json();
    // } else {
    //   throw new Error('Signup failed');
    // }
  };


  // utils/fetchImages.js
import axios from 'axios';

const fetchImages = async (category) => {
  try {
    const response = await axios.get(`https://picsum.photos/v2/list?category=${category}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching images: ${error}`);
  }
};

export default fetchImages;


  // utils/api.js
export const loginUser = async (username, password) => {
  const BASE_URL = 'https://ctfapi.onrender.com';
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      
    }
      return response.json();
    // } else {
    //   throw new Error('Login failed');
    // }
  };
  