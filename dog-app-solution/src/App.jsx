import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [dogImage, setDogImage] = useState('');

  const loadDogImage = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    setDogImage(data.message);
  }

  useEffect(() => {
    loadDogImage();
  }, [])

  return (
    <main>
      <img src={dogImage} alt="A picture of a random dog" />
      <button onClick={loadDogImage}>Random Dog</button>
    </main>
  )
}

export default App
