import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
//Positive-Pickle-5460
//secret	8CgUrZr-k1CKb6Vfb6KNzjP0Rpn9wA

const app = express();
const PORT = 3000;

app.use(cors());
// Purpose: Enables your backend to accept requests from a different origin
//  (typically frontend running on another port like localhost:5173).

app.use(express.json());
//- Purpose: Parses incoming requests with Content-Type: application/json.
// Automatically converts the request body into a usable JavaScript object.
//Essential for handling POST/PUT requests .
let accessToken = '';
let tokenExpiresAt=0;

export const getRedditToken = async()=>{
const now = Date.now();
if(accessToken && now <tokenExpiresAt)return accessToken;
const clientId=process.env.REDDIT_CLIENT_ID;
const secret = process.env.REDDIT_CLIENT_SECRET;

const credentials = Buffer.from(`${clientId}:${secret}`).toString('base64');//'Buffer' turn it to Binnery and then 'tostring()' turn to base64
  try{
    const response = await axios.post('https://www.reddit.com/api/v1/access_token',
      'grant_type=client_credentials',{
        headers :{
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'explora-client/1.0 (by /u/mahdev42)',
        }
      })
      accessToken=response.data.access_token;
      tokenExpiresAt = now + response.data.expires_in * 1000;
  }catch(error){
    console.error('Error fetching Reddit token:', error.response?.data || error.message);
    return null;
  }
}

//This defines an HTTP GET route at /api/search.
// Whenever the frontend (or any client) sends a request like http://localhost:3000/api/search?q=react, 
// this route will be triggered.- It uses Express's routing system, and the async keyword lets you use await 
// inside — great for calling external APIs.

app.get('/api/search',async (req ,res)=>{
    //because thunk is :(`/api/search?q=${searchQuery}`) then Extracts the {q} query parameter from the request URL
    const {q}=req.query; 
    const token= await getRedditToken();
    if (!token) return res.status(500).json({error:'Failed to get Reddit token'});
    const encodedQuery = encodeURIComponent(q); // Encodes the query to ensure it's safe for URLs
     try{
        //end point to get search `https://www.reddit.com/search.json?q=${encodeURIComponent(searchQuery)}`
        const response = await axios.get(`https://oauth.reddit.com/search.json?q=${encodedQuery}`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'User-Agent': 'web:reddit.proxy.app:v1.0.0 (by /u/mahdev42)'
  }
});
        res.json(response.data); // Sends the data received from the external API back to the client
    }catch (error) {
    console.error('Reddit API error:', error.response?.status, error.message);
    res.status(500).json({ error: 'Failed to fetch Reddit data' });
  }
});
    
    //conetion path to clint app:'/api/comments' in slice we have (`/api/comments/${postId}`)
app.get('/api/comments/:postId', async (req ,res)=>{
    const {postId} = req.params; // because thunk is: (`/api/comments/${postId}`)Extracts the postId from the request parameters
     const {q}=req.query; 
    const token= await getRedditToken();
    if (!token) return res.status(500).json({error:'Failed to get Reddit token'}); 

    try{
        ///for getting comment the endpoint is; `https://www.reddit.com/comments/${postId}.json` 
            const response = await axios.get(`https://oauth.reddit.com/comments/${postId}.json`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'User-Agent': 'web:reddit.proxy.app:v1.0.0 (by /u/mahdev42)'
  }
});
             res.json(response.data); // Sends the comments data back to the client
            
    }catch (error) {
    console.error('Reddit API error:', error.response?.status, error.message);
    res.status(500).json({ error: 'Failed to fetch Reddit data' });
  }
})

//conection to clint (subredditlistsSlice) fetching using (/api/subredditlists/popular)
app.get('/api/subredditlists/:popular',async(req, res)=>{
    const {popular} = req.params; // Extracts the popular parameter from the request parameters
      const {q}=req.query; 
    const token= await getRedditToken(); 
    if (!token) return res.status(500).json({error:'Failed to get Reddit token'}); 

    try{
        const response = await axios.get(`https://oauth.reddit.com/subreddits/${popular}.json`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'User-Agent': 'web:reddit.proxy.app:v1.0.0 (by /u/mahdev42)'
  }
});

        res.json(response.data); // Sends the subreddit lists data back to the client(subredditListsSlice)

    }catch (error) {
    console.error('Reddit API error:', error.response?.status, error.message);
    res.status(500).json({ error: 'Failed to fetch Reddit data' });
  }
})

// this opens the door for clint app to comiunicate with the backend server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
