import React from 'react';
import TrendingSidebar from './components/TrendingSidebar';
import PostShowcase from './components/PostShowcase';
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
        <Route path='/result/:source/:searchQuery' element={<PostShowcase />} />
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



