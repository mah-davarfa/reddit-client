import React from "react";
import { useNavigate ,createSearchParams} from "react-router-dom";
import {useRef} from 'react';



 const VoiceSearchBar = () => {
const searchinputRef = useRef();
const navigate = useNavigate();

const onSearchHandler = (e) => {
    e.preventDefault();
    const searchQuery = searchinputRef.current.value;
    ////send searchQuery to postshowcase and then fetch from there
    //// change the url that postShoCase sees it and postshowcase grabs searchWuery for dispatch,
    
    navigate(`/result/search/${searchQuery}`); 
    
    
}

    
    /// till loading the button need to be disable.
 return (
    <div>
        <h1> VoiceSearchBar   </h1>
        <div>
           <form onSubmit={onSearchHandler} >
            <button  type='submit'>Voice Search</button>
            <input type="text" placeholder="Search..." ref={searchinputRef}/>
           </form>
    </div>
 </div>
) 
}
export default VoiceSearchBar;