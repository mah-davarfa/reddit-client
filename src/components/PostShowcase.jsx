import React, {  useEffect, useState } from "react";
import { fetchposts, selectorPosts, selectPostStatus, selectPostError } from "../features/postsSlice";

import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import {selectComments,selectCommentsStatus,selectCommentsError,fetchComments} from '../features/commentsSlice';


const PostShowcase = () => {
  const { source, searchQuery } = useParams();
  const dispatch = useDispatch();
  //getting status & Error & data for comments
  const commentsForPost = useSelector(selectComments);
  const commentsStatus = useSelector(selectCommentsStatus);
  const commentsError = useSelector(selectCommentsError);
  //getting status & Error & data for posts
  const posts = useSelector(selectorPosts);
  const status = useSelector(selectPostStatus);
  const error = useSelector(selectPostError);

  const [galleryIndex, setGalleryIndex] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedCommentsByPostId, setSelectedCommentsByPostId] = useState({});
  const [commentIndex , setCommentIndex] = useState({ });
  const [isGetCommentClicked, setIsGetCommentClicked] = useState([]);

  useEffect(()=>{
  const id= setTimeout(() => {
    dispatch(fetchposts('picture'))
  }, 4000);
  return () => clearTimeout(id);
 },[dispatch])
 
 
  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchposts(searchQuery));

    }
  }, [searchQuery, dispatch]);

  //after receiving comments(commentsForPost) from slice accummulating Array of comments objects based on thier post's id in object(selectedCommentsByPostId) 
 useEffect(()=>{
   if (commentsForPost.length > 0 && selectedPostId){
        setSelectedCommentsByPostId((perv)=>({
     ...perv,
      [selectedPostId]:commentsForPost
   }));
  }
      },[commentsForPost, selectedPostId]);
  if (status === "loading") return <p>Loading...</p>;
  if (status === "rejected") return <p>Error: {error}</p>;
  
  const isImageUrl = (url) => /\.(jpeg|jpg|gif|png)$/i.test(url);
  
  const renderGallery = (post) => { 
    //console.log('post',post)
    const media = post.media_metadata;  //console.log('media',media);
    const gallery = post.gallery_data;  //console.log('gallery',gallery);
    if (!media || !gallery ) return null;

///Gallery Image Cycling Logic
const postId = post.id;
   const currentPictureIndex = galleryIndex[postId] || 0;  //console.log('currentPictureIndex',currentPictureIndex);
  const imageItem = gallery.items[currentPictureIndex];  //console.log('imageItem',imageItem);
  const imageUrl = media[imageItem.media_id]?.s?.u?.replaceAll("&amp;", "&");
  
  //console.log('imageUrl',imageUrl);
   
  const handleNextPicture = () => {
    setGalleryIndex((prev) => ({//accumulating all post ids and their current index to keep track of which image is being displayed
      ...prev,
      [postId]: (currentPictureIndex + 1) % gallery.items.length//loop back to zero when reaching the end
    }));
  };
  const handlePreviusePicture = () => {
    setGalleryIndex((prev) => ({
      ...prev,
      [postId]: (currentPictureIndex - 1 + gallery.items.length) % gallery.items.length
    }));
  };
  // console.log('gallery', gallery);
  // console.log('galleryIndex', galleryIndex);
  return (
  
    <div className="gallery">
      <img
        src={imageUrl}
        alt="Gallery Slide"
        onClick={handleNextPicture}
        width="50%"
       
       />
      <p onClick={handleNextPicture} >{currentPictureIndex + 1} / {gallery.items.length} Next Picture{'>>'}</p>
      <p onClick={handlePreviusePicture} >{'<<'} Previous Picture </p>
    </div>
  );
  };

  const  handleGetComment = (post) => {
    const postId = post.id;
    if(post.ups>0)
    dispatch(fetchComments(post.id));
     setSelectedPostId(postId);
    setIsGetCommentClicked((prev)=>[...prev, postId]);
       //we have object of postIds that each postId has array of comments's objects
       //  then to choose each comment we need index for that comment
}
  const handleNextComment =(postId)=>{
  setCommentIndex((prevIndex)=>({
    ...prevIndex ,
    [postId]: ((prevIndex[postId]|| 0 )+1 )% selectedCommentsByPostId[postId].length,
  }));
 }
  function phandlePreviuseComment(postId) {
    setCommentIndex((prevIndex)=>({
      ...prevIndex,
      [postId]: 
      (((prevIndex[postId]|| 0) -1 + selectedCommentsByPostId[postId].length)% 
      selectedCommentsByPostId[postId].length),
    }))
  }
  //    console.log('commentsForPost: ', commentsForPost);
      console.log('SelectedCommentsByPostId:',selectedCommentsByPostId)
    console.log('selectedPostId: ', selectedPostId);
  console.log('commentIndex: ', commentIndex);
  // console.log('commentIndex[selectedPostId]: ', commentIndex[selectedPostId]);
  
 return (
  <div className={'postshowcase-grid'}>
  <div className="postshowcase-wrapper">
    <h2>PostShowcase</h2>
    <div className="postshowcase-scrollable">
      {posts.map((post) => (
        <div key={post.id} className="postshowcase-item">
          <h3>{post.title}</h3>
          <p>Subreddit: {post.subreddit}</p>
          
                      
          {post.is_video ? (
            
            <video src={post.url} controls muted width="50%" className={'video-shadow'} >
              Your browser does not support the video tag.
            </video>
          ) : isImageUrl(post.url) ? (
            <img src={post.url} alt={post.title} width="50%" className={'img-shadow'} />
          ) : post.url?.includes("/gallery/") && post.media_metadata ? (
            renderGallery(post)
          ):null }
           <p>Upvotes: {post.ups}</p>
           <p onClick={()=>handleGetComment(post)} className=
           {isGetCommentClicked.some(id=>id===post.id) ?'commentClicked':'getComment'} >Get All {post.comments} Comments </p>
           {commentsStatus === 'loading' && <p>Loading comments...</p>}
           {commentsStatus === 'rejected' && <p>Error loading comments</p>}
           
           {selectedCommentsByPostId[post.id] ? (
           (Array.isArray(selectedCommentsByPostId[post.id]) ? (
          <div>
              <h3>Comments:</h3> 
            
              <p className="comment-text">{selectedCommentsByPostId[post.id][commentIndex[post.id] || 0]?.comment} </p>
           <div className={'nextComment'}>
              <p onClick={()=>handleNextComment(post.id)} >
                Next Comment: {'>>>'} {(commentIndex[post.id] || 0) + 1}/{selectedCommentsByPostId[post.id].length}
              </p>
              < p onClick= {()=>phandlePreviuseComment(post.id)} >
                {'<<<'}Previous comment  
              </p>
            </div>
          </div>
           ) : null)): null}
          
        </div>
      ))}
      </div>
    </div>
   </div> 
  );
};

export default PostShowcase;

