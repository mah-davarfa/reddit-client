import React from 'react';
import VoiceSearchBar from './components/VoiceSearchBar';
import SubredditList from './components/SubredditList';
import TrendingSidebar from './components/TrendingSidebar';
import PostShowcase from './components/PostShowcase';
import Footer from './components/Footer';
import AppLayout from './components/AppLayout';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";




function App() {
  
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={
          <>
            <PostShowcase />
            <TrendingSidebar />
          </>
          } />
        <Route path='/result/:subreditt/:search/:trend' element={<PostShowcase />} />
        <Route path='/moretrending' element={
         <>
            <PostShowcase/>
            <TrendingSidebar mode='expanded'/>
          </>
        } />
        
      </Route>
    </Routes>
  </BrowserRouter>
)
 }

export default App



