'use client';

import { useEffect, useState } from 'react';
import firebase from './firebase';

const MyPage = () => {
  const [data, setData] = useState(null);

  // Function to read data from Firebase RTDB
  const readData = async () => {
    try {
      const snapshot = await firebase.database().ref('testNode').child('child1').once('value');
      const data = snapshot.val();
      setData(data);
    } catch (error) {
      console.error('Error reading data:', error);
    }
  };

  useEffect(() => {
    // Call the function to read data when the component mounts
    readData();
  }, []);

  return (
    <div>
      <h1>Welcome to My Page</h1>
      {data ? (
        <div>
          <p>Data from Firebase:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default MyPage;
