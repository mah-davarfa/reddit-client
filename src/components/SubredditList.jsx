import React, {useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { fetchSubredditListsInStartup ,selectSubredditListsError,
    selectSuretitredditLists,selectSubredditListsStatus} from "../features/subredditlistsSlice";
import { fetchposts } from "../features/postsSlice";

const SubredditList = () => {
    const popularsubredditLists = useSelector(selectSuretitredditLists);
    const subredditListsStatus = useSelector(selectSubredditListsStatus);
    const subredditListsError = useSelector(selectSubredditListsError);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //we are getting subreddit popularlists in startup by using useeffect
    useEffect (()=>{
        dispatch(fetchSubredditListsInStartup('popular'));
     },[dispatch]);
 const handleToGetSubreddit = (url) => {
    console.log('Selected URL:', url);
  setSelectedSubreddit(url);
  const cleaned = url.replace(/^\/r\/|\/$/g, ''); // remove leading `/r/` and trailing slash
  console.log('Cleaned URL:', cleaned);
  navigate(`/result/${cleaned}`);
};
 const [selectedSubreddit, setSelectedSubreddit] = useState(null);

 return (
  <div className={'subreddit-grid'}>
    <div className="subreddit-wrapper">
        <div className="subreddit-list-bigScreen">
          <h2>Subreddit Lists</h2>
          <div className="subreddit-scrollable">
          {  subredditListsStatus === 'loading' && <p>Loading comments...</p>} 
          {  subredditListsStatus === 'rejected' && <p>Error in loading</p>}
            {subredditListsStatus === 'success' &&
              popularsubredditLists.map((item) =>
                item.url ? (
                  <div
                    key={item.id}
                    className={`subreddit-card ${
                      selectedSubreddit === item.url ? 'selected' : ''
                    }`}
                  >
                    <h3>{item.title}</h3>
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.name}
                        className="subreddit-img"
                      />
                    )}
                    <p>{item.name}</p>
                    <button
                      className="app-button"
                      onClick={() => handleToGetSubreddit(item.url)}
                    >
                      Try the {item.name}
                    </button>
                  </div>
                ) : null
              )}
          </div>
        </div>


        <div className='subreddit-list-smallerScreen'>
          
            <select aria-label="Subreddit selector" onChange={(e)=>handleToGetSubreddit(e.target.value)}
             className="dropdown-menu" >
                <option value=' '>Subreddit</option>
                {subredditListsStatus === 'loading' && <option>Loading...</option>}
                
                   { subredditListsStatus === 'success' &&  popularsubredditLists.map(
                        (item)=>item.url && (
                        <option key={item.id} value= {item.url} >
                            {item.name}
                        </option>)
                        )}
            </select>
        </div>
        
    </div>
  </div>  
) }
export default SubredditList;