import React, { useEffect, useState } from "react";
import { fetchposts, selectorPosts, selectPostStatus, selectPostError } from "../features/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostShowcase = () => {
  const { source, searchQuery } = useParams();
  const dispatch = useDispatch();

  const posts = useSelector(selectorPosts);
  const status = useSelector(selectPostStatus);
  const error = useSelector(selectPostError);
  const [galleryIndex, setGalleryIndex] = useState({});
  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchposts(searchQuery));
    }
  }, [searchQuery, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "rejected") return <p>Error: {error}</p>;
  
   const isImageUrl = (url) => /\.(jpeg|jpg|gif|png)$/i.test(url);
  
  const renderGallery = (post) => { 
    console.log('post',post)
    const media = post.media_metadata;  console.log('media',media);
    const gallery = post.gallery_data;  console.log('gallery',gallery);
    if (!media || !gallery ) return null;

///Gallery Image Cycling Logic
const postId = post.id;
   const currentIndex = galleryIndex[postId] || 0;  console.log('currentIndex',currentIndex);
  const imageItem = gallery.items[currentIndex];  console.log('imageItem',imageItem);
  const imageUrl = media[imageItem.media_id]?.s?.u?.replaceAll("&amp;", "&");
  
  console.log('imageUrl',imageUrl);

  const handleNext = () => {
    setGalleryIndex((prev) => ({//accumulating arll post ids and their current index to keep track of which image is being displayed
      ...prev,
      [postId]: (currentIndex + 1) % gallery.items.length//loop back to zero when reaching the end
    }));
  };

  return (
  
    <div className="gallery">
      <img
        src={imageUrl}
        alt="Gallery Slide"
        onClick={handleNext}
        width="50%"
       
       />
      <p onClick={handleNext} >{currentIndex + 1} / {gallery.items.length} {'>>'}</p>
    </div>
  );
  };
  

  return (
    <div>
      <h1>PostShowcase</h1>
      {posts.map((post) => (
        <div key={post.id} >
          <h2>{post.title}</h2>
          <p>Subreddit: {post.subreddit}</p>
          
                      
          {post.is_video ? (
            
            <video src={post.url} controls muted width="50%" height="50%">
              Your browser does not support the video tag.
            </video>
          ) : isImageUrl(post.url) ? (
            <img src={post.url} alt={post.title} width="50%"  />
          ) : post.url?.includes("/gallery/") && post.media_metadata ? (
            renderGallery(post)
          ) : (
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              View Content
            </a>
           
          )}
           <p>Upvotes: {post.ups}</p>
           <p>Comments : {post.comments}</p>
        </div>
      ))}
    </div>
  );
};

export default PostShowcase;

