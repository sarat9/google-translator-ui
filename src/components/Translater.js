import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const API_URL = 'https://translation.googleapis.com/language/translate/v2'
const API_KEY = '------INSERT-YOUR-API-KEY-HERE--------'


function Translator() {

    const [textObj, setTextObj] = useState({
        text: "India, officially the Republic of India, is a country in South Asia. It is the second-most populous country, the seventh-largest country by land area, and the most populous democracy in the world.",
        source: 'en',
        target: 'hi'
    })


    const [translated, setTranslatedText] = useState(null)


    const handleChange = (e) => {
        e && e.preventDefault()
        let name = e.target.name
        setTextObj({ ...textObj, [name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e && e.preventDefault()
        translateLang(textObj.text, textObj.source, textObj.target).then(data => {
            console.log(data)
            setTranslatedText(data)
        })
    }

    const translateLang = (query = 'Hello World', source = 'en', target = 'hi') => {
        /**
         * q = Query can be text or array of texts. e.g ('Hello World' or ['Hello World', 'What are you doing'])
         * source = The source Language FROM 
         * target = The target language TO you want to translate
         * key = The google API Key
        **/
        let postData = {
            q: query,
            source: source,
            target: target,
            key: API_KEY
        }

        return Axios.post(API_URL + '?key=' + API_KEY, postData).then(
            (response) => {
                return response;
            },
            (err) => {
                console.error('Error from POST call of ', API_URL);
                return err;
            }
        ).then((responseData) => {
            let translatedData = []
            let translations = responseData.data.data.translations
            translations && translations.forEach(text => {
                console.log(text.translatedText)
                translatedData.push(text.translatedText)
            });
            return translatedData
        });
    }



    return (
        <>
            <div style={{margin: '25px'}}>
                <div>
                    <h1 style={{ marginBottom: '0px' }}>Translator</h1>
                    <h6 style={{ marginTop: '0px' }}>Simple app to use Google Cloud translation API to translate text to other languages</h6>
                    
                    <textarea
                        id={'textAreaInput'}
                        name={'text'}
                        style={{ width: "600px", height: "150px", fontSize: '18px' }}
                        onChange={handleChange}
                    >
                        {textObj.text}
                    </textarea>

                    <h2>Choose your target language</h2>

                    <select 
                        name="target"
                        id="targetLanguage"
                        style={{ width: '200px', height: '30px', fontSize: '18px' }}
                        onChange={handleChange}>
                        <option value="hi">Hindi</option>
                        <option value="te">Telugu</option>
                        <option value="fr">French</option>
                        <option value="ja">Japaneese</option>
                    </select>

                    <br />
                    <br />

                    <button
                        style={{
                            background: '#c924cc',
                            color: 'white', padding: '10px 20px', fontSize: '18px'
                        }}
                        onClick={handleSubmit}
                    >
                        Translate
                    </button>
                </div>
                <div>
                    {translated && <h2>{translated}</h2>}
                </div>



            </div>
        </>
    );
}

export default Translator;
