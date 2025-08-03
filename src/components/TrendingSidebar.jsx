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
  'date',
  'crazy',
  'cat fight',
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
<div className={"trendding-grid"}>  
<div className="trending-sidebar-wrapper">
  <div className="trending-sidebar">
    <h2 className="trending-title">Don't Miss This Section</h2>
    <div className="trending-scrollable">
      {trendingSubreddits.map((item) => (
        <button
          key={item}
          value={item}
          onClick={() => getItem(item)}
          className={isClicked === item ? 'selected' : ''}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
</div>
</div>
) }
export default TrendingSidebar;