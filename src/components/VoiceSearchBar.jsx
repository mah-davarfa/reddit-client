import React from "react";
import { useNavigate ,createSearchParams} from "react-router-dom";
import {useRef} from 'react';



 const VoiceSearchBar = () => {
const searchinputRef = useRef();
const navigate = useNavigate();

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
    };

const handleVoiceSearch = () => { 
    const recognition = 
    window.SpeechRecognition || window.webkitSpeechRecognition? 
    new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    :null;

    if(!recognition){
      alert("Speech recognition not supported in this browser.");
      return;
    }
     recognition.lang = "en-US";
     recognition.interimResults = false;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; 
        searchinputRef.current.value = transcript; 
        const encodedQuery = encodeURIComponent(transcript);
       navigate(`/result/${encodedQuery}`);

       };
          recognition.onerror = (e) => { 
            console.error('Voice recognition error:', e); 
        };

        recognition.start(); 
}    
    /// till loading the button need to be disable.
 return (
    <div>
        <h1> VoiceSearchBar   </h1>
        <div>
           <form onSubmit={onSearchHandler} >
            <button  type='submit'>Search</button>
            <input type="text" placeholder="Search..." ref={searchinputRef}/>
            <button type='button' onClick={handleVoiceSearch}>🎤</button>
           </form>
    </div>
 </div>
) 
}
export default VoiceSearchBar;