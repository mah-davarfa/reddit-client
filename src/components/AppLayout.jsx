import React from 'react';
import VoiceSearchBar from './VoiceSearchBar';
import SubredditList from './SubredditList';
import TrendingSidebar from './TrendingSidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './AppLayout.css';

 function AppLayout() {
  return (
  <div className="app">
            
                <VoiceSearchBar />
                <SubredditList />
                <Outlet />
                <TrendingSidebar />
                 <Footer />
            
  </div>
  )
}
export default AppLayout;