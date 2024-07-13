import axios from 'axios';
import React, { useEffect, useState } from 'react';
//screens
import Login from './screens/Login';
import Register from './screens/Register';
import TodoList from './screens/TodoList';

export default function App() {
    useEffect(()=>{
    testBackendConnection();
  }, []);

  const testBackendConnection = async()=>{
    try{
      const response = await axios.get('http://localhost:3000/auth'); //try to replace the ip with localhost
      console.log("Connected: " + response.data.data);
    }
    catch(error){
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log("Response error:", error.response.data);
        console.log("Status code:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error:", error.message);
      }
      console.log("Error config:", error.config);
    }
  }

  return <Login />;
}
