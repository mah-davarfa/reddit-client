import React from "react";
import { useNavigate ,createSearchParams} from "react-router-dom";
import {useRef,useState} from 'react';



 const VoiceSearchBar = () => {
const searchinputRef = useRef();
const navigate = useNavigate();
const [isListening, setIsListening] = useState(false);
const sinitizedQuery =(query)=>{
    return query.replace(/[<>/"';]/g, ' ');
}

const onSearchHandler = (e) => {
    e.preventDefault();
    const searchQuery = searchinputRef.current.value;
    ////send searchQuery to postshowcase and then fetch from there
    //// change the url that postShoCase sees it and postshowcase grabs searchquery for dispatch,
    const sanitized = sinitizedQuery(searchQuery.trim());
    const encodedQuery = encodeURIComponent(sanitized);
    navigate(`/result/${encodedQuery}`); 
    searchinputRef.current.value=''
    };

const handleVoiceSearch = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (!recognition) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  recognition.lang = "en-US";
  recognition.interimResults = false;

  setIsListening(true); // Start animation

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchinputRef.current.value = transcript;

    // Auto-search once result is received
    const sanitized = sinitizedQuery(transcript.trim());
    const encodedQuery = encodeURIComponent(sanitized);
    setIsListening(false);
    navigate(`/result/${encodedQuery}`);
  };

  recognition.onerror = (e) => {
    console.error("Voice recognition error:", e);
    setIsListening(false); // Stop animation
  };

  recognition.onend = () => {
    setIsListening(false); // Stop if user cancels or times out
  };

  recognition.start();
};

    /// till loading the button need to be disable.
 return (
  <div className={'voiceSearc-grid'}>
    <div>
        <h1 className={'title-search'}>Search Reddit by Voice or Text</h1>
        <div className="voice-search-container">
          <form className="voice-search-form" onSubmit={onSearchHandler}>
            <input
              type="text"
              placeholder="Search..."
              ref={searchinputRef}
              className={`voice-search-input ${isListening ? "listening" : ""}`}
            />
            <button type="submit" className="voice-search-button">
              Search
            </button>
            <button type="button" className="voice-mic-button" onClick={handleVoiceSearch}>
              🎤
            </button>
          </form>
        </div>
   </div>
   </div>
) 
}
export default VoiceSearchBar;