import React , {useEffect }from "react";
import {fetchposts} from '../features/postsSlice';
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import {selectorPosts} from '../features/postsSlice';
//navigate(`/result/search/${searchQuery}`);

const PostShowcase = () => {
const { searchQuery } = useParams(); // i have a routed that captures searchParams
const dispatch = useDispatch();

useEffect(()=>{
    if (searchQuery)
    dispatch(fetchposts(searchQuery));
}, [searchQuery, dispatch]);


 return (
    <div>
        <h1> PostShowcase   </h1>
    </div>
) }
export default PostShowcase;