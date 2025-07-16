import VoiceSearchBar from './components/VoiceSearchBar';
import SubredditList from './components/SubredditList';
import TrendingSidebar from './components/TrendingSidebar';
import PostShowcase from './components/PostShowcase';
import Footer from './components/Footer';
import './App.css'

function App() {
  

  return (
    <div className="app">
     <VoiceSearchBar />
       <div className="middle">
        <SubredditList />
        <PostShowcase />
        <TrendingSidebar />
      </div>
     <Footer />
    </div>
  )
}

export default App
