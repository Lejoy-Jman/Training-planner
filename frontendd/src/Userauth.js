// Userauth.js
import { useState, useEffect } from 'react';

function Userauth() {
  const [userAuthenticated, setuserAuthenticated] = useState(false); // Initialize as false by default

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    
    if (jwtToken) {
      setuserAuthenticated(true);
    } else {
      setuserAuthenticated(false);
    }
  }, []);

  return userAuthenticated;
}

export default Userauth;
