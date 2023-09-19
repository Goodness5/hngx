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
  