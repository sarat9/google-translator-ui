import React from 'react';
import Axios from 'axios';
import './App.css';
import Translator from './components/Translater'


const API_URL = 'https://translation.googleapis.com/language/translate/v2'
const API_KEY = 'AIzaSyDz0lWQchL0QRo8e5-xiIp-PIPJL1LkFJ8'

function App() {


  const translateTextToApi = () => {
    let postData = {
      q: 'The Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops) is the oldest and largest of the three pyramids in the Giza pyramid complex.',
      source: 'en',
      target: 'te',
      key: API_KEY
    }

    Axios.post(API_URL + '?key=' + API_KEY, postData).then(
      (resp) => {
        return resp;
      },
      (err) => {
        console.error('Error from POST call of ', API_URL);
        return err;
      }
    );
  }

  translateTextToApi();


  return (
    <>
      <div>
        <Translator />



      </div>
    </>
  );
}

export default App;
