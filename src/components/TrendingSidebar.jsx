import React from "react";
import { useNavigate } from "react-router-dom";
import {useState} from 'react';


const trendingSubreddits = [
  'pics',
  'EarthPorn',
  'accidents',
  'funny',
  'memes',
  'picture',
  'Showerthoughts',
  'aww',
];

const TrendingSidebar = () => {
    const [isClicked, setIsClicked] = useState(null);
    const navigate = useNavigate();
    
    // Function to handle item click
const getItem = (item) => {
    navigate(`/result/${item}`);
    setIsClicked(item);
}


 return (
    <div className="trending-sidebar">
        <h1> Do NOT Miss This Section   </h1>
       { trendingSubreddits.map((item)=>(
            <button key={item} value={item} onClick={()=>getItem(item)}className={isClicked===item  ? 'selected' : ''}>
                 {item}
            </button>
        ))}
    </div>
) }
export default TrendingSidebar;