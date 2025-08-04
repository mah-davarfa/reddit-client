import express from 'express';
import cors from 'cors';
import axios from 'axios';


const app = express();
const PORT = 3000;

app.use(cors());
// Purpose: Enables your backend to accept requests from a different origin
//  (typically frontend running on another port like localhost:5173).

app.use(express.json());
//- Purpose: Parses incoming requests with Content-Type: application/json.
// Automatically converts the request body into a usable JavaScript object.
//Essential for handling POST/PUT requests where the frontend sends data like login credentials or form inputs.

//This defines an HTTP GET route at /api/search.
// Whenever the frontend (or any client) sends a request like http://localhost:3000/api/search?q=react, 
// this route will be triggered.- It uses Express's routing system, and the async keyword lets you use await 
// inside — great for calling external APIs.

app.get('/api/search',async (req ,res)=>{
    //because thunk is :(`/api/search?q=${searchQuery}`) then Extracts the {q} query parameter from the request URL
    const {q}=req.query; 
    const encodedQuery = encodeURIComponent(q); // Encodes the query to ensure it's safe for URLs
     try{
        //end point to get search `https://www.reddit.com/search.json?q=${encodeURIComponent(searchQuery)}`
        const response = await axios.get(`https://www.reddit.com/search.json?q=${encodedQuery}`, {
  headers: {
    'User-Agent': 'web:reddit.proxy.app:v1.0.0 (by /u/mahdev42)'
  }
});
        res.json(response.data); // Sends the data received from the external API back to the client
    }catch(error) {
        res.status(500).json({ error: 'Failed to fetch Reddit data' }); // If there's an error, it sends a 500 status with an error message
    }
});
    
    //conetion path to clint app:'/api/comments' in slice we have (`/api/comments/${postId}`)
app.get('/api/comments/:postId', async (req ,res)=>{
    const {postId} = req.params; // because thunk is: (`/api/comments/${postId}`)Extracts the postId from the request parameters
   try{
        ///for getting comment the endpoint is; `https://www.reddit.com/comments/${postId}.json` 
            const response = await axios.get(`https://www.reddit.com/comments/${postId}.json`, {
  headers: {
    'User-Agent': 'web:reddit.proxy.app:v1.0.0 (by /u/mahdev42)'
  }
});
             res.json(response.data); // Sends the comments data back to the client
            
    }catch(error){
        res.status(500).json({error: 'Failed to fetch comments'});
    }
})

//conection to clint (subredditlistsSlice) fetching using (/api/subredditlists/popular)
app.get('/api/subredditlists/:popular',async(req, res)=>{
    const {popular} = req.params; // Extracts the popular parameter from the request parameters
    try{
        const response = await axios.get(`https://www.reddit.com/subreddits/${popular}.json`, {
  headers: {
    'User-Agent': 'web:reddit.proxy.app:v1.0.0 (by /u/mahdev42)'
  }
});

        res.json(response.data); // Sends the subreddit lists data back to the client(subredditListsSlice)

    }catch(error){
        console.error("Reddit API error:", error.response?.status, error.message);
        res.status(500).json({error: 'Failed to fetch subreddit lists in startup'});
    }
})

// this opens the door for clint app to comiunicate with the backend server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
