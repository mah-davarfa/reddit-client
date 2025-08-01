import React from 'react';

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
        <Route index element={<PostShowcase />} />
         <Route path='/result/:searchQuery' element={<PostShowcase />} />
        </Route>
    </Routes>
  </BrowserRouter> 
   )
 }

export default App     
          
      